import { FaBriefcase } from 'react-icons/fa';

const Footer = () => {
  return (
    <main className="flex flex-col items-center justify-around py-14 bg-black/90 rounded-t-2xl">
        <p className="text_2 md:text-2xl">Rifa Trinidad Studios 2025 © Todos los derechos reservados.</p> <br />

        <div className="flex flex-col md:self-end-safe md:mr-20 items-center gap-1 md:text-lg">
            <p className="underline">Desarrollado por Lucas Mella</p>

            <div className="flex items-center pt-1">
                <a href="https://www.linkedin.com/in/lucas-mella-947989231/" target="_blank">
                    <img src="/imgs/lnkd.png" alt="linkedIn" className="w-10 pb-1 md:w-11" />
                </a>
                <a href="https://wa.me/981314078" target="_blank">
                    <img src="/imgs/wsp.png" alt="wsp" className="w-9 md:w-10" />
                </a>
                <a href="https://portafolio-lucas-mella.vercel.app/" target='_blank'>
                    <FaBriefcase size={32} className='m-1 mb-3'/>
                </a>
            </div>
        </div>
    </main>
  )
}

export default Footer