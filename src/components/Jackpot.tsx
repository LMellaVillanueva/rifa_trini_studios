import { useEffect, useState } from "react"

const Jackpot = () => {

    const [offset, setOffset] = useState(0)
    const wDisplay = window.innerWidth

    useEffect(() => {
        const handleScroll = () => {
            // guardar el scroll actual
            setOffset(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    }), []

  return (
    <main className='flex flex-col items-center relative h-[75vh] overflow-clip
    md:h-[95vh] md:top-16
    lg:h-[120vh] lg:top-12'
    id="land">

     <div className="absolute h-[50vh] w-full">
        <img 
          src="/imgs/money.gif" 
          alt="money_gif" 
          className="h-[60vh] w-full object-cover
          md:h-[70vh]
          lg:h-[150vh]"
        />
        {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-black"></div> */}
      </div>

        <h1 className='sticky top-20 text-6xl text-lime-400 font-medium p-7 text_1
        md:top-50 md:text-7xl'>
          ¡Gana un millón de pesos!
        </h1>

        <img src="/imgs/dollars.png" 
        alt="premio" 
        className='drop-shadow-lime-400 drop-shadow-lg absolute top-80
        md:w-[800px]
        lg:w-[2000px]' 
        width={900}
        style={{
            // controla la subida
            transform: ` ${wDisplay < 800 ? `translateY(${-offset * 0.1}px)` : `translateY(${-offset * 0.1}px)`} 
            ${wDisplay < 800 ? `scale(${1 + offset * 0.0005})` : `scale(${1 + offset * 0.0005})`} `,
            transition: 'transform 0.1s linear',
        }}/>
    </main>
  )
}

export default Jackpot