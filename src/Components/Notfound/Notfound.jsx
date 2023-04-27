import React from 'react'
import notfound from '../../Assets/pngwing.com.png'

export default function Notfound() {
  return (
    <div className='mt-5 pt-md-3 pt-5'>
      <div className=' container d-flex flex-column justify-content-center align-items-center'>

      <img className=' opacity-25 w-75' src={notfound} alt="" />
      <p className='fs-2 text-white-50 fw-bolder'>Page not found</p>
      </div>


    </div>
  )
}
