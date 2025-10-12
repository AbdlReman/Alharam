import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import "../../assets/css/filter-message.css";

const ShopCategories = ({ categories, handleCategoryFilter, selectedCategory, products, pageType }) => {

  // Use dynamic categories from Contentful if available, otherwise fall back to parent categories
  const getDynamicCategories = () => {
    if (categories && categories.length > 0) {
      // Return the dynamic categories from Contentful
      return categories;
    }
    
    // Fallback to parent categories based on page type
    if (pageType === "top-categories") {
      return ["Bras", "Lingerie", "Nightwear", "Panties"];
    } else if (pageType === "categories") {
      return ["Eyewear", "Rings & Accessories", "Mobile Gadgets", "Fashion"];
    } else {
      // Default: show all parent categories (for shop page)
      return [
        "Watches",
        "Watch Straps", 
        "Perfumes",
        "Eyewear",
        "Rings & Accessories",
        "Mobile Gadgets",
        "Fashion"
      ];
    }
  };

  const dynamicCategories = getDynamicCategories();

  const handleCategoryClick = (category) => {
    handleCategoryFilter(category);
  };

  const getCategoryProductCount = (category) => {
    if (!products || !category) return 0;
    
    // For dynamic categories from Contentful, do exact matching
    if (categories && categories.length > 0) {
      return products.filter(product => {
        if (!product.category || !Array.isArray(product.category)) return false;
        return product.category.some(cat => 
          cat && cat.toLowerCase() === category.toLowerCase()
        );
      }).length;
    }
    
    // For parent categories, use the existing keyword matching logic
    const count = products.filter(product => {
      if (!product.category || !Array.isArray(product.category)) return false;
      
      switch (category) {
        case "Watches":
          return product.category.some(cat => 
            cat && (cat.toLowerCase().includes('watches') || 
                   cat.toLowerCase().includes('watch') ||
                   cat.toLowerCase().includes('timepiece') ||
                   cat.toLowerCase().includes('chronograph'))
          );
        
        case "Watch Straps":
          return product.category.some(cat => 
            cat && (cat.toLowerCase().includes('straps') || 
                   cat.toLowerCase().includes('strap') ||
                   cat.toLowerCase().includes('band') ||
                   cat.toLowerCase().includes('bracelet'))
          );
        
        case "Perfumes":
          return product.category.some(cat => 
            cat && (cat.toLowerCase().includes('perfume') || 
                   cat.toLowerCase().includes('fragrance') ||
                   cat.toLowerCase().includes('cologne') ||
                   cat.toLowerCase().includes('scent'))
          );
        
        case "Eyewear":
          return product.category.some(cat => 
            cat && (cat.toLowerCase().includes('eyewear') || 
                   cat.toLowerCase().includes('sunglasses') || 
                   cat.toLowerCase().includes('optical') ||
                   cat.toLowerCase().includes('glasses') ||
                   cat.toLowerCase().includes('lens'))
          );
        
        case "Rings & Accessories":
          return product.category.some(cat => 
            cat && (cat.toLowerCase().includes('rings') || 
                   cat.toLowerCase().includes('accessories') || 
                   cat.toLowerCase().includes('bracelets') || 
                   cat.toLowerCase().includes('chains') ||
                   cat.toLowerCase().includes('necklace') ||
                   cat.toLowerCase().includes('earrings') ||
                   cat.toLowerCase().includes('jewelry'))
          );
        
        case "Mobile Gadgets":
          return product.category.some(cat => 
            cat && (cat.toLowerCase().includes('mobile') || 
                   cat.toLowerCase().includes('gadgets') || 
                   cat.toLowerCase().includes('phones') ||
                   cat.toLowerCase().includes('smartphone') ||
                   cat.toLowerCase().includes('electronics'))
          );
        
        case "Fashion":
          return product.category.some(cat => 
            cat && (cat.toLowerCase().includes('fashion') || 
                   cat.toLowerCase().includes('clothing') || 
                   cat.toLowerCase().includes('tshirt') || 
                   cat.toLowerCase().includes('pant') || 
                   cat.toLowerCase().includes('jeans') || 
                   cat.toLowerCase().includes('shalwar') || 
                   cat.toLowerCase().includes('kameez') ||
                   cat.toLowerCase().includes('dress') ||
                   cat.toLowerCase().includes('shirt') ||
                   cat.toLowerCase().includes('trouser'))
          );
        
        default:
          // Try exact match for specific categories
          return product.category.some(cat => 
            cat && cat.toLowerCase() === category.toLowerCase()
          );
      }
    }).length;
    
    return count;
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        <ul>
          <li>
            <div className="sidebar-widget-list-left">
              <button
                className={selectedCategory === "" ? "active" : ""}
                onClick={e => {
                  handleCategoryClick("");
                  setActiveSort(e);
                }}
              >
                <span className="checkmark" /> All Categories
                <span className="category-count">
                  ({products?.length || 0})
                </span>
              </button>
            </div>
          </li>
          {dynamicCategories.map((category, key) => {
            const categoryCount = getCategoryProductCount(category);
            // Only show categories that have products
            if (categoryCount === 0) return null;
            
            return (
              <li key={key}>
                <div className="sidebar-widget-list-left">
                  <button
                    className={selectedCategory === category ? "active" : ""}
                    onClick={e => {
                      handleCategoryClick(category);
                      setActiveSort(e);
                    }}
                  >
                    {" "}
                    <span className="checkmark" /> {category}{" "}
                    <span className="category-count">
                      ({categoryCount})
                    </span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  handleCategoryFilter: PropTypes.func,
  selectedCategory: PropTypes.string,
  products: PropTypes.array,
  pageType: PropTypes.string
};

export default ShopCategories;
