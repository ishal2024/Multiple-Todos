import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { logInUser } from './api/userAuth/auth'
import { useSelector } from 'react-redux'
import Sidebar from './Components/Layout/Sidebar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import GlobalRouter from './Components/Layout/GlobalRouter'

function App() {


  return (
    <>
      <GlobalRouter />
      <ToastContainer />
      <Sidebar />

    </>
  )
}

export default App
