import PropTypes from "prop-types";

import { setActiveLayout } from "../../helpers/product";

const ShopTopAction = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount,
  handleModelFilter,
  handleColorFilter,
  selectedModel,
  selectedColor,
  uniqueModels,
  availableColors
}) => {
  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        {/* Model Filter */}
        <div className="shop-select" style={{ marginRight: "15px" }}>
          <select
            value={selectedModel || ""}
            onChange={e => handleModelFilter(e.target.value)}
            style={{ minWidth: "150px" }}
          >
            <option value="">All Models</option>
            {uniqueModels && uniqueModels.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
        
        {/* Color Filter */}
        <div className="shop-select" style={{ marginRight: "15px" }}>
          <select
            value={selectedColor || ""}
            onChange={e => handleColorFilter(e.target.value)}
            style={{ minWidth: "150px" }}
          >
            <option value="">All Colors</option>
            {availableColors && availableColors.length > 0 ? (
              availableColors.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))
            ) : (
              <option value="" disabled>No colors available</option>
            )}
          </select>
        </div>
        
        {/* Sort Filter */}
    
        <p>
          Showing {sortedProductCount} of {productCount} result
        </p>
      </div>

      <div className="shop-tab">
        {/* <button
          onClick={e => {
            getLayout("grid two-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          onClick={e => {
            getLayout("grid three-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button
          onClick={e => {
            getLayout("list");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-list-ul" />
        </button> */}
      </div>
    </div>
  );
};

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number,
  handleModelFilter: PropTypes.func,
  handleColorFilter: PropTypes.func,
  selectedModel: PropTypes.string,
  selectedColor: PropTypes.string,
  uniqueModels: PropTypes.array,
  availableColors: PropTypes.array
};

export default ShopTopAction;
