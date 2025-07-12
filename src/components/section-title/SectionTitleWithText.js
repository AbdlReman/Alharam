import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
                  <h1>Welcome To Alharam</h1>
        <p>
          Alharam is Pakistan's premier destination for premium electronic appliances. 
            We believe every home and business deserves reliable, efficient, and modern 
            electronic appliances. Our carefully curated collection of AC units, freezers, 
            and other appliances combines technology with reliability, ensuring you get the best performance every day.
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
