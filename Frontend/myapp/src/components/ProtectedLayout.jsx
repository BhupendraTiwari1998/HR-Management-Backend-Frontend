import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
    const token = localStorage.getItem("token")
  return (
    <div>
        {
           token ? <Outlet/> : <Navigate to={"/sign-in"} />
        }
    </div>
  )
}

export default ProtectedLayout
