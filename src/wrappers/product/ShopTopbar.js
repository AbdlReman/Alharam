import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ShopTopAction from "../../components/product/ShopTopAction";

const ShopTopbar = ({
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
    <Fragment>
      {/* shop top action */}
      <ShopTopAction
        getLayout={getLayout}
        getFilterSortParams={getFilterSortParams}
        productCount={productCount}
        sortedProductCount={sortedProductCount}
        handleModelFilter={handleModelFilter}
        handleColorFilter={handleColorFilter}
        selectedModel={selectedModel}
        selectedColor={selectedColor}
        uniqueModels={uniqueModels}
        availableColors={availableColors}
      />
    </Fragment>
  );
};

ShopTopbar.propTypes = {
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

export default ShopTopbar;
