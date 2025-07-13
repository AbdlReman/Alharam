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
              <p>
                Founded in 2019, Alharam was born from a simple yet powerful vision: 
                to provide Pakistani homes and businesses with premium quality electronic 
                appliances that combine reliability, efficiency, and affordability. What 
                started as a small shop in Islamabad has grown into one of Pakistan's 
                most trusted names in electronics.
              </p>
              <p>
                We understand that every home and business is unique, and so are their 
                needs. That's why we've dedicated ourselves to creating a diverse range 
                of products that cater to different requirements, preferences, and budgets. 
                From AC units to freezers, Alharam has something for every home and business.
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
                      <span>Reliable & Efficient</span>
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

        {/* Why Choose Alharam Section */}
        <div className="row mt-5">
          <div className="col-lg-12">
                          <div className="why-choose-alharam text-center">
              <h2 className="mb-5">Why Choose Alharam?</h2>
              <div className="row">
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="choose-card">
                    <div className="choose-icon mb-3">
                      <i className="fa fa-gem fa-3x text-brand"></i>
                    </div>
                    <h4>Premium Quality</h4>
                    <p>We offer only the finest electronic appliances to ensure maximum reliability and efficiency.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="choose-card">
                    <div className="choose-icon mb-3">
                      <i className="fa fa-palette fa-3x text-brand"></i>
                    </div>
                    <h4>Modern Technology</h4>
                    <p>Our products feature the latest technology while maintaining reliability and energy efficiency.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="choose-card">
                    <div className="choose-icon mb-3">
                      <i className="fa fa-users fa-3x text-brand"></i>
                    </div>
                    <h4>Wide Selection</h4>
                    <p>We offer a wide range of products to ensure every home and business finds their perfect solution.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="choose-card">
                    <div className="choose-icon mb-3">
                      <i className="fa fa-shipping-fast fa-3x text-brand"></i>
                    </div>
                    <h4>Fast Delivery</h4>
                    <p>Quick and professional delivery across Pakistan with installation service.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="about-values">
              <h2 className="text-center mb-5">Our Values</h2>
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="value-card text-center p-4">
                    <div className="value-icon mb-3">
                      <i className="fa fa-heart fa-3x text-brand"></i>
                    </div>
                    <h4>Quality First</h4>
                    <p>
                      We never compromise on quality. Every product undergoes 
                      rigorous quality checks to ensure it meets our high standards.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="value-card text-center p-4">
                    <div className="value-icon mb-3">
                      <i className="fa fa-users fa-3x text-brand"></i>
                    </div>
                    <h4>Customer Focus</h4>
                    <p>
                      Our customers are at the heart of everything we do. We listen, 
                      learn, and continuously improve based on your feedback.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="value-card text-center p-4">
                    <div className="value-icon mb-3">
                      <i className="fa fa-shield fa-3x text-brand"></i>
                    </div>
                    <h4>Professional Service</h4>
                    <p>
                      We understand the importance of reliable service and ensure 
                      complete professionalism in all our interactions.
                    </p>
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
                      <i className="fa fa-snowflake-o fa-3x text-brand"></i>
                    </div>
                    <h4>Air Conditioners</h4>
                    <p>Premium AC units for homes and businesses with energy efficiency.</p>
                    <div className="btn-hover">
                      <Link to="/shop" className="btn btn-outline-brand btn-sm">Shop AC</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="category-card">
                    <div className="category-icon mb-3">
                      <i className="fa fa-thermometer-0 fa-3x text-brand"></i>
                    </div>
                    <h4>Freezers</h4>
                    <p>Quality freezers for commercial and residential use.</p>
                    <div className="btn-hover">
                      <Link to="/shop" className="btn btn-outline-brand btn-sm">Shop Freezers</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="category-card">
                    <div className="category-icon mb-3">
                      <i className="fa fa-home fa-3x text-brand"></i>
                    </div>
                    <h4>Home Appliances</h4>
                    <p>Modern home appliances for everyday convenience.</p>
                    <div className="btn-hover">
                      <Link to="/shop" className="btn btn-outline-brand btn-sm">Shop Appliances</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                  <div className="category-card">
                    <div className="category-icon mb-3">
                      <i className="fa fa-industry fa-3x text-brand"></i>
                    </div>
                    <h4>Commercial Equipment</h4>
                    <p>Professional equipment for businesses and commercial use.</p>
                    <div className="btn-hover">
                      <Link to="/shop" className="btn btn-outline-brand btn-sm">Shop Equipment</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Testimonials Section */}
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="testimonials-section">
              <h2 className="text-center mb-5">What Our Customers Say</h2>
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="testimonial-card">
                    <div className="testimonial-content p-4">
                      <p>"Alharam has the best electronic appliances I've ever used. The quality is amazing!"</p>
                      <div className="customer-info">
                        <strong>- Ayesha from Karachi</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="testimonial-card">
                    <div className="testimonial-content p-4">
                      <p>"Great customer service and professional installation. Highly recommended!"</p>
                      <div className="customer-info">
                        <strong>- Fatima from Lahore</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="testimonial-card">
                    <div className="testimonial-content p-4">
                      <p>"Perfect quality and reliable service. Alharam understands what customers need."</p>
                      <div className="customer-info">
                        <strong>- Zara from Islamabad</strong>
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
            <div className="about-commitment text-center">
              <h2>Our Commitment</h2>
              <p className="lead">
                At Alharam, we are committed to empowering Pakistani homes and businesses by providing 
                them with the best quality electronic appliances that make their lives easier, 
                more comfortable, and more efficient. We believe that every home and business deserves 
                reliable electronics, and we're here to help make that happen.
              </p>
              <div className="mt-4">
                <div className="btn-hover">
                  <Link to="/shop" className="btn btn-brand btn-lg">
                    Shop Our Collection
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