import React from "react";
import { Link } from "react-router-dom";

const AboutContent = () => {
  return (
    <div className="about-content-area pt-100 pb-100">
      <div className="container">
        {/* Our Story Section */}
        <div className="row">
          <div className="col-lg-12">
            <div className="about-content">
              <h2>Our Story</h2>
              <p className="lead" style={{maxWidth: 900}}>
                Founded in 2019, <strong>Lanina was born from a simple yet powerful vision</strong>: to provide Pakistani women with premium quality undergarments that combine comfort, style, and confidence. What started as a small boutique has grown into Pakistan's most trusted name in ladies intimate wear.
              </p>
              <p style={{opacity: 0.9}}>
                We understand that every woman is unique, and so are her needs. That's why we've dedicated ourselves to creating a diverse range of <em>bras</em>, <em>panties</em>, <em>lingerie</em>, and <em>shapewear</em> that cater to different preferences, body types, and styles. At Lanina, every woman can find her perfect fit.
              </p>
              <div className="about-features mt-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="feature-item">
                      <i className="fa fa-check-circle text-success"></i>
                      <span>Premium Quality Products</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feature-item">
                      <i className="fa fa-check-circle text-success"></i>
                      <span>Reliable & Efficient Service</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feature-item">
                      <i className="fa fa-check-circle text-success"></i>
                      <span>Wide Product Range</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feature-item">
                      <i className="fa fa-check-circle text-success"></i>
                      <span>Professional Installation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="why-choose-lanina text-center">
              <h2 className="mb-3">Why Choose Lanina?</h2>
              <p className="mb-5" style={{maxWidth: 900, margin: "0 auto", opacity: 0.95}}>
                We're not just selling undergarments — we're <strong>empowering women</strong>. Every item in our collection is carefully selected for <strong>quality</strong>, <strong>comfort</strong>, and <strong>style</strong>. We believe that when you feel confident in your undergarments, you feel confident in everything you do.
              </p>
              <div className="row">
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="choose-card">
                    <div className="choose-icon mb-3">
                      <i className="fa fa-star fa-3x" style={{color: '#03055b'}}></i>
                    </div>
                    <h4>Premium Quality</h4>
                    <p>We offer only the finest fabrics and craftsmanship to ensure maximum comfort and elegance.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="choose-card">
                    <div className="choose-icon mb-3">
                      <i className="fa fa-heart fa-3x" style={{color: '#ff69b4'}}></i>
                    </div>
                    <h4>Elegant Designs</h4>
                    <p>Our collection features modern, stylish, and timeless designs for every occasion and mood.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="choose-card">
                    <div className="choose-icon mb-3">
                      <i className="fa fa-ruler fa-3x" style={{color: '#03055b'}}></i>
                    </div>
                    <h4>Inclusive Sizing</h4>
                    <p>We offer a wide range of sizes to ensure every woman finds her perfect fit and feels confident.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="choose-card">
                    <div className="choose-icon mb-3">
                      <i className="fa fa-female fa-3x" style={{color: '#ff69b4'}}></i>
                    </div>
                    <h4>Empowering Women</h4>
                    <p>Our mission is to empower women to feel beautiful and comfortable in their own skin every day.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="our-values text-center">
              <h2 className="mb-5">Our Values</h2>
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="value-card">
                    <div className="value-icon mb-3">
                      <i className="fa fa-award fa-3x" style={{color: '#03055b'}}></i>
                    </div>
                    <h4>Quality First</h4>
                    <p>We never compromise on quality. Every product undergoes rigorous quality checks to ensure it meets our high standards.</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="value-card">
                    <div className="value-icon mb-3">
                      <i className="fa fa-users fa-3x" style={{color: '#ff69b4'}}></i>
                    </div>
                    <h4>Customer Focus</h4>
                    <p>Our customers are at the heart of everything we do. We listen, learn, and continuously improve based on your feedback.</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="value-card">
                    <div className="value-icon mb-3">
                      <i className="fa fa-handshake fa-3x" style={{color: '#03055b'}}></i>
                    </div>
                    <h4>Professional Service</h4>
                    <p>We understand the importance of reliable service and ensure complete professionalism in all our interactions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Categories Section */}
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="product-categories text-center">
              <h2 className="mb-5">Our Product Categories</h2>
              <div className="row">
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="category-card">
                    <div className="category-icon mb-3">
                      <i className="fa fa-female fa-3x" style={{color: '#03055b'}}></i>
                    </div>
                    <h4>Bras</h4>
                    <p>Supportive, stylish, and comfortable bras for every shape and need.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="category-card">
                    <div className="category-icon mb-3">
                      <i className="fa fa-heart fa-3x" style={{color: '#ff69b4'}}></i>
                    </div>
                    <h4>Panties</h4>
                    <p>Soft, breathable, and beautiful panties for everyday comfort.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="category-card">
                    <div className="category-icon mb-3">
                      <i className="fa fa-star fa-3x" style={{color: '#03055b'}}></i>
                    </div>
                    <h4>Lingerie</h4>
                    <p>Elegant and alluring lingerie to make every woman feel special.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="category-card">
                    <div className="category-icon mb-3">
                      <i className="fa fa-gem fa-3x" style={{color: '#ff69b4'}}></i>
                    </div>
                    <h4>Shapewear</h4>
                    <p>Comfortable shapewear for a smooth, confident silhouette.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials Section */}
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="testimonials text-center">
              <h2 className="mb-5">What Our Customers Say</h2>
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="testimonial-card">
                    <div className="testimonial-content">
                      <i className="fa fa-quote-left fa-2x mb-3" style={{color: '#03055b'}}></i>
                      <p>"Lanina has the most comfortable and beautiful undergarments. I feel confident every day!"</p>
                      <div className="customer-info">
                        <h5>Aisha Khan</h5>
                        <small>Lahore</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="testimonial-card">
                    <div className="testimonial-content">
                      <i className="fa fa-quote-left fa-2x mb-3" style={{color: '#ff69b4'}}></i>
                      <p>"The quality is exceptional and the fit is perfect. Lanina understands women's needs!"</p>
                      <div className="customer-info">
                        <h5>Fatima Ali</h5>
                        <small>Karachi</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="testimonial-card">
                    <div className="testimonial-content">
                      <i className="fa fa-quote-left fa-2x mb-3" style={{color: '#03055b'}}></i>
                      <p>"Professional service and premium quality. Lanina has become my go-to brand for intimate wear."</p>
                      <div className="customer-info">
                        <h5>Zara Hassan</h5>
                        <small>Islamabad</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Commitment Section */}
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="about-commitment text-center" style={{
              background: 'linear-gradient(135deg, #03055b, #ff69b4)',
              color: 'white',
              padding: '60px 40px',
              borderRadius: '20px'
            }}>
              <h2>Our Promise</h2>
              <div className="mt-3" style={{maxWidth: 900, margin: "0 auto"}}>
                <p className="mt-2"><em><strong>Lanina – Where Comfort Meets Confidence. Empowering Women, One Perfect Fit at a Time.</strong></em></p>
              </div>
              <div className="mt-4">
                <div className="btn-hover">
                  <Link to="/shop" className="btn btn-lg" style={{
                    background: 'white',
                    color: '#03055b',
                    border: 'none',
                    padding: '15px 40px',
                    borderRadius: '25px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}>
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent; 