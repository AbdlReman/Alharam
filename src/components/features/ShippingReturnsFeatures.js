import React from "react";
import { FadeInOnScroll } from "../AnimatedSection";

const ShippingReturnsFeatures = () => {
  return (
    <FadeInOnScroll direction="up" delay={0.35}>
      <div className="features-section" style={{
        padding: '40px 0',
        backgroundColor: '#fff',
        marginBottom: '20px'
      }}>
        <div className="container">
          <div className="row">
            {/* Premium Quality */}
            <div className="col-6 col-md-3 mb-3">
              <div className="feature-card" style={{
                textAlign: 'center',
                padding: '20px 10px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#03055b',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  color: '#fff',
                  fontSize: '20px'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ff69b4'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#03055b'; }}
                >
                  <i className="fa fa-star"></i>
                </div>
                <h5 style={{
                  color: '#03055b',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  Premium Quality
                </h5>
              </div>
            </div>

            {/* Reliable & Efficient */}
            <div className="col-6 col-md-3 mb-3">
              <div className="feature-card" style={{
                textAlign: 'center',
                padding: '20px 10px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#03055b',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  color: '#fff',
                  fontSize: '20px'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ff69b4'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#03055b'; }}
                >
                  <i className="fa fa-clock-o"></i>
                </div>
                <h5 style={{
                  color: '#03055b',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  Reliable & Efficient
                </h5>
              </div>
            </div>

            {/* Wide Product Range */}
            <div className="col-6 col-md-3 mb-3">
              <div className="feature-card" style={{
                textAlign: 'center',
                padding: '20px 10px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#03055b',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  color: '#fff',
                  fontSize: '20px'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ff69b4'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#03055b'; }}
                >
                  <i className="fa fa-th-large"></i>
                </div>
                <h5 style={{
                  color: '#03055b',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  Wide Product Range
                </h5>
              </div>
            </div>

            {/* Professional Service */}
            <div className="col-6 col-md-3 mb-3">
              <div className="feature-card" style={{
                textAlign: 'center',
                padding: '20px 10px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#03055b',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  color: '#fff',
                  fontSize: '20px'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ff69b4'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#03055b'; }}
                >
                  <i className="fa fa-user"></i>
                </div>
                <h5 style={{
                  color: '#03055b',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  lineHeight: '1.2'
                }}>
                  Professional Service
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
};

export default ShippingReturnsFeatures;
