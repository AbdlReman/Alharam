import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EMAILJS_CONFIG } from "../../config/emailjs";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Contact = () => {
  let { pathname } = useLocation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitStatus, setSubmitStatus] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // setSubmitStatus('');

    // Check if EmailJS is properly configured
    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.CONTACT_TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
      // setSubmitStatus('error');
      setIsSubmitting(false);
      toast.error('EmailJS is not properly configured. Please check your configuration.');
      return;
    }

    try {
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Alharam Store'
        }
      );

      if (result.status === 200) {
        // setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        toast.success('Thank you! Your message has been sent successfully.');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      // setSubmitStatus('error');
      toast.error('Sorry! There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <SEO 
        titleTemplate="Contact – Alharam" 
        title="Contact Alharam - Mobile Accessories & Electronics Store"
        description="Get in touch with Alharam - Pakistan's premier mobile accessories and electronics store. Contact us for orders, product inquiries about mobile glass, covers, all-in-one kits, and electronics. We're here to help!"
        keywords="contact Alharam, mobile accessories support, customer service, Pakistan electronics store, mobile glass inquiry, product support"
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Contact", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
     
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="custom-row-2">
              <div className="col-12 col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="tel:+923342743554">+92 334 2743554</a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-whatsapp" style={{ color: '#25D366' }} />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="https://wa.me/923342743554" target="_blank" rel="noopener noreferrer">
                          WhatsApp: +92 334 2743554
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                                            <p>
                        <a href="mailto:info@alharam.store">
                          info@alharam.store
                        </a>
                      </p>
                      <p>
                        <a href="mailto:support@alharam.store">
                          support@alharam.store
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Alharam Store, </p>
                      <p>Islamabad, Pakistan.</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Alharam</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//instagram.com">
                          <i className="fa fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="//youtube.com">
                          <i className="fa fa-youtube" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  <form className="contact-form-style" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <input 
                          name="name" 
                          placeholder="Name*" 
                          type="text" 
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-lg-6">
                        <input 
                          name="email" 
                          placeholder="Email*" 
                          type="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder="Subject*"
                          type="text"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Your Message*"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                        <button 
                          className="submit" 
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'SENDING...' : 'SEND'}
                        </button>
                      </div>
                    </div>
                  </form>

                  <p className="form-message" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Contact;

