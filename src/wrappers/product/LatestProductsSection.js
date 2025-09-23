import PropTypes from "prop-types";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import client from "../../data/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cart-slice";
// import { addToWishlist } from "../../store/slices/wishlist-slice";

const LatestProductsSection = ({ spaceBottomClass, spaceTopClass }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // Using only currency from store in this component

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        // Fetch latest products ordered by creation date
        const entries = await client.getEntries({ 
          content_type: "product",
          order: "-sys.createdAt", // Order by creation date descending (newest first)
          limit: 4
        });
        
        const items = entries.items.map((item) => {
          const fields = item.fields;
          return {
            id: item.sys.id,
            name: fields.name,
            slug: fields.slug,
            price: parseFloat(fields.price) || 0,
            discount: parseFloat(fields.discount) || 0,
            shortDescription: fields.shortDescription,
            fullDescription: fields.fullDescription ? documentToHtmlString(fields.fullDescription) : "",
            category: fields.category || [],
            tag: fields.tag || [],
            images: fields.images?.map((img) => img.fields.file.url) || [],
            color: fields.color || [],
            size: fields.size || [],
            metaTitle: fields.metaTitle || "",
            metaDescription: fields.metaDescription || "",
            stock: fields.stock || 0,
            // For backward compatibility
            image: fields.images?.[0]?.fields?.file?.url,
            title: fields.name,
            description: fields.shortDescription,
            // Add variation structure if colors/sizes exist
            variation: fields.color && fields.color.length > 0 ? 
              fields.color.map(color => ({
                color: color,
                size: fields.size ? fields.size.map(size => ({
                  name: size,
                  stock: fields.stock || 0
                })) : []
              })) : null
          };
        });
        setProducts(items);
      } catch (error) {
        console.error("Failed to fetch latest products from Contentful", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

  if (loading) {
    return (
      <div className={clsx("product-area", spaceBottomClass)}>
        <div className="container">
          <div className="text-center py-5">
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("product-area", spaceTopClass, spaceBottomClass)} style={{ 
      padding: "100px 0",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
         pointerEvents: "none"
      }}></div>
      
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-5" style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{
            fontSize: "4rem",
            fontWeight: "600",
            color: "black",
            marginBottom: "1rem",
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            letterSpacing: "-0.02em"
          }}>
            Latest Products
          </h2>
          <p style={{
            fontSize: "1.4rem",
          
            fontWeight: "300"
          }}>
            Discover Our Premium Collection
          </p>
        </div>

        <div className="row align-items-center" style={{ position: "relative", zIndex: 2 }}>
          {/* Left side - Banner (hidden on mobile, shown on desktop) */}
          <div className="col-lg-7 col-md-12 mb-5 mb-lg-0 d-none d-lg-block">
            <div 
              style={{
                backgroundImage: "url('/assets/img/banner/latestProduct.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "600px",
                borderRadius: "25px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 30px 80px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)";
              }}
              onClick={() => window.location.href = process.env.PUBLIC_URL + "/shop"}
            >
              {/* Overlay */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)"
              }}></div>
            </div>
          </div>

          {/* Right side - 4 Products in 2x2 Grid */}
          <div className="col-lg-5 col-md-12">
            <div className="row g-4">
              {products.map((product, index) => {
                const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];
                const color = colors[index] || "#667eea";
                
                return (
                  <div className="col-6" key={product.id}>
                    <div 
                      style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "20px",
                        padding: "20px",
                        height: "280px",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-15px) scale(1.05)";
                        e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.2)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
                      }}
                    >
                      {/* Product Image */}
                      <div style={{ 
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "15px"
                      }}>
                        <Link to={`/product/${product.slug}`} style={{ textDecoration: "none" }}>
                          <img
                            src={product.image || '/assets/img/product/default-product.jpg'}
                            alt={product.name}
                            style={{
                              width: "100%",
                              height: "auto",
                              maxHeight: "170px",
                              objectFit: "contain",
                              filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.1))"
                            }}
                          />
                        </Link>
                      </div>
                      
                      {/* Product Info */}
                      <div>
                        <Link to={`/product/${product.slug}`} style={{ textDecoration: "none", color: "#333" }}>
                          <h6 style={{ 
                            fontSize: "14px", 
                            fontWeight: "700", 
                            marginBottom: "8px",
                            lineHeight: "1.3",
                            height: "35px",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical"
                          }}>
                            {product.name}
                          </h6>
                        </Link>
                        
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}>
                          <span style={{ 
                            fontSize: "18px", 
                            fontWeight: "800", 
                            color: color
                          }}>
                            Rs {Math.round(product.price)}
                          </span>
                          
                          <button
                            onClick={() => dispatch(addToCart(product))}
                            style={{
                              background: color,
                              color: "white",
                              border: "none",
                              borderRadius: "25px",
                              padding: "8px 16px",
                              fontSize: "12px",
                              fontWeight: "600",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px"
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = "scale(1.1)";
                              e.target.style.boxShadow = `0 5px 15px ${color}60`;
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = "scale(1)";
                              e.target.style.boxShadow = "none";
                            }}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Banner - shown only on mobile devices */}
        <div className="row d-lg-none mt-5" style={{ position: "relative", zIndex: 2 }}>
          <div className="col-12">
            <div 
              style={{
                backgroundImage: "url('/assets/img/banner/latestProduct.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
                borderRadius: "20px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px) scale(1.01)";
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.2)";
              }}
              onClick={() => window.location.href = process.env.PUBLIC_URL + "/shop"}
            >
              {/* Overlay */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)"
              }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LatestProductsSection.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default LatestProductsSection;
