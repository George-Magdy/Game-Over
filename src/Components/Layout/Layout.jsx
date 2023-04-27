import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Layout({userData , LogOut}) {
  return (
    <div className='nav-bg-color'>

        <Navbar LogOut={LogOut} userData={userData}/>
        <div className=' min-vh-100'>
            <Outlet/>
        </div>



    </div>
  )
}
