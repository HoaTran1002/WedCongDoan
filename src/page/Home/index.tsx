import React from 'react'
import Layout from '~/components/layout/Layout'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '~/assets/img/bg_home_page.jpg'
import image2 from '~/assets/img/bg_home_page_1.jpg'
import image3 from '~/assets/img/bg_home_page_2.png'
import image4 from '~/assets/img/bg_home_page_3.jpg'
const Home = (): JSX.Element => {
  return (
    <>
      <Layout>
        <div className="carousel-wrapper">
          <Carousel 
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            showThumbs={false}
            stopOnHover={false}
            interval={2000}
          >
            <div className='carousel-items-banner'>
              <img src={image1} alt="Image 1" />
            </div>
            <div className='carousel-items-banner'>
              <img src={image2} alt="Image 2" />
            </div>
            <div className='carousel-items-banner'>
              <img src={image3} alt="Image 3" />
            </div>
            <div className='carousel-items-banner'>
              <img src={image4} alt="Image 3" />
            </div>
          </Carousel>
        </div>
      </Layout>
    </>
  )
}

export default Home
