import React, { useEffect, useState } from 'react'
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import All from './Components/All/All'
import Platforms from './Components/Platforms/Platforms'
import Category from './Components/Category/Category'
import Sortby from './Components/Sortby/Sortby'
import Login from './Components/Login/Login'
import Notfound from './Components/Notfound/Notfound'
import CreateAccount from './Components/CreateAccount/CreateAccount'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import jwt_decode from "jwt-decode";

export default function App() {

  let [userData, setUserdata] = useState(null)


  useEffect(() => {

    if (localStorage.getItem("token")) {
      let data = jwt_decode(localStorage.getItem("token"))
      saveUserData(data)
    }
  }, [])

  function LogOut() {
    saveUserData(null)
    localStorage.removeItem("token")
    return <Navigate to="/login"/>
    
  }

  function saveUserData(data) {
    console.log(data);
    setUserdata(data)

  }

  function RouterProtector(props) {

    console.log(props.children);

    if (localStorage.getItem("token")) {
      return props.children

    } else {
      return <Navigate to="/login"/>

    }

  }

  let routers = createHashRouter([
    {
      path: "/", element: <Layout LogOut={LogOut} userData={userData} />, children: [
        { path: "home", element: <RouterProtector><Home /></RouterProtector> },
        { path: "all", element: <RouterProtector><All/></RouterProtector> },
        { path: "platform/:x", element: <RouterProtector><Platforms/></RouterProtector> },
        { path: "category/:x", element: <RouterProtector><Category /></RouterProtector> },
        { path: "sort-by/:x", element: <RouterProtector><Sortby /></RouterProtector> },
        { path: "all", element: <RouterProtector><All /></RouterProtector> },
        { index: true, element: <RouterProtector><Home /></RouterProtector> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "createAccount", element: <CreateAccount saveUserData={saveUserData} /> },
        { path: "productDetails/:id", element: <RouterProtector><ProductDetails /></RouterProtector> },
        { path: "*", element: <Notfound /> },

      ]
    }
  ])
  return (
    <RouterProvider router={routers} />
  )
}

