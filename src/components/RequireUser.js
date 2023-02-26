import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { ACCESS_TOKEN_KEY, getItem } from '../utils/localStorageManager'

function RequireUser() {
    const user = getItem(ACCESS_TOKEN_KEY);
  return (
    user ? <Outlet/> : <Navigate to='/auth/login'/>
  )
}

export default RequireUser