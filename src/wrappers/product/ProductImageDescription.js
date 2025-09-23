import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useState } from "react";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductImageFixed from "../../components/product/ProductImageFixed";

const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, galleryType, product }) => {
  const currency = useSelector((state) => state.currency);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const { cartItems } = useSelector((state) => state.cart);
  
  // State to manage selected color for image switching
  const [selectedColor, setSelectedColor] = useState("");
  
  // Add null check for product
  if (!product) {
    return (
      <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>Product not found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const wishlistItem = wishlistItems.find(item => item.id === product.id);
  const compareItem = compareItems.find(item => item.id === product.id);

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = Math.round(product.price * currency.currencyRate);
  const finalDiscountedPrice = Math.round(
    discountedPrice * currency.currencyRate
  );

  // Handle color change from ProductDescriptionInfo
  const handleColorChange = (color) => {
    console.log('Color changed to:', color);
    setSelectedColor(color);
  };

  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            {galleryType === "leftThumb" ? (
              <ProductImageGallerySideThumb
                product={product}
                thumbPosition="left"
                selectedColor={selectedColor}
              />
            ) : galleryType === "rightThumb" ? (
              <ProductImageGallerySideThumb 
                product={product} 
                selectedColor={selectedColor}
              />
            ) : galleryType === "fixedImage" ? (
              <ProductImageFixed 
                product={product} 
                selectedColor={selectedColor}
              />
            ) : (
              <ProductImageGallery 
                product={product} 
                selectedColor={selectedColor}
              />
            )}
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              onColorChange={handleColorChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  galleryType: PropTypes.string,
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductImageDescription;
