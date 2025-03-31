
import { NavLink,  BrowserRouter as Router } from "react-router-dom"
import './styles/style.css'
import AppRouter from "./components/routes"


function App() {


  return (
    <>
    
      
      <div className='flex w-4/5 mx-auto h-lvh p-3'>
      {/* <h1 className="text-3xl font-bold mb-2">
        Ma carte culturelle
      </h1>
      <nav className="flex gap-5 bg-blue-950 text-amber-50 px-4 py-2">
                <NavLink to="/" >Home</NavLink>
               
      </nav> */}
      <AppRouter/>

       
      </div>
      
      

     
    </>
  )
}

export default App
