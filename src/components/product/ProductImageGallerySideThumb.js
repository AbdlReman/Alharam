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
  
  // Filter images based on selected color
  const getFilteredImages = () => {
    // Check if product.images is an array of objects with metadata
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      // Check if first item is an object (new format with metadata)
      if (typeof product.images[0] === 'object' && product.images[0].url) {
        // Filter images based on color matching title or description
        if (selectedColor) {
          const filtered = product.images.filter(img => {
            const titleMatch = img.title && img.title.trim().toLowerCase() === selectedColor.trim().toLowerCase();
            const descMatch = img.description && img.description.trim().toLowerCase() === selectedColor.trim().toLowerCase();
            return titleMatch || descMatch;
          });
          // If we found matching images, return them; otherwise return all images
          return filtered.length > 0 ? filtered.map(img => img.url) : product.images.map(img => img.url);
        }
        // No color selected, return all images
        return product.images.map(img => img.url);
      }
      // Old format: array of URLs
      return product.images;
    }
    // Fallback to product.image (single URL or array)
    if (product?.image) {
      return Array.isArray(product.image) ? product.image : [product.image];
    }
    return [];
  };
  
  const displayImages = getFilteredImages();
  const slides = displayImages.map((img, i) => ({
      src: img.startsWith('http') ? img : (process.env.PUBLIC_URL + img),
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
                        src={single.startsWith('http') ? single : (process.env.PUBLIC_URL + single)}
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
                        src={single.startsWith('http') ? single : (process.env.PUBLIC_URL + single)}
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
  selectedColor: PropTypes.string,
};

export default ProductImageGalleryLeftThumb;
