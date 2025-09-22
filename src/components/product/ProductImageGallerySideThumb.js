import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade, Thumbs } from 'swiper';
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";

const ProductImageGalleryLeftThumb = ({ product, thumbPosition, selectedColor }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  
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
  // Convert filtered images to URL strings for display
  const displayImages = filteredImages.length > 0 
    ? filteredImages.map(img => typeof img === 'object' ? img.url : img)
    : ['/assets/img/product/default-product.jpg'];
  
  const slides = displayImages.map((img, i) => ({
      src: img,
      key: i,
  }));

  // swiper slider settings
  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    loop: true,
    slideToClickedSlide: true,
    direction: "vertical",
    breakpoints: {
      320: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      992: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      1200: {
        slidesPerView: 4,
        direction: "vertical"
      }
    }
  };

  return (
    <Fragment>
      <div className="row row-5 test">
        <div
          className={clsx(thumbPosition && thumbPosition === "left"
              ? "col-xl-10 order-1 order-xl-2"
              : "col-xl-10")}
        >
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
            {displayImages?.length ? (
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
                        alt=""
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
            ) : null}
          </div>
        </div>
        <div
          className={clsx(thumbPosition && thumbPosition === "left"
              ? "col-xl-2 order-2 order-xl-1"
              : "col-xl-2")}
        >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            {displayImages?.length ? (
              <Swiper options={thumbnailSwiperParams}>
                {displayImages.map((single, key) => (
                  <SwiperSlide key={key}>
                    <div className="single-image">
                      <img
                        src={single}
                        className="img-fluid"
                        alt=""
                        onError={(e) => {
                          e.target.src = '/assets/img/product/default-product.jpg';
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null }
            
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductImageGalleryLeftThumb.propTypes = {
  product: PropTypes.shape({}),
  thumbPosition: PropTypes.string,
  selectedColor: PropTypes.string
};

export default ProductImageGalleryLeftThumb;
