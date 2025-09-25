import React from "react";
import { Link } from "react-router-dom";

const HomeLastcomp = () => {
  return (
    <div className="about-content-area pt-100 pb-100">
      <div className="container">
        {/* Our Story Section */}
       

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

export default HomeLastcomp; 