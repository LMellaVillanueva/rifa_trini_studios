import { FaUniversity } from "react-icons/fa";
import Form from './Form';
import Jackpot from "./Jackpot";

const Landing = () => {

//  const numbers = [...Array(10)].map((_, i) => i + 1)

  return (
    <main className='flex flex-col gap-20 py-10 pb-24 w-full mt-12'>

        {/* PREMIO */}
        <Jackpot/>

        {/* <article className='flex flex-col items-center relative'>
            <h1 className='self-start text-4xl bg-black/80 text-lime-400 font-medium p-7 text_1 rounded-e-4xl '>Segundo Premio</h1>
            <img src="/imgs/moto.png" alt="premio" className='drop-shadow-lime-400 drop-shadow-lg' width={350}/>
            <h2 className='text-5xl text_4 absolute bottom-0 text-rose-300'>Ducati Monster</h2>
        </article>

        <article className='flex flex-col items-center relative'>
            <h1 className='self-start text-4xl bg-black/80 text-lime-400 font-medium p-7 text_1 rounded-e-4xl '>Tercer Premio</h1>
            <img src="/imgs/bolsa.png" alt="premio" className='drop-shadow-lime-400 drop-shadow-lg' width={350}/>
            <h2 className='text-5xl text_4 absolute bottom-8 text-green-300'>100k</h2>
        </article> */}

            {/* INFO */}
        <article className='flex flex-col gap-8 rounded-xl p-7 items-center md:pb-20'>
            <h1 className='text-[2.9rem] md:text-7xl text-lime-400 font-medium text_1'>¡Compra <br /> tus Números!</h1>

            <span className='flex flex-col items-center text-2xl md:text-4xl'>
                <p className='text_2'>Compra mínima:</p>
                <p className='text-lime-400 text-4xl md:text-5xl font-extrabold text_3'>2 números</p>
            </span>


            <span className='flex flex-col items-center text-2xl md:text-4xl'>
                <p className='text_2'>Valor por 2 números:</p>
                <p className='text-lime-400 text-5xl md:text-6xl font-extrabold text_3'>$6.000</p>
            </span>

            <p className='text-xl text_3 md:text-4xl'>Número al azar de 1 al 200</p>

            {/* DATOS TRANSFER. */}
            <h1 className='text-4xl md:text-6xl text-lime-400 font-medium text_1 pt-26' id="payment">Datos de <br /> Transferencia</h1>
            <FaUniversity size={90}/>

            <article className='bg-neutral-800/70 flex flex-col gap-8 p-5 rounded-lg md:p-14'>
                <span className='flex justify-between items-center gap-10 text-xl md:text-2xl'>
                    <p>Nombre:</p>
                    <p className='text_2 text-lime-400'>José Matute</p>
                </span>
                <span className='flex justify-between items-center gap-10 text-xl md:text-2xl'>
                    <p>Rut:</p>
                    <p className='text_2 text-lime-400'>26.499.726-7</p>
                </span>
                <span className='flex justify-between items-center gap-10 text-xl md:text-2xl'>
                    <p>Correo:</p>
                    <p className='text_2 text-lime-400'>correo@gmail.com</p>
                </span>
                <span className='flex justify-between items-center gap-10 text-xl md:text-2xl'>
                    <p>Banco:</p>
                    <p className='text_2 text-lime-400'>Mercado Pago <br /> Cuenta Vista</p>
                </span>
                <span className='flex justify-between items-center gap-10 text-xl md:text-2xl'>
                    <p>N° Cuenta:</p>
                    <p className='text_2 text-lime-400'>001072506074</p>
                </span>
            </article>
            <a className='text_1 bg-lime-400 text-black rounded-lg text-2xl px-10 py-4 flex items-center gap-4 hover:bg-lime-200'
            href="https://wa.me/994149032"
            target="_blank">
                Whatsapp
                <img src="/imgs/wspBlack.png" alt="wsp" width={50} />
            </a>
        </article>

        {/* FORMULARIO */}
        <Form/>
        
    </main>
  )
}

export default Landing