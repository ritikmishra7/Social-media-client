import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
// import Home from './pages/Home'
// import Signup from './pages/Signup'




function App() {
  return (
    <div className='bodyContainer'>
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Login />} path='/auth/login' />
        <Route element={<Signup />} path='/auth/signup' />
      </Routes>
    </div>
  )
}

export default App