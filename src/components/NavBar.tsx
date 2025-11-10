import { useState } from 'react'
import { SlMenu } from "react-icons/sl";
import BurguerMenu from './BurguerMenu';

const NavBar = () => {

  const [burguerActive, setBurguerActive] = useState(false)

  return (
    <nav className='fixed top-0 w-full flex items-center justify-between px-5 py-2 bg-neutral-900/80 z-20
    md:bg-neutral-900 md:p-5 md:h-fit
    lg:left-0'>
      
      <section className='flex items-center gap-5 md:hidden'>
        <SlMenu size={35} onClick={() => setBurguerActive(true)}/>
      </section>

      <section className='hidden md:flex w-2/5 justify-evenly text-2xl text-lime-400'>
        <a href="">Inicio</a>
        <a href="">Pago</a>
        <a href="">Premios</a>
      </section>

      <img src="/imgs/logo.png" alt="logo" width={130} className='rounded-lg md:w-54'/>

      {burguerActive && (<BurguerMenu setBurguerActive={ setBurguerActive }/>)}
      
    </nav>
  )
}

export default NavBar