import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import $ from 'jquery'

export default function Home() {

  let [productList, setproductList] = useState([])

  useEffect(() => {
    getSortedGames()
  }, [])

  async function getSortedGames() {


    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity`, options)
    let firstThreeData = data.slice(0, 3);
    setproductList(firstThreeData)
    $(".loading").fadeOut(1500)
  }



  return (
    <>
      <div className='loading position-fixed top-0 bottom-0 start-0 end-0'>

        <div className="loader">Loading...</div>
      </div>
      < div className='mt-5 d-flex justify-content-center align-items-center' >

        <div className='coverPage w-100 h-25 pt-3 px-0 text-center shadow-lg'>
          <div className=' p-md-0 p-3 py-md-5 h-25 bg-black bg-opacity-25 '>
            <p className='fs-1 fw-semibold text-center text-white-50 mb-0'>Find & track the best <span className='text-blue'>free-to-play</span> games!</p>
            <p className='text-secondary  fw-lighter text-center fs-5'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
            <Link to={"/all"}><button className='btn btn-outline-secondary'>Browse Games</button></Link>
          </div>
        </div>
      </div >
      <div className='container mt-5 pb-5'>
        <p className='fs-2 mb-5 fw-semibold text-white-50'><i class="fa-solid fa-robot"></i> Personalized Recommendations</p>
        <div className="row">
          {productList.map((product) => {
            let str = product.title.split(/(?!$)/u).slice(0, 30).join("")
            return <div className=" col-xl-4 col-lg-4 col-md-6">
              <div id={product.id} className="card bg-gray h-100 pointer">
                <Link to={"/productDetails/" + product.id} className=' text-decoration-none text-dark '>
                  <img src={product.thumbnail} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <div className='d-flex justify-content-between align-items-center'>
                      <h5 className="card-title fs-4 text-white-50 ">{str + `${product.title.length == str.length ? "" : "..."}`}</h5>
                      <p className='border border-0 rounded-3 px-2 py-1 bg-blue text-white fs-7 fw-bolder mb-1 ms-1'>FREE</p>
                    </div>
                  </div>
                </Link>
              </div>

            </div>

          })}
        </div>


      </div>
    </>

  )
}
