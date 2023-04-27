import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import $ from 'jquery'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import HoverVideoPlayer from 'react-hover-video-player';

export default function ProductDetails() {
  let { id } = useParams()

  let [productDetails, setproductDetails] = useState([])
  let [getimages, setimages] = useState(null)

  useEffect(() => {
    getDetails()
  },[])

  async function getDetails() {


    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    let { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
    setproductDetails(data)
    console.log(data);
    setimages(data.screenshots)
    $(".loading").fadeOut(1500)
  }
  return (

    <>

      <div className='loading position-fixed top-0 bottom-0 start-0 end-0'>

        <div className="loader">Loading...</div>
      </div>
      <div className=' container mt-5 pt-5'>
        <div className="row">
          <div className="col-md-4">
            <div>

              <HoverVideoPlayer
                videoSrc={`https://www.freetogame.com/g/${id}/videoplayback.webm`}
                pausedOverlay={
                  <img 
                    src={productDetails.thumbnail}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                }
                loadingOverlay={
                  <div className="loading-overlay">
                    <div className="loading-spinner" />
                  </div>
                }
              />

            </div>
            <div className='row justify-content-between'>
              <div className="col-md-3">
                <p className='border border-0 rounded-3 py-2 bg-gray text-white-50 mt-3 text-center '>FREE</p>
              </div>
              <div className="col-md-9">
                <a href={productDetails.game_url} target="_blank" ><button className='w-100 border border-0 rounded-3 py-2 bg-blue text-white fw-bolder mt-3 text-center'>PLAY NOW <i className="fa-solid fa-right-from-bracket"></i></button></a>
              </div>
            </div>
          </div>
          <div className="col-md-8 text-white-50">
            <h2 className='fs-1 mt-md-1 mt-5 ' >{productDetails.title}</h2>
            <p className='fs-5 fw-bolder mb-1'>About : {productDetails.title}</p>
            <p className='fs-5 p-md-1 p-3'>{productDetails.description}</p>
            <div>
              <p className='fs-5 fw-bold '>Minimum System Requirements</p>
              {productDetails?.minimum_system_requirements?.graphics ? <p><span className='fw-bold'>graphics</span> : {productDetails?.minimum_system_requirements?.graphics}</p> : ""}
              {productDetails?.minimum_system_requirements?.memory ? <p><span className='fw-bold'>memory</span> : {productDetails?.minimum_system_requirements?.memory}</p> : ""}
              {productDetails?.minimum_system_requirements?.os ? <p><span className='fw-bold'>os</span> : {productDetails?.minimum_system_requirements?.os}</p> : ""}
              {productDetails?.minimum_system_requirements?.processor ? <p><span className='fw-bold'>processor</span> : {productDetails?.minimum_system_requirements?.processor}</p> : ""}
              {productDetails?.minimum_system_requirements?.storage ? <p><span className='fw-bold'>storage</span> : {productDetails?.minimum_system_requirements?.storage}</p> : ""}
            </div>
            <div>
              <p className='fs-4 fw-bold'> {productDetails.title} Screenshots</p>
              {getimages ? <OwlCarousel className='owl-theme' loop items={1} dots={false} autoplay autoplayTimeout={2000} >
                {getimages.map((images) => {
                  return <div id={images.id} class='item'>
                    <img src={images.image} alt="" />
                  </div>
                })}
              </OwlCarousel> : ""}


            </div>
            <div className='mb-3'>
              <p className='fs-2 fw-bold mt-3'>Additional Information</p>
              <div className="row">
                <div className="col-md-4">
                  <div>
                    <p className='m-0'>Title</p>
                    <p className='text-white fw-bold '>{productDetails.title}</p>
                  </div>
                  <div>
                    <p className='m-0'>Release Date</p>
                    <p className='text-white fw-bold '>{productDetails.release_date}</p>
                  </div>


                </div>
                <div className="col-md-4">
                  <div>
                    <p className='m-0'>Developer</p>
                    <p className='text-white fw-bold '>{productDetails.developer}</p>
                  </div>
                  <div>
                    <p className='m-0'>Genre</p>
                    <p className='text-white fw-bold '>{productDetails.genre}</p>
                  </div>

                </div>
                <div className="col-md-4">
                  <div>
                    <p className='m-0'>Publisher</p>
                    <p className='text-white fw-bold '>{productDetails.publisher}</p>
                  </div>
                  <div>
                    <p className='m-0'>Platform</p>
                    <p className='text-white fw-bold '>{productDetails.platform === "Windows" ? <i className="fa-brands fa-windows text-white-50"></i> : <i className="fa-solid fa-window-maximize text-white-50"></i>} {productDetails.platform}</p>
                  </div>

                </div>
              </div>
            </div>


          </div>
        </div>

      </div>
    </>
  )
}
