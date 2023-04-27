import React, { useState } from 'react'
import Logo from '../../Assets/logo.png'
import gaming from '../../Assets/gaming.ebaf2ffc84f4451d.jpg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate , Link } from 'react-router-dom'

export default function Login({saveUserData}) {

  let BaseURL = "https://route-ecommerce.onrender.com"

  let [errorMassege, setErrorMassege] = useState("")
  let [loading, setloading] = useState(true)

  let navigate = useNavigate()

  let validationSchema = Yup.object({

    email: Yup.string().required().email("Enter valid email"),
    password: Yup.string().required()


  })



  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      sendLoginData(values)
    },
    validationSchema
  })
  async function sendLoginData(values) {
    setloading(false)

    let data = await axios.post(`${BaseURL}/api/v1/auth/signin`, values).catch((error) => {
     
      setErrorMassege(error.response.data.message)
      setloading(true)
    })

    if (data.data.message === "success") {

      saveUserData(data.data.user)
      localStorage.setItem("token",data.data.token)
      navigate('/home')
    }
  }
  return (
    <div className='min-vh-100 d-flex justify-content-center align-items-center'>
      <div className=' container bg-gray mb-5 mt-5 rounded-3 overflow-hidden'>
        <div className="row rounded-3">
          <div className="col-md-6 p-0 rounded-3">
            <img className='w-100 h-100' src={gaming} alt="" />
          </div>
          <div className="col-md-6 text-center bg-gray p-5">
            <img className='w-25' src={Logo} alt="" />
            <p className='fs-4 fw-bolder text-white-50'>Log in to GameOver</p>
            <form onSubmit={formik.handleSubmit} className='border border-top-0 border-start-0 border-end-0 border-secondary'>
              <div className='mb-3'>
              <input onChange={formik.handleChange} className=' form-control bg-dark border-0 text-white' type="text" name='email' id='email' placeholder='Email Address' />
                {formik.errors.email ? <div className='text-warning text-start p-1 m-0 mt-1'>
                  <p className='fs-7 m-0'>{formik.errors.email}</p>
                </div> : ""}
              </div>
              <div className='mb-3'>
              <input onChange={formik.handleChange} className=' form-control bg-dark border-0 text-white' type="password" name='password' id='password' placeholder='password' />
                    {formik.errors.password ? <div className='text-warning text-start p-1 m-0 mt-1'>
                      <p className='fs-7 m-0'>{formik.errors.password}</p>
                    </div> : ""}
              </div>
              {errorMassege !== "" ? <div className='text-danger mb-2'><p className='m-0 fs-6'>{errorMassege}</p></div> : ""}

              {loading === true ? <button type='submit' className='btn btn-dark text-white w-100 mb-3'>Login</button> : <button type='button' className='btn btn-dark text-white w-100 mb-3'><i class="fa-solid fa-circle-notch fa-spin"></i></button>}

            </form>
            <p className='text-blue mb-0 mt-3 pointer'>Forgot Password?</p>
            <p className='text-white'>Not a member yet?<span className='text-blue pointer'><Link  className=' text-decoration-none text-blue ' to={"/createAccount"}> Create Account<i class="fa-solid fa-angle-right fa-sm"></i></Link></span></p>



          </div>

        </div>

      </div>
    </div>
  )
}
