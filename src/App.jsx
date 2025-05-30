
import { NavLink,  BrowserRouter as Router } from "react-router-dom"
import './styles/style.css'
import AppRouter from "./components/routes"


function App() {


  return (
    <>
    
      
      <div className='flex w-4/5 mx-auto h-lvh p-3'>
      
      <AppRouter/>

       
      </div>
      
      

     
    </>
  )
}

export default App
