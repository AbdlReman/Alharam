import PropTypes from "prop-types";


const ProductImageFixed = ({ product, selectedColor }) => {
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
  const mainImage = displayImages.length > 0 ? displayImages[0] : (product?.image ? (Array.isArray(product.image) ? product.image[0] : product.image) : null);
  
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
        {mainImage ? (
          <img
            src={mainImage.startsWith('http') ? mainImage : (process.env.PUBLIC_URL + mainImage)}
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
  selectedColor: PropTypes.string,
};

export default ProductImageFixed;
