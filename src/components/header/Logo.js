import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Logo = ({ imageUrl, logoClass }) => {
  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link to={process.env.PUBLIC_URL + "/"}>
        <img
          alt="Alharam Logo"
          src={process.env.PUBLIC_URL + imageUrl}
          style={{
            maxWidth: '80%',
            height: 'auto',
            transition: 'all 0.3s ease'
          }}
        />
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
