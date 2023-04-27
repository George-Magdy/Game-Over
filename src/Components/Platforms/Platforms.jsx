import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import $ from 'jquery'

export default function Platforms() {

  let { x } = useParams()

  let [productList, setproductList] = useState([])

  useEffect(() => {
     getGamesByPlatform()
  }, [x])

  async function  getGamesByPlatform() {


    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${x}`, options)
    setproductList(data)
    $(".loading").fadeOut(1500)
  }
  
  return (
    <>
      <div className='loading position-fixed top-0 bottom-0 start-0 end-0'>

    <div className="loader">Loading...</div>
      </div>

    
    <div className=' container mt-5 pt-5 pb-3'>
      <div className="row g-3">

        {productList.map((product) => {
          let str = product.title.split(/(?!$)/u).slice(0, 15).join("")
          return <div className=" col-xl-3 col-lg-4 col-md-6">
            <div id={product.id} className="card bg-gray h-100 pointer">
              <Link to={"/productDetails/" + product.id} className=' text-decoration-none text-dark '>
                <img src={product.thumbnail} className="card-img-top" alt="..." />
                <div className="card-body">
                  <div className='d-flex justify-content-between align-items-center'>
                    <h5 className="card-title text-white-50 ">{str + `${product.title.length == str.length ? "" : "..."}`}</h5>
                    <p className='border border-0 rounded-3 px-2 py-1 bg-blue text-white fs-7 fw-bolder mb-1 ms-1'>FREE</p>
                  </div>
                  <p className="card-text text-white-50">{product.short_description.split(/(?!$)/u).slice(0, 25).join("") + "..."}</p>
                  <div className='d-flex justify-content-between align-items-center position-relative bottom-0'>
                    <i className="fa-solid fa-plus border border-0 p-1 bg-white bg-opacity-50 fs-8 fw-bolder"></i>
                    <div className='d-flex justify-content-center align-items-center'>
                      <p className='border border-0 rounded-pill px-2 bg-white bg-opacity-50 fs-7 fw-bolder mb-0 me-1'>{product.genre}</p>
                      {product.platform == "PC (Windows)" ? <i className="fa-brands fa-windows text-white-50"></i> : <i className="fa-solid fa-window-maximize text-white-50"></i>}
                    </div>
                  </div>
                </div>
              </Link>
            </div>

          </div>

        })}

      </div>



    </div >
    </>
  )
}
