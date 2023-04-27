import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../Assets/logo.png'

export default function Navbar({ userData,LogOut }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary nav-bg-color text-white shadow fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand text-white ms-5 me-5" to={userData ? "home" : "login"}><img className='w-10' src={Logo} alt="" />Game Over</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {userData !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link text-white " : "nav-link text-white-50 "} to="home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link text-white " : "nav-link text-white-50 "} to="all">All</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white-50" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Platforms
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={"/platform/pc"}>Pc</Link></li>
                <li><Link className="dropdown-item" to={"/platform/browser"}>Browser</Link></li>
              </ul>

            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white-50" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                sort-by
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={"/sort-by/release-date"}>release-date</Link></li>
                <li><Link className="dropdown-item" to={"/sort-by/popularity"}>popularity</Link></li>
                <li><Link className="dropdown-item" to={"/sort-by/alphabetical"}>alphabetical</Link></li>
                <li><Link className="dropdown-item" to={"/sort-by/relevance"}>relevance</Link></li>
              </ul>

            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white-50" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                category
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={"/category/racing"}>racing</Link></li>
                <li><Link className="dropdown-item" to={"/category/sports"}>sports</Link></li>
                <li><Link className="dropdown-item" to={"/category/social"}>social</Link></li>
                <li><Link className="dropdown-item" to={"/category/shooter"}>shooter</Link></li>
                <li><Link className="dropdown-item" to={"/category/open-world"}>open-world</Link></li>
                <li><Link className="dropdown-item" to={"/category/zombie"}>zombie</Link></li>
                <li><Link className="dropdown-item" to={"/category/fantasy"}>fantasy</Link></li>
                <li><Link className="dropdown-item" to={"/category/action-rpg"}>action-rpg</Link></li>
                <li><Link className="dropdown-item" to={"/category/action"}>action</Link></li>
                <li><Link className="dropdown-item" to={"/category/flight"}>flight</Link></li>
                <li><Link className="dropdown-item" to={"/category/battle-royale"}>battle-royale</Link></li>
              </ul>

            </li>
          </ul> : ""}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
            {userData ? <>

              <li className="nav-item">
                <span className='nav-link text-white'> <button onClick={LogOut} className='btn btn-outline-info'>LogOut</button></span>
              </li> </> : <>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link text-white pt-3 " : "nav-link text-white-50 pt-3 "} aria-current="page" to="login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link text-white " : "nav-link text-white-50 "} to="createAccount"><button className='btn btn-outline-info'>Join Free</button></NavLink>
              </li>
            </>}



          </ul>
        </div>
      </div>
    </nav>
  )
}
