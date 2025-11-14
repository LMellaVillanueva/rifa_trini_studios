import React, { useState } from 'react'
import type { Admin } from '../types'
import Input from '../shared/Input'
import api from '../AxiosConfig'
import { useNavigate } from 'react-router-dom'

const LoginAdmin = () => {

    const navigate = useNavigate()
    const [admin, setAdmin] = useState<Admin>({ email: '', password: '' })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdmin({...admin, 
            [event.target.name]: event.target.value
            })
        }

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            if (!admin.email || !admin.password) {
                return window.alert('Debes completar el inicio de sesión')
            }
            const { data } = await api.post('/user/login_admin', admin)

            if (data) {
                console.log(data)
                window.localStorage.setItem('token', data.token)
                return navigate('/dashboard')
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
    <main className='flex flex-col gap-10 py-20 px-5 
    md:w-3/4 md:mx-auto
    lg:w-screen'>
        <button 
        className="absolute top-5 left-5 md:top-10 md:left-10 p-3 rounded-md bg-lime-400 hover:bg-lime-200 text-black cursor-pointer w-fit mx-auto md:text-3xl"
        onClick={() => {navigate('/')}}>Volver</button>
            <h1 className='text_1 text-lime-400 text-4xl mt-10 md:text-6xl'>Inicio de Sesión Administrador</h1>
        <form onSubmit={handleLogin} className='flex flex-col gap-9 text-2xl text_2 text-start p-2 lg:w-1/2 lg:mx-auto'>
            <Input
            type='email'
            label='Correo:'
            name='email'
            value={admin.email}
            onChange={handleChange}
            maxLength={20}
            required={true}
            />
            <Input
            type='password'
            label='Contraseña:'
            name='password'
            value={admin.password}
            onChange={handleChange}
            maxLength={20}
            required={true}
            />
        <button 
        className="p-3 rounded-md bg-lime-400 hover:bg-lime-200 text-black cursor-pointer w-fit mx-auto md:text-3xl" 
        type='submit'>Iniciar Sesión</button>
        </form>
    </main>
  )
}

export default LoginAdmin