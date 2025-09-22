import PropTypes from "prop-types";


const ProductImageFixed = ({ product, selectedColor }) => {
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
  
  return (
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

      <div className="product-fixed-image">
        {displayImages.length > 0 ? (
          <img
            src={displayImages[0]}
            alt=""
            className="img-fluid"
            onError={(e) => {
              e.target.src = '/assets/img/product/default-product.jpg';
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.shape({}),
  selectedColor: PropTypes.string
};

export default ProductImageFixed;
