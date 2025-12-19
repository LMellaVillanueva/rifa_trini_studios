import { useEffect, useState } from 'react'
import { SlMenu } from "react-icons/sl"
import BurguerMenu from './BurguerMenu'
import Button from '../shared/Button'

const NavBar = () => {
  const [burguerActive, setBurguerActive] = useState(false)
  const [showNotice, setShowNotice] = useState(true)
  const wSize = window.innerWidth
  const rifaDate = '30 de noviembre'

  const navigate = (sect: string) => {
    if (sect === 'land') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(sect)?.scrollIntoView({ behavior: 'smooth' })
    }
    setBurguerActive(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowNotice(window.scrollY <= 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full z-20">
      
      <nav
        className="
          w-full flex items-center justify-between px-5 py-2 
          bg-neutral-900/80
          md:bg-neutral-900 
          lg:px-0 lg:py-0 lg:gap-10 lg:justify-center lg:h-[150px]
        "
      >
        <section className="flex items-center gap-5 lg:hidden">
          <SlMenu size={35} onClick={() => setBurguerActive(true)} />
        </section>

        <img
          src="/imgs/logo.png"
          onClick={() => navigate('land')}
          alt="logo"
          width={130}
          className="rounded-lg cursor-pointer md:w-54 lg:w-72"
        />

        <section className="hidden lg:flex items-center w-4/6 lg:w-8/12 justify-evenly text-[16px] text-lime-400">
          <Button onClick={() => navigate('land')} text="Inicio" />
          <Button onClick={() => navigate('payment')} text="Pago" />
          <Button onClick={() => navigate('form')} text="Enviar Datos" />

          <a
            href="https://wa.me/994149032"
            target="_blank"
            className="
              text-lime-400 border border-lime-400 px-[25px] py-3 
              rounded-2xl font-semibold cursor-pointer
              hover:text-lime-100 hover:border-lime-100
            "
          >
            Contacto
          </a>
        </section>

        {burguerActive && (
          <BurguerMenu setBurguerActive={setBurguerActive} />
        )}
      </nav>

      {/* Notificación */}
      <section
        className={`
          w-full bg-lime-500 text-neutral-900
          text-center py-2 text-md font-semibold
          transition-all duration-300
          ${showNotice 
            ? 'translate-y-0 opacity-100 pointer-events-auto' 
            : '-translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        {wSize < 700 ? (
          <p>🎉 La rifa se lanza el {rifaDate}... <br /> ¡No te quedes fuera! 🔥</p>
        ) : (
          <p>🎉 La rifa se lanza el {rifaDate} — ¡No te quedes fuera! 🔥</p>
        )}
      </section>

    </div>
  )
}

export default NavBar
