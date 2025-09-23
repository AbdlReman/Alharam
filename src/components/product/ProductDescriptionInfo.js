import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
  onColorChange,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [selectedProductColor, setSelectedProductColor] = useState("");
  const [selectedProductSize, setSelectedProductSize] = useState("");
  const [selectedProductModel, setSelectedProductModel] = useState("");
  const [productStock, setProductStock] = useState(0);
  const [quantityCount, setQuantityCount] = useState(1);
  
  // Use useEffect to set initial values when product changes
  useEffect(() => {
    if (product) {
      if (product.variation && product.variation[0]) {
        setSelectedProductColor(product.variation[0].color || "");
      }
      
      if (product.variation && product.variation[0] && product.variation[0].size && product.variation[0].size[0]) {
        setSelectedProductSize(product.variation[0].size[0].name || "");
      }
      
      // Set initial model if available
      if (product.model && product.model.length > 0) {
        setSelectedProductModel(product.model[0] || "");
      }
      
      const stock = product.variation && product.variation[0] && product.variation[0].size && product.variation[0].size[0] 
        ? product.variation[0].size[0].stock 
        : product.stock || 0;
      setProductStock(stock);
    }
  }, [product]);
  
  // Add null check after all hooks
  if (!product) {
    return (
      <div className="product-details-content ml-70">
        <p>Product not found</p>
      </div>
    );
  }

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize,
    selectedProductModel
  );

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: quantityCount,
      selectedProductColor: selectedProductColor ? selectedProductColor : product.selectedProductColor ? product.selectedProductColor : null,
      selectedProductSize: selectedProductSize ? selectedProductSize : product.selectedProductSize ? product.selectedProductSize : null,
      selectedProductModel: selectedProductModel ? selectedProductModel : product.selectedProductModel ? product.selectedProductModel : null
    }));
  };

  const handleBuyNow = () => {
    // First add the product to cart (without showing toast)
    dispatch(addToCart({
      ...product,
      quantity: quantityCount,
      selectedProductColor: selectedProductColor ? selectedProductColor : product.selectedProductColor ? product.selectedProductColor : null,
      selectedProductSize: selectedProductSize ? selectedProductSize : product.selectedProductSize ? product.selectedProductSize : null,
      selectedProductModel: selectedProductModel ? selectedProductModel : product.selectedProductModel ? product.selectedProductModel : null,
      suppressToast: true
    }));
    
    // Then navigate to checkout
    navigate("/checkout");
  };

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
                  <div className="product-details-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>{"Rs " + finalDiscountedPrice}</span>{" "}
                  <span className="old">
                    {"Rs " + finalProductPrice}
                  </span>
                </Fragment>
              ) : (
                <span>{"Rs " + finalProductPrice} </span>
              )}
            </div>
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-list">
        <p>{product.shortDescription}</p>
      </div>

      {/* Display models if available */}
      {product.model && product.model.length > 0 && (
        <div className="pro-details-size-color">
          <div className="pro-details-model-wrap">
            <span>Model</span>
            <div className="pro-details-model-content-boxes">
              {product.model.map((model, key) => {
                return (
                  <label
                    className={`pro-details-model-box ${model === selectedProductModel ? 'selected' : ''}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={model}
                      name="product-model"
                      checked={
                        model === selectedProductModel
                          ? "checked"
                          : ""
                      }
                      onChange={() => {
                        setSelectedProductModel(model);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="model-box-text">{model}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Display colors if available */}
      {product.color && product.color.length > 0 && (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content-boxes">
              {product.color.map((color, key) => {
                return (
                  <label
                    className={`pro-details-color-box ${color === selectedProductColor ? 'selected' : ''}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={color}
                      name="product-color"
                      checked={
                        color === selectedProductColor ? "checked" : ""
                      }
                      onChange={() => {
                        console.log('Color selected:', color);
                        setSelectedProductColor(color);
                        setQuantityCount(1);
                        // Notify parent component about color change
                        if (onColorChange) {
                          console.log('Calling onColorChange with:', color);
                          onColorChange(color);
                        }
                      }}
                    />
                    <span className="color-box-text">{color}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Display sizes if available */}
      {product.size && product.size.length > 0 && (
        <div className="pro-details-size-color">
          <div className="pro-details-size-wrap">
            <span>Size</span>
            <div className="pro-details-size-content-boxes">
              {product.size.map((size, key) => {
                return (
                  <label
                    className={`pro-details-size-box ${size === selectedProductSize ? 'selected' : ''}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={size}
                      name="product-size"
                      checked={
                        size === selectedProductSize
                          ? "checked"
                          : ""
                      }
                      onChange={() => {
                        setSelectedProductSize(size);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="size-box-text">{size}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Display categories if available */}
      {product.category && product.category.length > 0 && (
        <div className="pro-details-categories">
          <span>Categories: </span>
          {product.category.map((cat, index) => (
            <Link key={index} to={`/shop?category=${cat}`}>
              {cat}{index < product.category.length - 1 ? ', ' : ''}
            </Link>
          ))}
        </div>
      )}

      {/* Display tags if available */}
      {product.tag && product.tag.length > 0 && (
        <div className="pro-details-tags">
          <span>Tags: </span>
          {product.tag.map((tag, index) => (
            <Link key={index} to={`/shop?tag=${tag}`}>
              {tag}{index < product.tag.length - 1 ? ', ' : ''}
            </Link>
          ))}
        </div>
      )}

      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < productStock - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {productStock && productStock > 0 ? (
              <button
                onClick={handleAddToCart}
                disabled={productCartQty >= productStock}
              >
                {" "}
                Add To Cart{" "}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
          <div className="pro-details-buy-now btn-hover">
            {productStock && productStock > 0 ? (
              <button
                onClick={handleBuyNow}
                disabled={productCartQty >= productStock}
                className="buy-now-btn"
              >
                {" "}
                Buy Now{" "}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
          <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => dispatch(addToWishlist(product))}
            >
              <i className="fa fa-heart-o" />
            </button>
          </div>
          <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => dispatch(addToCompare(product))}
            >
              <i className="fa fa-retweet" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
  onColorChange: PropTypes.func,
};

export default ProductDescriptionInfo;
