import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from 'swiper';
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";

const ProductImageGallery = ({ product, selectedColor }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Function to filter images based on selected color
  const filterImagesByColor = (images, color, product) => {
    if (!color || !images || images.length === 0) {
      return images;
    }
    
    // First, try to use colorImages mapping if available
    if (product?.colorImages && product.colorImages[color]) {
      return product.colorImages[color];
    }
    
    // Filter images based on title, filename, or URL containing the color name
    const filteredImages = images.filter(image => {
      if (!image) return false;
      
      const colorName = color.toLowerCase();
      
      // If image is an object with title/filename
      if (typeof image === 'object') {
        const title = (image.title || '').toLowerCase();
        const filename = (image.filename || '').toLowerCase();
        const url = (image.url || '').toLowerCase();
        
        return title.includes(colorName) || 
               filename.includes(colorName) || 
               url.includes(colorName);
      }
      
      // If image is just a URL string
      if (typeof image === 'string') {
        const filename = image.split('/').pop().toLowerCase();
        return filename.includes(colorName) || image.toLowerCase().includes(colorName);
      }
      
      return false;
    });
    
    // If no matching images found, return all images
    return filteredImages.length > 0 ? filteredImages : images;
  };
  
  // Handle images from Contentful - ensure we have at least one image
  const productImages = product?.images || (product?.image ? [product.image] : []);
  const filteredImages = filterImagesByColor(productImages, selectedColor, product);
  
  // Convert all images to URL strings for thumbnails (show all images)
  const allImageUrls = productImages.length > 0 
    ? productImages.map(img => typeof img === 'object' ? img.url : img)
    : ['/assets/img/product/default-product.jpg'];
  
  // Convert filtered images to URL strings for main gallery (filtered by color)
  const displayImages = filteredImages.length > 0 
    ? filteredImages.map(img => typeof img === 'object' ? img.url : img)
    : ['/assets/img/product/default-product.jpg'];
  
  // Get the currently displayed image based on selectedImageIndex from filtered images
  const currentDisplayImage = displayImages[selectedImageIndex] || displayImages[0];
  
  // Reset selectedImageIndex when color changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedColor]);
  
  // Function to handle thumbnail click and find corresponding image in filtered set
  const handleThumbnailClick = (thumbnailIndex) => {
    const clickedImageUrl = allImageUrls[thumbnailIndex];
    const filteredIndex = displayImages.findIndex(url => url === clickedImageUrl);
    
    if (filteredIndex >= 0) {
      setSelectedImageIndex(filteredIndex);
    } else {
      // If clicked image is not in filtered set, reset to first image
      setSelectedImageIndex(0);
    }
  };
  
  // Debug logging
  console.log('ProductImageGallery - selectedColor:', selectedColor);
  console.log('ProductImageGallery - productImages:', productImages);
  console.log('ProductImageGallery - filteredImages:', filteredImages);
  console.log('ProductImageGallery - displayImages (main gallery):', displayImages);
  console.log('ProductImageGallery - allImageUrls (thumbnails):', allImageUrls);
  console.log('ProductImageGallery - selectedImageIndex:', selectedImageIndex);
  console.log('ProductImageGallery - currentDisplayImage:', currentDisplayImage);
  
  const slides = displayImages.map((img, i) => ({
      src: img,
      key: i,
  }));

  // swiper slider settings
  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: false,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    initialSlide: selectedImageIndex,
    onSlideChange: (swiper) => {
      setSelectedImageIndex(swiper.activeIndex);
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
    navigation: true
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
          {displayImages.map((single, key) => (
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
          {allImageUrls.map((single, key) => (
            <SwiperSlide key={key}>
              <div 
                className={`single-image ${allImageUrls[key] === currentDisplayImage ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(key)}
                style={{ cursor: 'pointer' }}
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
          ))}
        </Swiper>
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.shape({}),
  selectedColor: PropTypes.string
};

export default ProductImageGallery;
