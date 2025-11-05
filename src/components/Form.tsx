import { useRef, useState } from 'react'
import type { User } from '../types'
import api from '../AxiosConfig'
import emailjs from '@emailjs/browser';
import Input from '../shared/Input';

const Form = () => {

  const [user, setUser] = useState<User>({ name: '', phone: '' })
  const [voucher, setVoucher] = useState<File | null>(null)
  const voucherRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, 
        [event.target.name]: event.target.value
        })
    }

    const handleVoucherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        setVoucher(file)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!user.name || !user.phone) {
            return window.alert('Debes entregar tu información')
        }
        if (!voucher) return alert('Adjunta tu comprobante')

        const formData = new FormData()
        formData.append('name', user.name)
        formData.append('phone', user.phone)
        formData.append('voucher', voucher)

        try {
            const { data } = await api.post('/user/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            if (data) {
              if (data.existant) {
                window.alert(data.existant)
              }
                emailjs
                    .send(
                      'service_yefes9k',
                      'template_3lryzv6',
                      {
                        name: data.user,
                        phone: data.phone,
                        voucher: data.voucher,
                      },
                      { publicKey: 'zADAsfTnn9pOJcyPO' }
                    )
                    .then(
                      () => console.log('MENSAJE ENVIADO'),
                      (error) => console.error('Error:', error)
                    );
                setUser({ name: '', phone: '' })
                return setVoucher(null)
                // return window.alert(`USUARIO ${data.user} ha comprado los NÚMEROS: ${data.numbers}`)
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
    <main className='flex flex-col gap-8 rounded-xl p-7 bg-black/80 items-center md:pb-20'>
        <h1 className='text_1 text-lime-400 text-4xl md:text-6xl'>Envíanos tu Comprobante</h1>
        <p className='text_2 text-md md:text-2xl'>Una vez hecha la transferencia, envía este formulario para conocer tus datos y asignarte un número!</p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-9 text-2xl text_2 text-start p-2 md:text-3xl md:w-3/4 lg:w-1/3'>

            <Input
            type='text'
            label='Nombre:'
            name='name'
            value={user.name}
            onChange={handleChange}
            maxLength={20}
            required={true}
            />

            <Input
            type='text'
            label='Número:'
            name='phone'
            maxLength={9}
            value={user.phone}
            onChange={handleChange}
            required={true}
            />
            
              <div>
                  <label htmlFor="">Comprobante:</label>
                  <input 
                  className='text-lg border-2 border-lime-400 rounded-lg p-0.5 w-full' 
                  type="file" 
                  name='voucher'
                  required
                  ref={voucherRef}
                  accept='image/*'
                  onChange={handleVoucherChange} />
              </div>
              <button 
              className='bg-lime-400 text_1 rounded-lg py-3 text-black hover:bg-lime-200'
              type='submit'>Enviar</button>
          </form>
    </main>
  )
}

export default Form