import PropTypes from "prop-types";

const LanguageCurrencyChanger = ({ currency }) => {
  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency">
        <p>Call Us +923342743554</p>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  currency: PropTypes.shape({}),
};

export default LanguageCurrencyChanger;
