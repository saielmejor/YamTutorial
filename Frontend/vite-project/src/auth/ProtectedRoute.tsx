import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
    const {isAuthenticated}=useAuth0()
  return isAuthenticated? (<Outlet></Outlet>): (<Navigate to="/" replace/>)
}
