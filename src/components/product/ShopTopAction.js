import PropTypes from "prop-types";
import { useState } from "react";
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
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null); // 'model' or 'color'

  const handleMobileFilterClick = (filterType) => {
    setActiveFilter(filterType);
    setShowMobileModal(true);
  };

  const handleMobileOptionSelect = (value, filterType) => {
    if (filterType === 'model') {
      handleModelFilter(value);
    } else {
      handleColorFilter(value);
    }
    setShowMobileModal(false);
    setActiveFilter(null);
  };

  return (
    <>
      <style>{`
        .shop-top-bar {
          position: relative;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        
        .select-shoing-wrap {
          position: relative;
          width: 100%;
          max-width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        
        .filter-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          flex: 1 1 auto;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }
        
        .shop-select {
          position: relative;
          min-width: 0;
          flex: 0 0 auto;
          max-width: 100%;
          box-sizing: border-box;
          overflow: visible;
        }
        
        .shop-select {
          position: relative;
        }
        
        .shop-select::after {
          content: '';
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #606060;
          pointer-events: none;
          z-index: 1;
          transition: border-top-color 0.2s ease;
        }
        
        .shop-select:hover::after {
          border-top-color: #03055b;
        }
        
        .shop-select select:focus ~ .shop-select::after,
        .shop-select select:focus {
          border-color: #03055b;
        }
        
        @media (min-width: 768px) {
          .shop-select::after {
            right: 18px;
          }
        }
        
        .shop-select select {
          width: 100%;
          max-width: 100%;
          min-width: 150px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 10px 35px 10px 15px;
          margin: 0;
          display: block;
          font-size: 14px;
          color: #606060;
          border: 1px solid #e6e6e6;
          border-radius: 5px;
          background: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        
        .shop-select select:hover {
          border-color: #03055b;
          box-shadow: 0 2px 4px rgba(3, 5, 91, 0.1);
        }
        
        .shop-select select:focus {
          outline: none;
          border-color: #03055b;
          box-shadow: 0 0 0 3px rgba(3, 5, 91, 0.1);
        }
        
        .shop-select select option {
          padding: 10px;
          background: #fff;
          color: #606060;
        }
        
        .result-count {
          margin: 0;
          flex: 0 0 auto;
          white-space: nowrap;
          color: #606060;
          box-sizing: border-box;
          font-size: 14px;
        }
        
        /* Desktop styles */
        @media (min-width: 992px) {
          .select-shoing-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
          }
          
          .filter-wrapper {
            display: flex;
            align-items: center;
            gap: 15px;
            flex: 0 1 auto;
          }
          
          .shop-select {
            flex: 0 0 auto;
            position: relative;
          }
          
          .shop-select select {
            min-width: 200px;
            padding: 12px 40px 12px 18px;
            font-size: 14px;
          }
          
          .result-count {
            margin-left: auto;
            font-size: 14px;
            color: #606060;
            white-space: nowrap;
          }
        }
        
        /* Large Desktop */
        @media (min-width: 1200px) {
          .shop-select select {
            min-width: 220px;
          }
        }
        
        /* Tablet styles */
        @media (min-width: 768px) and (max-width: 991px) {
          .select-shoing-wrap {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }
          
          .filter-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            width: 100%;
          }
          
          .shop-select {
            flex: 0 0 calc(50% - 7.5px);
            max-width: calc(50% - 7.5px);
          }
          
          .shop-select select {
            min-width: 0;
            width: 100%;
            padding: 10px 35px 10px 15px;
          }
          
          .result-count {
            width: 100%;
            text-align: left;
            margin-top: 0;
          }
        }
        
        /* Mobile styles */
        @media (max-width: 767px) {
          .shop-top-bar {
            width: 100% !important;
            max-width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }
          
          .select-shoing-wrap {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            gap: 10px !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }
          
          .filter-wrapper {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 100% !important;
            flex: 1 1 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            gap: 10px !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }
          
          .shop-select {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            margin-right: 0 !important;
            margin-left: 0 !important;
            flex: 1 1 100% !important;
            padding: 0 !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }
          
          .shop-select select {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            padding: 8px 10px !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            appearance: none !important;
            border: 1px solid #e6e6e6 !important;
            position: relative !important;
            left: 0 !important;
            right: 0 !important;
            transform: none !important;
          }
          
          /* Ensure select dropdown options stay in viewport */
          .shop-select select:focus {
            outline: none;
          }
          
          /* Try to prevent dropdown from going off-screen */
          .shop-select {
            position: relative !important;
            left: 0 !important;
            right: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          .result-count {
            width: 100% !important;
            max-width: 100% !important;
            text-align: center !important;
            margin-top: 10px !important;
            flex: 1 1 100% !important;
            padding: 0 !important;
            white-space: normal !important;
            word-wrap: break-word !important;
            box-sizing: border-box !important;
            overflow-wrap: break-word !important;
          }
        }
        
        /* Ensure parent container doesn't cause overflow */
        @media (max-width: 767px) {
          .shop-area .container .shop-top-bar,
          .shop-area .container-fluid .shop-top-bar,
          .container .shop-top-bar,
          .container-fluid .shop-top-bar {
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .shop-area .container,
          .shop-area .container-fluid {
            padding-left: 15px !important;
            padding-right: 15px !important;
            box-sizing: border-box !important;
          }
        }
        
        /* Small mobile */
        @media (max-width: 480px) {
          .shop-select select {
            font-size: 14px !important;
            padding: 8px 10px !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
          
          .result-count {
            font-size: 13px;
          }
          
          .select-shoing-wrap {
            gap: 8px;
          }
          
          .filter-wrapper {
            gap: 8px;
          }
          
          /* Ensure no overflow */
          .shop-select {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
          
          .shop-select select {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
        }
        
        /* Extra small mobile */
        @media (max-width: 360px) {
          .shop-select select {
            font-size: 13px !important;
            padding: 6px 8px !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
          
          .result-count {
            font-size: 12px;
          }
          
          .shop-select {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
        }
        
        /* Mobile - Hide native selects, show buttons */
        @media (max-width: 767px) {
          .shop-select select {
            display: none !important;
          }
          
          .mobile-filter-btn {
            display: block !important;
            width: 100% !important;
            padding: 12px 15px !important;
            background: #fff !important;
            border: 1px solid #e6e6e6 !important;
            border-radius: 5px !important;
            font-size: 14px !important;
            color: #606060 !important;
            text-align: left !important;
            cursor: pointer !important;
            box-sizing: border-box !important;
            position: relative !important;
          }
          
          .mobile-filter-btn::after {
            content: '▼' !important;
            position: absolute !important;
            right: 15px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            font-size: 12px !important;
          }
          
          .mobile-filter-btn.active {
            border-color: #03055b !important;
            color: #03055b !important;
          }
        }
        
        /* Desktop - Hide mobile buttons, show selects */
        @media (min-width: 768px) {
          .mobile-filter-btn {
            display: none !important;
          }
          
          .shop-select select {
            display: block !important;
          }
        }
        
        /* Mobile Modal Styles */
        .mobile-filter-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9999;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }
        
        .mobile-filter-modal.show {
          display: flex;
        }
        
        .mobile-filter-modal-content {
          background: #fff;
          border-radius: 10px;
          width: 100%;
          max-width: 400px;
          max-height: 80vh;
          overflow-y: auto;
          box-sizing: border-box;
          position: relative;
        }
        
        .mobile-filter-modal-header {
          padding: 20px;
          border-bottom: 1px solid #e6e6e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .mobile-filter-modal-header h3 {
          margin: 0;
          font-size: 18px;
          color: #010101;
        }
        
        .mobile-filter-modal-close {
          background: none;
          border: none;
          font-size: 24px;
          color: #606060;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .mobile-filter-options {
          padding: 10px 0;
          max-height: calc(80vh - 80px);
          overflow-y: auto;
        }
        
        .mobile-filter-option {
          padding: 15px 20px;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: 16px;
          color: #606060;
          cursor: pointer;
          transition: background 0.2s;
          box-sizing: border-box;
        }
        
        .mobile-filter-option:hover {
          background: #f5f5f5;
        }
        
        .mobile-filter-option.selected {
          background: #f0f0f0;
          color: #03055b;
          font-weight: 600;
        }
        
        .mobile-filter-option.selected::after {
          content: ' ✓';
          float: right;
        }
      `}</style>
      <div className="shop-top-bar mb-35">
        <div className="select-shoing-wrap">
          <div className="filter-wrapper">
            {/* Model Filter - Desktop Select */}
            <div className="shop-select">
              <select
                value={selectedModel || ""}
                onChange={e => handleModelFilter(e.target.value)}
              >
                <option value="">All Models</option>
                {uniqueModels && uniqueModels.map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              
              {/* Mobile Button */}
              <button
                className={`mobile-filter-btn ${selectedModel ? 'active' : ''}`}
                onClick={() => handleMobileFilterClick('model')}
              >
                {selectedModel || 'All Models'}
              </button>
            </div>
            
            {/* Color Filter - Desktop Select */}
            <div className="shop-select">
              <select
                value={selectedColor || ""}
                onChange={e => handleColorFilter(e.target.value)}
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
              
              {/* Mobile Button */}
              <button
                className={`mobile-filter-btn ${selectedColor ? 'active' : ''}`}
                onClick={() => handleMobileFilterClick('color')}
                disabled={!selectedModel && uniqueModels && uniqueModels.length > 0}
                style={{
                  opacity: (!selectedModel && uniqueModels && uniqueModels.length > 0) ? 0.6 : 1
                }}
              >
                {selectedColor || 'All Colors'}
              </button>
            </div>
          </div>
          
          <p className="result-count">
            Showing {sortedProductCount} of {productCount} result
          </p>
        </div>
        
        {/* Mobile Filter Modal */}
        <div className={`mobile-filter-modal ${showMobileModal ? 'show' : ''}`} onClick={() => setShowMobileModal(false)}>
          <div className="mobile-filter-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-filter-modal-header">
              <h3>{activeFilter === 'model' ? 'Select Model' : 'Select Color'}</h3>
              <button className="mobile-filter-modal-close" onClick={() => setShowMobileModal(false)}>
                ×
              </button>
            </div>
            <div className="mobile-filter-options">
              <button
                className={`mobile-filter-option ${(activeFilter === 'model' && !selectedModel) || (activeFilter === 'color' && !selectedColor) ? 'selected' : ''}`}
                onClick={() => handleMobileOptionSelect('', activeFilter)}
              >
                {activeFilter === 'model' ? 'All Models' : 'All Colors'}
              </button>
              {activeFilter === 'model' && uniqueModels && uniqueModels.map((model, index) => (
                <button
                  key={index}
                  className={`mobile-filter-option ${selectedModel === model ? 'selected' : ''}`}
                  onClick={() => handleMobileOptionSelect(model, 'model')}
                >
                  {model}
                </button>
              ))}
              {activeFilter === 'color' && availableColors && availableColors.map((color, index) => (
                <button
                  key={index}
                  className={`mobile-filter-option ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => handleMobileOptionSelect(color, 'color')}
                >
                  {color}
                </button>
              ))}
              {activeFilter === 'color' && (!availableColors || availableColors.length === 0) && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  No colors available
                </div>
              )}
            </div>
          </div>
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
    </>
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

