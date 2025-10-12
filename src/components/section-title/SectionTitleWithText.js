import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass, title, description }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>{title || "About Us"}</h5>
          <h1>Welcome to Alharam</h1>
          <p>
            {description || "Alharam is Pakistan's premier destination for mobile accessories and premium electronics. We specialize in mobile glass protectors, all-in-one mobile kits, stylish mobile covers, and a wide range of quality electronics to meet all your needs."}
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default SectionTitleWithText;
