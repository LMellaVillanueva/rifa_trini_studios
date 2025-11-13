import './App.css'
import NavBar from './components/NavBar'
import Landing from './components/Landing'
import { Route, Routes } from 'react-router-dom'
import LoginAdmin from './admin/LoginAdmin'
import Dashboard from './admin/Dashboard'

function App() {

  const display = window.innerHeight
  console.log(display)

  return (
    <Routes>
       <Route
        path="/"
        element={
          <main className="relative flex flex-col justify-between gap-12 items-center" id='allContainer'>
            {/* <img src="/imgs/palabra_rifa.png" alt="side_img" className='absolute rotate-270 right-190 h-screen object-cover' /> */}
            <div id='evContainer'>
              <div className="absolute inset-0 bg-[url('imgs/fondo.jpg')] bg-repeat bg-center bg-cover opacity-60 -z-10" />
              <NavBar />
              <Landing />
            </div>
          </main>
        }
        />
        
        <Route path='/admin' element={<LoginAdmin/>} />
        <Route path='/dashboard' element={<Dashboard/>} />

    </Routes>
  )
}

export default App
