import React, { Fragment, useState, useEffect, Suspense, lazy } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconTwo";
import LatestProductSection from "../../wrappers/product/LatestProductSection";
import HeroBanner from "../../components/hero/HeroBanner";
import ShopProducts from "../../wrappers/product/ShopProducts";
import SectionTitle from "../../components/section-title/SectionTitle";
import ShippingReturnsFeatures from "../../components/features/ShippingReturnsFeatures";
import client from "../../data/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { hasCategory } from "../../helpers/categoryMapper";
import "../../assets/css/category-layouts.css";



// Add CSS for loading animations and simple fade effects
const simpleStyles = `
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  .product-skeleton {
    background: #f0f0f0;
    border-radius: 8px;
  }
  
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }
  
  .slide-in-left {
    animation: slideInLeft 0.6s ease-out;
  }
  
  .slide-in-right {
    animation: slideInRight 0.6s ease-out;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #03055b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .white-title h2 {
    color: white !important;
  }
  
  .white-title h2::before,
  .white-title h2::after {
    background-color: white !important;
  }
`;


const HomeFurniture = () => {
  const [mobileAccessoriesProducts, setMobileAccessoriesProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [onlyCaseProducts, setOnlyCaseProducts] = useState([]);
  const [onlyGlassProducts, setOnlyGlassProducts] = useState([]);
  const [allInOneKitProducts, setAllInOneKitProducts] = useState([]);
  const [topDiscountedProducts, setTopDiscountedProducts] = useState([]);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [loading, setLoading] = useState(false); // Changed to false to show content immediately
  const [isMobile, setIsMobile] = useState(false);
  
  // TopSlider state
  const [topSliderActiveIndex, setTopSliderActiveIndex] = useState(0);
  const topSlides = ["Free shipping all Pakistan", "Welcome to Alharam Store"];

  // TopSlider interval effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTopSliderActiveIndex((prev) => (prev + 1) % topSlides.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [topSlides.length]);

  // Custom hook for detecting screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get products based on screen size
  const getDisplayProducts = (products, desktopCount = 3, mobileCount = 2) => {
    return isMobile ? products.slice(0, mobileCount) : products.slice(0, desktopCount);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Reduced delay for faster product loading
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Fetch products
        const entries = await client.getEntries({ content_type: "product" });
        
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
            images: Array.isArray(fields.images)
              ? fields.images.filter(img => img && img.fields && img.fields.file && img.fields.file.url).map(img => img.fields.file.url)
              : [],
            color: fields.color || [],
            size: fields.size || [],
            metaTitle: fields.metaTitle || "",
            metaDescription: fields.metaDescription || "",
            stock: fields.stock || 0,
            createdAt: item.sys.createdAt,
            image: Array.isArray(fields.images)
              ? fields.images.filter(img => img && img.fields && img.fields.file && img.fields.file.url).map(img => img.fields.file.url)
              : [],
            title: fields.name,
            description: fields.shortDescription,
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

        // Filter products by category and sort by creation date (latest first)
        const mobileAccessories = items.filter(product =>
          hasCategory(product, "mobileaccessories")
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4); // Latest 4

        const electronics = items.filter(product =>
          hasCategory(product, "electronics")
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4); // Latest 4

        const onlyCase = items.filter(product =>
          hasCategory(product, "onlycase")
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4); // Latest 4

        const onlyGlass = items.filter(product =>
          hasCategory(product, "onlyglass")
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4); // Latest 4

        const allInOneKit = items.filter(product =>
          hasCategory(product, "allinonekit")
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4); // Latest 4

        // Filter products with discounts (25% or more) and sort by discount percentage
        const topDiscounted = items
          .filter(product => product.discount && product.discount >= 25)
          .sort((a, b) => b.discount - a.discount)
          .slice(0, 6); // Top 6 discounted products

        // Debug logging
        console.log("Total products fetched:", items.length);
        console.log("Mobile Accessories products found:", mobileAccessories.length);
        console.log("Electronics products found:", electronics.length);
        console.log("Only Case products found:", onlyCase.length);
        console.log("Only Glass products found:", onlyGlass.length);
        console.log("All In One Kit products found:", allInOneKit.length);
        console.log("Top Discounted products found:", topDiscounted.length);

        setMobileAccessoriesProducts(mobileAccessories);
        setElectronicsProducts(electronics);
        setOnlyCaseProducts(onlyCase);
        setOnlyGlassProducts(onlyGlass);
        setAllInOneKitProducts(allInOneKit);
        setTopDiscountedProducts(topDiscounted);
      } catch (error) {
        console.error("Failed to fetch products from Contentful", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Reduced delay for faster product fetching
    const timer = setTimeout(fetchProducts, 500);
    return () => clearTimeout(timer);
  }, []);

  // Simple loading spinner component
  const LoadingSpinner = () => (
    <div className="loading-spinner"></div>
  );

  // Product section loading component
  const ProductSectionLoader = ({ title, products, category, animationClass = "fade-in" }) => (
    <div className={`product-area ${animationClass}`}>
        <div className="container">
          <SectionTitle titleText={title} positionClass="text-center" />
          {loading ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '200px',
              background: '#f0f0f0',
              backgroundSize: '200% 100%',
              animation: 'loading 1.5s infinite'
            }}>
            <LoadingSpinner />
            </div>
          ) : products.length > 0 ? (
            <Suspense fallback={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '200px' 
              }}>
              <LoadingSpinner />
              </div>
            }>
            <div className="category-section">
                <ShopProducts layout="grid four-column" products={products} />
            </div>
            </Suspense>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>No {title.toLowerCase()} found.</p>
            </div>
          )}
          {/* View More Button */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={() => window.location.href = `/${category}`}
              style={{
                color: '#03055b',
                border: '2px solid #03055b',
                padding: '12px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'transparent'
              }}
            >
              View More {title}
            </button>
          </div>
        </div>
      </div>
  );

  return (
    <Fragment>
      <style>{simpleStyles}</style>
      <SEO
        title="Alharam - Mobile Accessories, Glass Protectors, Covers & Electronics"
        titleTemplate="Alharam | www.alharam.store"
        description="Alharam is Pakistan's premier destination for mobile accessories. Shop premium mobile glass protectors, all-in-one mobile kits, stylish mobile covers, chargers, and quality electronics including AC units and freezers. Fast delivery nationwide."
        keywords="Alharam, mobile accessories, mobile glass, screen protector, tempered glass, mobile cover, mobile case, all in one mobile kit, mobile charger, phone case, smartphone accessories, mobile protection, AC, freezer, electronics, Pakistan, alharam.store"
        ogTitle="Alharam - Premium Mobile Accessories & Electronics Store Pakistan"
        ogDescription="Shop premium mobile glass protectors, all-in-one kits, mobile covers, and accessories. Quality electronics with fast delivery across Pakistan."
        ogType="website"
        ogUrl="https://www.alharam.store/"
        ogImage="https://www.alharam.store/logo.png"
        twitterCard="summary_large_image"
        twitterTitle="Alharam - Mobile Accessories & Electronics Pakistan"
        twitterDescription="Premium mobile glass protectors, all-in-one kits, covers & accessories. AC, freezers & electronics with nationwide delivery."
        canonical="https://www.alharam.store/"
        robots="index, follow"
      />
      
      {/* Top Slider Bar */}
      <div
        role="region"
        aria-label="Store announcements"
        style={{
          width: "100%",
          backgroundColor: "#B79346",
          color: "#ffffff",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 40,
            position: "relative",
          }}
        >
          {topSlides.map((text, index) => (
            <div
              key={index}
              aria-hidden={topSliderActiveIndex !== index}
              style={{
                position: topSliderActiveIndex === index ? "relative" : "absolute",
                opacity: topSliderActiveIndex === index ? 1 : 0,
                transition: "opacity 400ms ease-in-out",
                whiteSpace: "nowrap",
                fontWeight: 600,
                letterSpacing: 0.3,
                lineHeight: "40px",
              }}
            >
              {text}
            </div>
          ))}

          {/* Left Arrow */}
          <button
            type="button"
            aria-label="Previous announcement"
            onClick={() =>
              setTopSliderActiveIndex((prev) => (prev - 1 + topSlides.length) % topSlides.length)
            }
            style={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              color: "#fff",
              border: 0,
              padding: 0,
              fontSize: 28,
              lineHeight: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            aria-label="Next announcement"
            onClick={() => setTopSliderActiveIndex((prev) => (prev + 1) % topSlides.length)}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              color: "#fff",
              border: 0,
              padding: 0,
              fontSize: 28,
              lineHeight: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
        </div>
      </div>

      <LayoutOne >
        {/* hero banner section - Instant load */}
       
        <div className="fade-in">
          <div>
            <HeroBanner />
          </div>
        </div>

 
        
        

        {/* banner - Instant load 
        <div className="fade-in">
          <BannerTwentySeven spaceTopClass="pt-80" spaceBottomClass="pb-60" />
        </div>*/}

        {/* Features Section - Instant load */}
        <ShippingReturnsFeatures />

        

     
        
        {/* All In One Kits - Quick load */}
        <ProductSectionLoader 
          title="All In One Kits" 
          products={allInOneKitProducts} 
          category="allinonekit" 
          animationClass="fade-in"
        />
<br/>

        {/* Video Advertisement Section */}
        <div className="video-ad-section fade-in" style={{
          width: '100%',
          background: '#ffffff',
          padding: '80px 0',
          margin: '0',
          borderTop: '1px solid #e8eaed',
          borderBottom: '1px solid #e8eaed'
        }}>
          <div style={{ width: '100%' }}>
            <div 
              className="video-container"
              style={{
                position: 'relative',
                width: 'calc(100% - 40px)',
                height: '0',
                paddingBottom: 'calc(56.25% - 22.5px)', // 16:9 aspect ratio with margin adjustment
                background: '#000',
                overflow: 'hidden',
                borderRadius: '20px',
                margin: '0 20px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <video
                ref={(el) => {
                  if (el) {
                    el.muted = videoMuted;
                  }
                }}
                autoPlay
                muted={videoMuted}
                loop
                playsInline
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '20px'
                }}
              >
                <source src="/assets/video/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Controls Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                display: 'flex',
                gap: '10px',
                opacity: showControls ? 1 : 0,
                transition: 'opacity 0.3s ease',
                zIndex: 10
              }}>
                {/* Play/Pause Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const video = e.target.closest('.video-container').querySelector('video');
                    if (video.paused) {
                      video.play();
                      setVideoPaused(false);
                    } else {
                      video.pause();
                      setVideoPaused(true);
                    }
                  }}
                  style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '18px',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.8)'}
                >
                  {videoPaused ? '▶️' : '⏸️'}
                </button>
                
                {/* Mute/Unmute Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoMuted(!videoMuted);
                  }}
                  style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '18px',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.9)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.8)'}
                >
                  {videoMuted ? '🔇' : '🔊'}
                </button>
              </div>
            </div>
          </div>
        </div>

<br/>
   {/* latest products section - Quick load */}
   <div className="fade-in">
          <LatestProductSection spaceBottomClass="pb-100" />
        </div>

        <br/>
        {/* Mobile Glass Protectors section */}
        <ProductSectionLoader 
          title="Mobile Glass Protectors" 
          products={onlyGlassProducts} 
          category="onlyglass" 
          animationClass="fade-in"
        />
