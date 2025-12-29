import React, { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { EffectFade } from 'swiper';
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";

const ProductImageGallery = ({ product, selectedColor }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const mainSwiperRef = useRef(null);
  
  // Get all images with metadata
  const getAllImages = () => {
    // Check if product.images is an array of objects with metadata
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      // Check if first item is an object (new format with metadata)
      if (typeof product.images[0] === 'object' && product.images[0].url) {
        return product.images;
      }
      // Old format: array of URLs - convert to objects
      return product.images.map(url => ({ url, title: '', description: '' }));
    }
    // Fallback to product.image (single URL or array)
    if (product?.image) {
      const imageArray = Array.isArray(product.image) ? product.image : [product.image];
      return imageArray.map(url => ({ url, title: '', description: '' }));
    }
    return [{ url: '/assets/img/product/default-product.jpg', title: '', description: '' }];
  };
  
  const allImages = getAllImages();
  const allImageUrls = allImages.map(img => img.url);
  
  // Handle thumbnail click - navigate main gallery to the clicked image
  const handleThumbnailClick = (clickedIndex) => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(clickedIndex);
    }
  };
  
  // Navigate to matching image when color changes
  useEffect(() => {
    if (mainSwiperRef.current && selectedColor && allImages.length > 0) {
      const matchingIndex = allImages.findIndex(img => {
        const titleMatch = img.title && img.title.trim().toLowerCase() === selectedColor.trim().toLowerCase();
        const descMatch = img.description && img.description.trim().toLowerCase() === selectedColor.trim().toLowerCase();
        return titleMatch || descMatch;
      });
      
      if (matchingIndex >= 0) {
        mainSwiperRef.current.slideTo(matchingIndex);
      }
    }
  }, [selectedColor, allImages]);
  
  const slides = allImageUrls.map((img, i) => ({
      src: img,
      key: i,
  }));

  // swiper slider settings
  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: allImageUrls.length > 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    onSwiper: (swiper) => {
      mainSwiperRef.current = swiper;
    },
    modules: [EffectFade],
  };

  const thumbnailSwiperParams = {
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: false,
    slideToClickedSlide: true,
    breakpoints: {
      320: {
        slidesPerView: 3,
      },
      640: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 5,
      },
    }
  };

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {product.discount || product.new ? (
          <div className="product-img-badges">
            {product.discount ? (
              <span className="brand-color">-{product.discount}%</span>
            ) : (
              ""
            )}
            {product.new ? <span className="purple">New</span> : ""}
          </div>
        ) : (
          ""
        )}
        <Swiper options={gallerySwiperParams}>
          {allImageUrls.map((single, key) => (
            <SwiperSlide key={key}>
              <button className="lightgallery-button" onClick={() => setIndex(key)}>
                <i className="pe-7s-expand1"></i>
              </button>
              <div className="single-image">
                <img
                  src={single}
                  className="img-fluid"
                  alt={product.name || ""}
                  onError={(e) => {
                    e.target.src = '/assets/img/product/default-product.jpg';
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
          <AnotherLightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={slides}
              plugins={[Thumbnails, Zoom, Fullscreen]}
          />
        </Swiper>
      </div>
      <div className="product-small-image-wrapper mt-15">
        <Swiper options={thumbnailSwiperParams}>
          {allImageUrls.map((single, key) => {
            // Check if this image matches the selected color
            const imageMatchesColor = selectedColor ? (() => {
              const img = allImages[key];
              const titleMatch = img.title && img.title.trim().toLowerCase() === selectedColor.trim().toLowerCase();
              const descMatch = img.description && img.description.trim().toLowerCase() === selectedColor.trim().toLowerCase();
              return titleMatch || descMatch;
            })() : false;
            
            return (
              <SwiperSlide key={key}>
                <div 
                  className={`single-image ${imageMatchesColor ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(key)}
                  style={{ 
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={single}
                    className="img-fluid"
                    alt={product.name || ""}
                    onError={(e) => {
                      e.target.src = '/assets/img/product/default-product.jpg';
                    }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.shape({}),
  selectedColor: PropTypes.string,
};

export default ProductImageGallery;
