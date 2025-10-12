import { Link } from "react-router-dom";

const MobileWidgets = () => {
  return (
    <div className="header-offcanvas-widget">
      <div className="header-offcanvas-widget-single">
        <div className="header-offcanvas-widget-content">
          <p>Need help? Contact us:</p>
          <p>
            <a href="tel:+923342743554">+92 334 2743554</a>
          </p>
          <p>
            <a href="https://wa.me/923342743554" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-whatsapp" style={{ color: '#25D366' }}></i> WhatsApp
            </a>
          </p>
          <p>
            <a href="mailto:info@alharam.store">info@alharam.store</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileWidgets;
