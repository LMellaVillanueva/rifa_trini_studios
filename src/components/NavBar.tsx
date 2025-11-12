import { useState } from 'react'
import { SlMenu } from "react-icons/sl";
import BurguerMenu from './BurguerMenu';

const NavBar = () => {

  const [burguerActive, setBurguerActive] = useState(false)

  const navigate = (sect: any) =>{
    const navigateTo = document.getElementById(sect)
    navigateTo?.scrollIntoView({ behavior: 'smooth' })
    setBurguerActive(false)
  }

  return (
    <nav className='fixed top-0 w-full flex items-center justify-between px-5 py-2 bg-neutral-900/80 z-20
    md:bg-neutral-900 md:p-5 md:h-fit
    lg:left-0' 
    id='allContainer'>
      
      <section className='flex items-center gap-5 md:hidden'>
        <SlMenu size={35} onClick={() => setBurguerActive(true)}/>
      </section>

      <section className='hidden md:flex w-3/5 lg:w-1/4 md:justify-evenly lg:justify-between lg:mx-10 text-2xl text-lime-400'>
        <button className='text-lime-400 font-semibold hover:text-lime-200 hover:underline cursor-pointer' onClick={() => navigate('land')}>Inicio</button>
        <button className='text-lime-400 font-semibold hover:text-lime-200 hover:underline cursor-pointer' onClick={() => navigate('payment')}>Pago</button>
        <button className='text-lime-400 font-semibold hover:text-lime-200 hover:underline cursor-pointer' onClick={() => navigate('form')}>Enviar Datos</button>
      </section>

      <img src="/imgs/logo.png" alt="logo" width={130} className='rounded-lg md:w-54 lg:w-44'/>

      {burguerActive && (<BurguerMenu setBurguerActive={ setBurguerActive }/>)}
      
    </nav>
  )
}

export default NavBar