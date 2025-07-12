import { useSelector } from "react-redux";

const MobileLangCurrChange = () => {
  const currency = useSelector((state) => state.currency);

  return (
    <div className="mobile-menu-middle">
      <div className="lang-curr-style">
        <p>Call Us 3965410</p>
      </div>
    </div>
  );
};

export default MobileLangCurrChange;
