import React, { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import MyCalendar from './Components/MyCalendar'
import Login from './Forms/Login'
import Register from './Forms/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
import Availability from './Components/Availability'
import Sessions from './Components/Sessions'
import HomePage from './HomePage'
import UserList from './Components/UserList'
import UserDetails from './Components/UserDetails'

const App:React.FC=()=>{
  const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter>
    <Routes>
     <Route path="/" element = {<UserDetails/>}/>
     <Route path='/userList' element={<HomePage/>} />
     <Route path="/login" element={<Login/>}/>
     <Route path='/signup' element={<Register/>}/>
     <Route path="/setAvailability/:userId"
     element={<Availability/>}/>
     <Route path='/sessions/:userId' element={<Sessions/>}/>
     </Routes>
    </BrowserRouter>
    <ToastContainer
     position="top-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
    />

    </>
  )
}

export default App
