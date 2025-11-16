import { useRef, useState } from 'react'
import type { User } from '../types'
import api from '../AxiosConfig'
import emailjs from '@emailjs/browser';
import Input from '../shared/Input';
import Swal from 'sweetalert2';

const Form = () => {

  const [user, setUser] = useState<User>({ name: '', phone: '', email: '', numOfNumbers: '2' })
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
        if (!user.name || !user.phone || user.phone.length < 9) {
            return Swal.fire({
            title: "Oops...",
            text: 'Completa la info.',
            icon: "error",
          });
        }

        if (!voucher) 
          return Swal.fire({
          title: "Oops...",
          text: 'Envía tu comprobante',
          icon: "error",
        });

        const formData = new FormData()
        formData.append('name', user.name)
        formData.append('phone', user.phone)
        formData.append('email', user.email)
        formData.append('num_of_numbers', user.numOfNumbers)
        formData.append('voucher', voucher)

        try {
            const { data } = await api.post('/user/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            if (data) {
              if (data.message) {
                await Swal.fire({
                    title: data.message,
                    text: 'Ya se vendieron todos los números de rifa. Muchas gracias!',
                    icon: "error",
                  });
                  setUser({ name: '', phone: '', email: '', numOfNumbers: '2' })
                  return setVoucher(null)
              }

              if (data.existant) {
                  await Swal.fire({
                    title: 'Usuario ya registrado',
                    text: data.existant,
                    icon: "info",
                  });
              }
                // await emailjs
                // .send(
                //   'service_yefes9k',
                //   'template_3lryzv6',
                //   {
                //     name: data.user,
                //     phone: data.phone,
                //     voucher: data.voucher.image_url,
                //     email: data.email
                //   },
                //   { publicKey: 'zADAsfTnn9pOJcyPO' }
                // )
                // .then(
                //   async () => {},
                //   (error) => console.error('Error:', error)
                // );

                // await emailjs
                // .send(
                //   'service_yefes9k',
                //   'template_7sfakso',
                //   {
                //     email: data.email,
                //     numbers: data.voucher.num_of_numbers
                //   },
                //   { publicKey: 'zADAsfTnn9pOJcyPO' }
                // )
                // .then(
                //   async () => {
                //   await Swal.fire({
                //     title: "Números comprados!",
                //     text: 'Se te enviará un correo a la brevedad para confirmar tu comprobante.',
                //     icon: "success",
                //     draggable: true
                //   });
                //   },
                //   (error) => console.error('Error:', error)
                // );
                Swal.fire({
                    title: "Números comprados!",
                    text: 'Se te enviará un correo a la brevedad para confirmar tu comprobante.',
                    icon: "success",
                    draggable: true
                  });
                setUser({ name: '', phone: '', email: '', numOfNumbers: '2' })
                return setVoucher(null)
            }
        } catch (error: any) {
             if (error.response && error.response.data) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Algo salió mal: ${error.response.data.error}`,
              });
             } else {
               return console.error(error.message)
             }
        }
    }

  return (
    <main className='flex flex-col gap-8 rounded-xl p-7 pt-28 items-center md:pb-20' id='form'>
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
            label='Teléfono:'
            placeholder='Ej: 9 1233 4567'
            name='phone'
            maxLength={9}
            value={user.phone}
            onChange={handleChange}
            required={true}
            />

            <Input
            type='email'
            label='Correo:'
            placeholder='Ej: usuario@gmail.com'
            name='email'
            maxLength={100}
            value={user.email}
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

            <div className='flex flex-col items-center gap-5'>
              <label htmlFor="">Cantidad de Números:</label>
              <div className='flex items-center gap-5'>
                <button type='button' onClick={() => {setUser( { ...user, numOfNumbers: '2' } )}} value={user.numOfNumbers} name='numOfNumbers' className={`text_1 rounded-lg py-3 text-black hover:bg-lime-200 hover:cursor-pointer w-18 ${user.numOfNumbers === '2' ? 'bg-lime-200' : 'bg-lime-400'}`}>2</button>
                <button type='button' onClick={() => {setUser( { ...user, numOfNumbers: '4' } )}} value={user.numOfNumbers} name='numOfNumbers' className={`text_1 rounded-lg py-3 text-black hover:bg-lime-200 hover:cursor-pointer w-18 ${user.numOfNumbers === '4' ? 'bg-lime-200' : 'bg-lime-400'}`}>4</button>
                <button type='button' onClick={() => {setUser( { ...user, numOfNumbers: '6' } )}} value={user.numOfNumbers} name='numOfNumbers' className={`text_1 rounded-lg py-3 text-black hover:bg-lime-200 hover:cursor-pointer w-18 ${user.numOfNumbers === '6' ? 'bg-lime-200' : 'bg-lime-400'}`}>6</button>
              </div>
            </div>
            
            <button 
            className='bg-lime-400 text_1 rounded-lg py-3 text-black hover:bg-lime-200 hover:cursor-pointer'
            type='submit'>Comprar números</button>
          </form>
    </main>
  )
}

export default Form