import { useState } from 'react'
import { SlMenu } from "react-icons/sl";
import BurguerMenu from './BurguerMenu';
import Button from '../shared/Button';

const NavBar = () => {

  const [burguerActive, setBurguerActive] = useState(false)

  const navigate = (sect: any) =>{
    const navigateTo = document.getElementById(sect)
    navigateTo?.scrollIntoView({ behavior: 'smooth' })
    setBurguerActive(false)
  }
  // fixed top-0 w-full flex items-center justify-between px-5 py-2 bg-neutral-900/80 z-20
  return (
    <nav className='fixed top-0 left-0 w-full flex items-center justify-between px-5 py-2 bg-neutral-900/80 z-20
    md:bg-neutral-900 
    lg:px-0 lg:py-0 lg:gap-10 lg:justify-center lg:h-[150px]' 
    id='allContainer'>
      
      <section className='flex items-center gap-5 lg:hidden'>
        <SlMenu size={35} onClick={() => setBurguerActive(true)}/>
      </section>

      <img src="/imgs/logo.png" onClick={() => navigate('land')} alt="logo" width={130} className='rounded-lg cursor-pointer md:w-54 lg:w-72'/>
    
      <section className='hidden lg:flex items-center w-4/6 lg:w-8/12 md:justify-evenly lg:justify-evenly text-[16px] text-lime-400'>

        <Button
        onClick={() => navigate('land')}
        text='Inicio'/>
        <Button
        onClick={() => navigate('payment')}
        text='Pago'/>
        <Button
        onClick={() => navigate('form')}
        text='Enviar Datos'/>
        
        <a 
        href="https://wa.me/994149032"
        target="_blank" 
        className='text-lime-400 border border-lime-400 px-[25px] py-3 w-38 rounded-2xl font-semibold cursor-pointer
       hover:text-lime-100 hover:border-lime-100'>Contacto</a>

      </section>

      {burguerActive && (<BurguerMenu setBurguerActive={ setBurguerActive }/>)}
      
    </nav>
  )
}

export default NavBar