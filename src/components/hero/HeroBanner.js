
  import React from "react";
  import PropTypes from "prop-types";
  import clsx from "clsx";
  import SwiperSlider, { SwiperSlide } from "../swiper";
  
  const HeroBanner = ({ spaceBottomClass, spaceTopClass, className }) => {
    // Desktop banner images from the public folder
    const desktopBannerImages = [
      "/assets/img/banner/banner1.jpeg",
      "/assets/img/banner/banner2.jpeg",
      "/assets/img/banner/banner3.jpeg",
      "/assets/img/banner/banner4.jpeg",
    ];
    
    // Mobile banner images from the public folder
    const mobileBannerImages = [
      "/assets/img/banner/mobile-banner1.png",
      "/assets/img/banner/mobile-banner2.jpeg",
      "/assets/img/banner/mobile-banner3.jpeg",
      "/assets/img/banner/mobile-banner4.jpeg",
    ];
  
    // Swiper options for the banner slider
    const swiperOptions = {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: false,
      pagination: {
        clickable: true,
        el: '.swiper-pagination',
        dynamicBullets: false,
      },
      slidesPerView: 1,
      spaceBetween: 0,
    };
  
    return (
      <>
        <style jsx>{`
          .banner-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
            margin: 0;
            padding: 0;
          }
          
          .desktop-banner-slider {
            display: block;
          }
          
          .mobile-banner-slider {
            display: none;
          }
          
          @media (max-width: 768px) {
            .desktop-banner-slider {
              display: none !important;
            }
            
            .mobile-banner-slider {
              display: block !important;
            }
            
            .banner-image {
              object-fit: contain !important;
              width: 100% !important;
              height: auto !important;
              max-height: 100vh !important;
              object-position: center top !important;
              display: block !important;
            }
            
            .single-banner-slide {
              position: relative;
              height: auto !important;
              display: block !important;
              background-color: #000 !important;
            }
            
            .banner-slider-area {
              height: auto !important;
            }
            
            /* Position pagination dots at bottom center of image */
            :global(.swiper-pagination) {
              position: absolute !important;
              bottom: 20px !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              width: auto !important;
              z-index: 10 !important;
            }
            
            :global(.swiper-pagination-bullet) {
              background: rgba(255, 255, 255, 0.5) !important;
              opacity: 1 !important;
            }
            
            :global(.swiper-pagination-bullet-active) {
              background: #007bff !important;
            }
          }
          
          @media (max-width: 480px) {
            .banner-slider-area {
              height: auto !important;
            }
            
            .single-banner-slide {
              height: auto !important;
            }
            
            .banner-image {
              object-fit: contain !important;
              object-position: center top !important;
              height: auto !important;
              max-height: 80vh !important;
            }
            
            /* Ensure pagination is visible on small screens */
            :global(.swiper-pagination) {
              bottom: 15px !important;
            }
          }
        `}</style>
        <div className={clsx("banner-slider-area", spaceTopClass, spaceBottomClass, className)} 
             style={{ 
               overflow: 'hidden',
               margin: 0,
               padding: 0
             }}>
        <div className="container-fluid" style={{ 
          padding: 0, 
          margin: 0,
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          {/* Desktop Banner Slider */}
          <div className="desktop-banner-slider">
            <SwiperSlider options={swiperOptions} navClass="banner-slider-nav">
              {desktopBannerImages.map((image, index) => (
                <SwiperSlide key={`desktop-${index}`}>
                  <div className="single-banner-slide" style={{ 
                    width: '100%',
                    margin: 0,
                    padding: 0,
                    position: 'relative'
                  }}>
                    <img 
                      src={process.env.PUBLIC_URL + image} 
                      alt={`Banner ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        margin: 0,
                        padding: 0
                      }}
                      className="banner-image"
                    />
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-pagination"></div>
            </SwiperSlider>
          </div>
          
          {/* Mobile Banner Slider */}
          <div className="mobile-banner-slider">
            <SwiperSlider options={swiperOptions} navClass="banner-slider-nav">
              {mobileBannerImages.map((image, index) => (
                <SwiperSlide key={`mobile-${index}`}>
                  <div className="single-banner-slide" style={{ 
                  
                    margin: 0,
                    padding: 0,
                    position: 'relative'
                  }}>
                    <img 
                      src={process.env.PUBLIC_URL + image} 
                      alt={`Mobile Banner ${index + 1}`}
                     
                      className="banner-image"
                    />
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-pagination"></div>
            </SwiperSlider>
          </div>
        </div>
      </div>
      </>
    );
  };
  
  HeroBanner.propTypes = {
    spaceBottomClass: PropTypes.string,
    spaceTopClass: PropTypes.string,
    className: PropTypes.string,
  };
  
  export default HeroBanner;
  