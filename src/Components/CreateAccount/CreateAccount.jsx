import React, { useEffect, useState } from 'react'
import gaming from '../../Assets/gaming.ebaf2ffc84f4451d.jpg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate , Link } from 'react-router-dom'


export default function CreateAccount({saveUserData}) {

  let BaseURL = "https://route-ecommerce.onrender.com"


  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate('/home')
    }
  },[])

  let [errorMassege, setErrorMassege] = useState("")
  let [loading, setloading] = useState(true)

  let navigate = useNavigate()

  let validationSchema = Yup.object({

    name: Yup.string().required("name is a required field").min(3, "Name length must be between 3 to 20 character").max(20, "Name length must be between 3 to 20 character"),
    email: Yup.string().required().email("Enter valid email"),
    phone: Yup.string().required().matches(/^(010|011|012|015)[0-9]{8}$/, "enter valid phone"),
    password: Yup.string().required().matches(/^(?=.*\d).{8,}$/, "Min length is 8 characters with at least 1 number in it"),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")], "password doesn't match"),


  })



  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => {
      sendRegesterData(values)
    },
    validationSchema
  })
  async function sendRegesterData(values) {
    setloading(false)

    let data = await axios.post(`${BaseURL}/api/v1/auth/signup`, values).catch((error) => {
     
      setErrorMassege(error.response.data.message)
      setloading(true)
    })
    if (data.data.message === "success") {

      saveUserData(data.data.user)
      navigate('/login')
    }
  }

  return (
    <div className='min-vh-100 d-flex justify-content-center align-items-center'>
      <div className=' container bg-gray mb-5 mt-5 rounded-3 overflow-hidden'>
        <div className="row rounded-3">
          <div className="col-md-6 p-0 rounded-3">
            <img className='w-100 h-100' src={gaming} alt="" />
          </div>
          <div className="col-md-6 text-center bg-gray p-4 pb-3">
            <p className='fs-4 fw-bolder text-white-50'>Create My Account!</p>
            <form onSubmit={formik.handleSubmit} className='border border-top-0 border-start-0 border-end-0 border-secondary'>

              <div className='mb-3'>
                <input onChange={formik.handleChange} className='form-control mb-md-0 mb-3 bg-dark border-0 text-white ' type="text" name="name" id="name" placeholder='Frist Name' />
                {formik.errors.name ? <div className=' text-warning text-start p-1 m-0 mt-1'>
                  <p className='fs-7 m-0'>{formik.errors.name}</p>
                </div> : ""}
              </div>

              <div className=' mb-3'>
                <input onChange={formik.handleChange} className=' form-control bg-dark border-0 text-white' type="text" name='email' id='email' placeholder='Email Address' />
                {formik.errors.email ? <div className='text-warning text-start p-1 m-0 mt-1'>
                  <p className='fs-7 m-0'>{formik.errors.email}</p>
                </div> : ""}
              </div>
              <div className='mb-3'>
                <input onChange={formik.handleChange} className=' form-control bg-dark border-0 text-white' type="text" name='phone' id='phone' placeholder='phone' />
                {formik.errors.phone ? <div className='text-warning text-start p-1 m-0 mt-1'>
                  <p className='fs-7 m-0'>{formik.errors.phone}</p>
                </div> : ""}
              </div>
              <div>
                <div className='row mb-3' >
                  <div className="col-md-6 mb-md-0 mb-3">
                    <input onChange={formik.handleChange} className=' form-control bg-dark border-0 text-white' type="password" name='password' id='password' placeholder='password' />
                    {formik.errors.password ? <div className='text-warning text-start p-1 m-0 mt-1'>
                      <p className='fs-7 m-0'>{formik.errors.password}</p>
                    </div> : ""}
                  </div>
                  <div className="col-md-6">
                    <input onChange={formik.handleChange} className=' form-control bg-dark border-0 text-white' type="password" name='rePassword' id='rePassword' placeholder='repassword' />
                    {formik.errors.rePassword ? <div className='text-warning text-start p-1 m-0 mt-1'>
                      <p className='fs-7 m-0'>{formik.errors.rePassword}</p>
                    </div> : ""}
                  </div>
                </div>
              </div>
              {errorMassege !== "" ? <div className='text-danger mb-2'><p className='m-0 fs-6'>{errorMassege}</p></div> : ""}

              {loading === true ? <button type='submit' className='btn btn-dark text-white w-100 mb-3'>Create Account</button> : <button type='button' className='btn btn-dark text-white w-100 mb-3'><i class="fa-solid fa-circle-notch fa-spin"></i></button>}


              <p className='text-white-50 fs-7'>This site is protected by reCAPTCHA and the Google <span className='pointer text-decoration-underline'>Privacy Policy</span>  and <span className='pointer text-decoration-underline'>Terms of Service</span> apply.</p>
            </form>
            <p className='text-white-50 mt-3'>Already a member?<span className='text-blue pointer'> <Link className=' text-decoration-none text-blue ' to={"/login"} >Login<i className="fa-solid fa-angle-right fa-sm"></i></Link> </span></p>



          </div>

        </div>

      </div>
    </div>
  )
}
