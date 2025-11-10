import { HiOutlineX } from "react-icons/hi";
import { FaSackDollar } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa"; 

type Props = {
  setBurguerActive: (value: boolean) => void
}

const BurguerMenu = ({ setBurguerActive }: Props) => {

  const navigate = (sect: any) =>{
    const navigateTo = document.getElementById(sect)
    navigateTo?.scrollIntoView({ behavior: 'smooth' })
    setBurguerActive(false)
  }

  return (
    <main className='fixed top-0 left-0 w-4/5 bg-neutral-900 z-10 p-3 pb-44 flex flex-col gap-6 px-5'>
      {/* logo y X */}
      <section className='flex items-center justify-between w-full pt-5'>
        <HiOutlineX onClick={() => setBurguerActive(false)} size={40}/>
      </section>

      {/* links */}
      <section className='flex flex-col items-start text-[1.6rem] gap-5 text_2'>
        <div className='flex w-full justify-between items-center'>
        <button className='text-lime-400 hover:text-lime-200 hover:underline' onClick={() => navigate('land')}>Inicio</button>
        <FaHome size={30}/>
        </div>

        <div className='w-full border border-neutral-50'></div>

        <div className='flex w-full justify-between items-center'>
          <button className='text-lime-400 hover:text-lime-200 hover:underline' onClick={() => navigate('payment')}>Pago</button>
          <FaSackDollar size={30}/>
        </div>

        <div className='w-full border border-neutral-50'></div>

        <div className='flex w-full justify-between items-center'>
          <button className='text-lime-400 hover:text-lime-200 hover:underline' onClick={() => navigate('form')}>Enviar Datos</button>
          <FaWpforms size={30}/>
        </div>

        <div className='w-full border border-neutral-50'></div>
      </section>

      {/* contacto */}
      <section className='flex flex-col items-start gap-4'>
        
        <h2 className='text-xl'>Contacto</h2>
          
        <section className='flex flex-col items-start'>
          <h2>José Matute</h2>
          <div className='flex items-center gap-2'>
            <FaPhone size={20} className='rotate-90'/>
            <p>+(56) 9 9414 9032</p>
          </div>
        </section>

        <section className='flex flex-col items-start'>
          <h2>Jorge Luis</h2>
          <div className='flex items-center gap-2'>
            <FaPhone size={20} className='rotate-90'/>
            <p>+(56) 9 5715 8578</p>
          </div>
        </section>

        <section className='flex flex-col items-start'>
          <h2>Anthony R.</h2>
          <div className='flex items-center gap-2'>
            <FaPhone size={20} className='rotate-90'/>
            <p>+(56) 9 7474 5356</p>
          </div>
        </section>

        <section className='flex flex-col items-start'>
          <div className='flex items-center gap-2'>
            <FaEnvelope size={20}/>
            <p>correo@gmail.com</p>
          </div>
        </section>

        <section className='self-end flex items-center'>
          <a href="https://wa.me/994149032"
            target="_blank">
            <img src="/imgs/wsp.png" alt="wsp" width={60} className='self-center p-1'/>
          </a>

          <img src="/imgs/ig.png" alt="ig" width={60} className='self-center p-0.5'/>
        </section>

      </section>
    </main>
  )
}

export default BurguerMenu