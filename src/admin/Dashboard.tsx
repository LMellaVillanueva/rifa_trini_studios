import { useEffect, useState } from 'react'
import api from '../AxiosConfig'
import { useNavigate } from 'react-router-dom'
import type { CompleteUser, Voucher } from '../types'

const Dashboard = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<CompleteUser[]>([])

  // mientras
  const [voucherVerified, setVoucherVerified] = useState(false)

  useEffect(() => { 
    const fetchUsers = async () => { 
      try { const { data } = await api('/user/all_users') 
        if (data) { 

          //! Vamos a parsear los vouchers para ocupar sus props
          const usersWithVouchers = data.all_users.map((user: CompleteUser) => {

            // ? Si existen los vouchers separar el string por props, sino que sea un array vacío

            const vouchersParsed: Voucher[] = user.vouchers
            ? user.vouchers.split(';').map((voucher: string) => {
              const [id = '', image_url = '', verified = '0', num_of_numbers = ''] = voucher.split('|')
              return {
                id: id.trim(),
                image_url: image_url.trim(),
                verified: verified === '1',
                num_of_numbers: num_of_numbers.trim()
              }
            })
            : []
            return { ...user, vouchersParsed }
          })

          setUsers(usersWithVouchers) 
          console.log(usersWithVouchers) 
        } 
      } catch (error: any) { 
        if (error.response && error.response.data) { 
          alert(error.response.data.error) 
        } else { 
            return console.error(error.message) 
          }
        } 
      } 
      fetchUsers() 
    }, [voucherVerified])

  useEffect(() => {
    const validateAdmin = async () => {
      try {
        const { data } = await api('/user/admin/dashboard', {
          'headers': {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (data) {
          console.log(data)
        } 
      } catch (error: any) {
        localStorage.removeItem('token')
        navigate('/')
             if (error.response && error.response.data) {
               alert(error.response.data.error)
             } else {
               return console.error(error.message)
             }
        }
    }
    validateAdmin()
  }, [])

  const handleValidateVoucher = async (id: string, num_of_numbers: number) => {
    try {
      const { data } = await api.post(`/voucher/validate`, { id, num_of_numbers })
      if (data) {
        console.log('VERIFICADO',data)
        setVoucherVerified(!voucherVerified)
      }
    } catch (error: any) {
             if (error.response && error.response.data) {
               alert(error.response.data.error)
             } else {
               return console.error(error.message)
             }
        }
  }


  return (
    <main className="flex flex-col items-center gap-10 px-2 py-20 sm:px-4">
      
      <button 
        onClick={() => { localStorage.removeItem('token'); navigate('/') }}
        className="absolute top-3 right-3 border rounded-lg bg-lime-400 p-2 text-xs sm:text-sm hover:bg-lime-200 text-black"
      >
        Cerrar Sesión
      </button>
      
      <h1 className="text-center text-lg sm:text-xl font-semibold">Bienvenido Administrador</h1>
      
      <div className="w-full flex justify-center">
        <table className="hidden sm:table w-[95%] border border-gray-300 text-sm text-neutral-100">
          <thead>
            <tr className="bg-neutral-900">
              <th className="border-b border-white py-2 px-2 text-left">Nombre</th>
              <th className="border-b border-white py-2 px-2 text-left">Teléfono</th>
              <th className="border-b border-white py-2 text-left">N° de Rifa</th>
              <th className="border-b border-white py-2 pl-2 text-left">Voucher</th>
              <th className="border-b border-white py-2 text-left">Verificado</th>
            </tr>
          </thead>
      
          <tbody>
            {users?.map((user) => (
              <tr key={user.phone} className="text-sm">
                <td className="border-b border-gray-300 py-2 px-2">{user.name}</td>
                <td className="border-b border-gray-300 py-2 px-2">{user.phone}</td>
                <td className="border-b border-gray-300 py-2 px-2">
                  {user.rifa_numbers ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {user.rifa_numbers.split(';').map((num, index) => (
                        <span key={index}>{num}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-red-500 font-semibold">No Verificado</span>
                  )}
                </td>
                
                <td className="border-b border-gray-300 py-2">
                  {user.vouchersParsed?.length ? (
                    <div className="flex flex-col gap-2">
                      {user.vouchersParsed.map((voucher: Voucher, index) => (
                        <div key={voucher.id} className="flex items-center gap-2">
                          <a
                            href={voucher.image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline whitespace-nowrap"
                          >
                            Voucher {index + 1}
                          </a>
                          <span
                            className={`text-sm font-semibold ${
                              voucher.verified ? 'text-green-600' : 'text-red-500'
                            }`}
                          >
                            {voucher.verified ? '✔️ Verificado' : (
                              <button
                                onClick={() => handleValidateVoucher(voucher.id, Number(voucher.num_of_numbers))}
                                className="underline text-blue-400 hover:text-blue-200"
                              >
                                Verificar
                              </button>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-red-500 font-semibold">✖</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          
        {/* Vista vertical solo para móvil */}
        <div className="sm:hidden w-full flex flex-col gap-4 px-1">
          {users?.map((user) => (
            <div
              key={user.phone}
              className="bg-neutral-900 border border-gray-700 rounded-xl p-3 text-neutral-100 shadow-md"
            >
              <div className="flex flex-col gap-1">
                <p><span className="font-semibold text-lime-300">Nombre:</span> {user.name}</p>
                <p><span className="font-semibold text-lime-300">Teléfono:</span> {user.phone}</p>
          
                <div className='flex flex-col items-center'>
                  <span className="font-semibold text-lime-300">N° de Rifa:</span>
                  <div className="grid grid-cols-2 gap-y-1 mt-1 w-2/3">
                    {user.rifa_numbers ? (
                      user.rifa_numbers.split(';').map((num, index) => (
                        <span key={index} className="text-white text-sm">{num}</span>
                      ))
                    ) : (
                      <span className="text-red-500 font-semibold">No Verificado</span>
                    )}
                  </div>
                </div>
                  
                <div className="mt-2">
                  <span className="font-semibold text-lime-300">Vouchers:</span>
                  {user.vouchersParsed?.length ? (
                    <div className="flex flex-col gap-2 mt-1">
                      {user.vouchersParsed.map((voucher: Voucher, index) => (
                        <div key={voucher.id} className="flex flex-wrap items-center gap-3">
                          <a
                            href={voucher.image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline"
                          >
                            Voucher {index + 1}
                          </a>
                          <span
                            className={`text-xs font-semibold ${
                              voucher.verified ? 'text-green-500' : 'text-red-500'
                            }`}
                          >
                            {voucher.verified ? '✔️ Verificado' : (
                              <button
                                onClick={() => handleValidateVoucher(voucher.id, Number(voucher.num_of_numbers))}
                                className="underline text-red-400 text-[1rem] hover:text-blue-200"
                              >
                                Verificar
                              </button>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-red-500 font-semibold">✖</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Dashboard