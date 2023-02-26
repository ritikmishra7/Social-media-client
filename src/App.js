import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import RequireUser from './components/RequireUser'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'





function App() {
  return (
    <div className='bodyContainer'>
      <Routes>
        <Route element={<RequireUser/>}>
        <Route element={<Home />} path='/' />
        </Route>
        <Route element={<Login />} path='/auth/login' />
        <Route element={<Signup />} path='/auth/signup' />
      </Routes>
    </div>
  )
}

export default App