<br/>

        {/* 2. "Mobile Covers - Masonry Grid Style */}
        <div className="watchstraps-masonry-section fade-in" style={{ backgroundColor: '#03055b' }}>
          <div className="container">
            {/* Header Section */}
            <SectionTitle titleText="Mobile Covers & Cases" positionClass="text-center white-title" />

            
            
          <div className="product-area">
            <div>
             
              {loading ? (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  minHeight: '200px',
                  background: '#f0f0f0',
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s infinite'
                }}>
                  <LoadingSpinner />
                </div>
              ) : onlyCaseProducts.length > 0 ? (
                <div className="category-section">
                  <ShopProducts layout="grid four-column" products={onlyCaseProducts} />
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
                  <p>No mobile covers found.</p>
                </div>
              )}
              {/* View More Button */}
              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button
                  onClick={() => window.location.href = '/onlycase'}
                  style={{
                    color: '#03055b',
                    border: 'white',
                    padding: '12px 30px',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: 'white'
                  }}
                >
                  View More Mobile Covers
                </button>
              </div>
            </div>
          </div>
        
            
          </div>
        </div>
          
        <br/>
        {/* 3. Top Discounted Products - Split Layout */}
        <div className="eyewear-split-section fade-in">
          <div className="container">
            <div className="eyewear-content">
              <div className="row">
                {/* Products Section - Left Side (8 columns) */}
                <div className="col-lg-8">
                   <div>
             <div className="slide-in-left">
              {loading ? (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  minHeight: '200px',
                  background: '#f0f0f0',
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s infinite'
                }}>
                  <LoadingSpinner />
                </div>
              ) : topDiscountedProducts.length > 0 ? (
                <div className="category-section">
                  <ShopProducts 
                    layout={isMobile ? "grid two-column" : "grid three-column"} 
                    products={getDisplayProducts(topDiscountedProducts, 3, 2)} 
                  />
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p>No discounted products found.</p>
                </div>
              )}
             </div>
            </div>
                </div>

                {/* Info Panel - Right Side (4 columns) */}
                <div className="col-lg-4 mt-5">
                  <div className="slide-in-right">
                    <div className="eyewear-info-panel">
                      
                      <h2 style={{ color: '#03055b', fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
                        🔥 Hot Deals
                      </h2>
                      <p className="eyewear-info-panel p" style={{ fontSize: '18px', marginBottom: '20px' }}>
                        Top Discounted Products 
                      </p>
                    
                      <button
                        onClick={() => window.location.href = '/shop'}
                        style={{
                          color: '#fff',
                          border: '2px solid #03055b',
                          padding: '12px 30px',
                          borderRadius: '25px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          background: '#03055b'
                        }}
                      >
                        Shop All Products
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>


        {/* 5. Mobile Accessories - Elegant Minimalist Design */}
        <div className="perfumes-elegant-section fade-in">
          <div className="container">
            {/* Elegant Banner */}
            
            <div>
            
                <h2 className="perfumes-banner h2">
                  MOBILE ACCESSORIES
                </h2>
             
            </div>

            {/* Products Grid */}
            
              <div className="product-area">
            <div >
             
              {loading ? (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  minHeight: '200px',
                  background: '#f0f0f0',
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s infinite'
                }}>
                  <LoadingSpinner />
                </div>
              ) : mobileAccessoriesProducts.length > 0 ? (
                <div className="category-section">
                  <ShopProducts layout="grid four-column" products={mobileAccessoriesProducts} />
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p>No mobile accessories found.</p>
                </div>
              )}
            
            </div>
          </div>
          

            {/* View More Button */}
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button
                onClick={() => window.location.href = '/mobileaccessories'}
                style={{
                  color: '#03055b',
                  border: '2px solid #03055b',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: 'transparent'
                }}
              >
                View More Mobile Accessories
              </button>
            </div>
          </div>
        </div>

        {/* Electronics section */}
        <ProductSectionLoader 
          title="Electronics - AC, Freezers & More" 
          products={electronicsProducts} 
          category="electronics" 
          animationClass="fade-in"
        />


        {/* category showcase section */}
        {/* <div className="fade-in">
          <CategoryShowcase />
        </div> */}

        {/* countdown */}
        {/* <div className="fade-in">
          <RecurringCountDown
            spaceTopClass="pt-115"
            spaceBottomClass="pb-115"
            cycleDays={10}
          />
        </div> */}

        {/*  */}
        <div className="fade-in">
          <FeatureIconTwo spaceTopClass="pt-100" spaceBottomClass="pb-60" />
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFurniture;
