import { Fragment, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { useLocation } from "react-router-dom";
import { getSortedProducts } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import FilterMessage from "../../components/product/FilterMessage";
import client from "../../data/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

// ✅ Import Contentful SDK
// import { createClient } from "contentful";

// // ✅ Contentful client setup
// const client = createClient({
//   space: "wbnz8303cibi",
//   accessToken: "n-sReTyOL5ETWMRdNweWhiVMERg0MfLhPj_oZ685qz8",
// });

const ShopGridStandard = () => {
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageLimit = 15;
  let { pathname } = useLocation();

  const getLayout = (layout) => setLayout(layout);
  const getSortParams = (type, value) => {
    setSortType(type);
    setSortValue(value);
  };
  const getFilterSortParams = (type, value) => {
    setFilterSortType(type);
    setFilterSortValue(value);
  };
  
  // Get unique models from all products
  const getUniqueModels = () => {
    const modelSet = new Set();
    products.forEach(product => {
      if (product.model && Array.isArray(product.model)) {
        product.model.forEach(model => {
          if (model && model.trim()) {
            modelSet.add(model.trim());
          }
        });
      }
    });
    return Array.from(modelSet).sort();
  };
  
  // Get unique colors filtered by selected model
  const getAvailableColors = () => {
    const colorSet = new Set();
    let productsToCheck = products;
    
    // If a model is selected, only check products with that model
    if (selectedModel) {
      productsToCheck = products.filter(product => {
        if (!product.model || !Array.isArray(product.model)) {
          return false;
        }
        return product.model.some(model => 
          model && model.toLowerCase() === selectedModel.toLowerCase()
        );
      });
    }
    
    productsToCheck.forEach(product => {
      if (product.color && Array.isArray(product.color)) {
        product.color.forEach(color => {
          if (color && color.trim()) {
            colorSet.add(color.trim());
          }
        });
      }
    });
    return Array.from(colorSet).sort();
  };
  
  // Handle search
  const handleSearch = (term) => {
    console.log("handleSearch called with:", term);
    setSearchTerm(term);
    setOffset(0);
    setCurrentPage(1);
  };
  
  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setOffset(0);
    setCurrentPage(1);
  };
  
  // Handle color filter
  const handleColorFilter = (color) => {
    setSelectedColor(color);
    setOffset(0);
    setCurrentPage(1);
  };
  
  // Handle model filter
  const handleModelFilter = (model) => {
    setSelectedModel(model);
    // Reset color filter when model changes
    setSelectedColor("");
    setOffset(0);
    setCurrentPage(1);
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedColor("");
    setSelectedModel("");
    setSortType("");
    setSortValue("");
    setFilterSortType("");
    setFilterSortValue("");
    setOffset(0);
    setCurrentPage(1);
  };

  // Fetch products from Contentful on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const entries = await client.getEntries({ content_type: "product" });
        
        const items = entries.items.map((item) => {
          const fields = item.fields;
          
          // Handle category field - it might be a string, array, or object
          let categoryArray = [];
          if (fields.category) {
            if (Array.isArray(fields.category)) {
              categoryArray = fields.category;
            } else if (typeof fields.category === 'string') {
              categoryArray = [fields.category];
            } else if (fields.category.fields) {
              // If it's a Contentful reference
              categoryArray = [fields.category.fields.name || fields.category.fields.title];
            }
          }
          
          // Handle color field - it might be a string, array, or object
          let colorArray = [];
          if (fields.color) {
            if (Array.isArray(fields.color)) {
              colorArray = fields.color;
            } else if (typeof fields.color === 'string') {
              colorArray = [fields.color];
            } else if (fields.color.fields) {
              // If it's a Contentful reference
              colorArray = [fields.color.fields.name || fields.color.fields.title];
            }
          }
          
          // Handle model field - it might be a string, array, or object
          let modelArray = [];
          if (fields.model) {
            if (Array.isArray(fields.model)) {
              modelArray = fields.model;
            } else if (typeof fields.model === 'string') {
              modelArray = [fields.model];
            } else if (fields.model.fields) {
              // If it's a Contentful reference
              modelArray = [fields.model.fields.name || fields.model.fields.title];
            }
          }
          
          return {
            id: item.sys.id,
            name: fields.name,
            slug: fields.slug,
            price: parseFloat(fields.price) || 0,
            discount: parseFloat(fields.discount) || 0,
            shortDescription: fields.shortDescription,
            fullDescription: fields.fullDescription ? documentToHtmlString(fields.fullDescription) : "",
            category: categoryArray,
            tag: fields.tag || [],
            images: fields.images?.map((img) => img.fields.file.url) || [],
            color: colorArray,
            model: modelArray,
            size: fields.size || [],
            metaTitle: fields.metaTitle || "",
            metaDescription: fields.metaDescription || "",
            stock: fields.stock || 0,
            // For backward compatibility
            image: fields.images?.map((img) => img.fields.file.url) || [],
            title: fields.name,
            description: fields.shortDescription,
            // Add variation structure if colors/sizes exist
            variation: colorArray.length > 0 ? 
              colorArray.map(color => ({
                color: color,
                size: fields.size ? fields.size.map(size => ({
                  name: size,
                  stock: fields.stock || 0
                })) : []
              })) : null
          };
        });
        

        
        // Debug: Log all categories to understand the data structure
        const allCategories = items.reduce((acc, product) => {
          if (product.category && Array.isArray(product.category)) {
            product.category.forEach(cat => {
              if (cat && cat.trim()) {
                acc.add(cat.trim());
              }
            });
          }
          return acc;
        }, new Set());
        
        console.log("=== ALL CATEGORIES IN PRODUCTS ===");
        console.log(Array.from(allCategories).sort());
        console.log("=== END CATEGORIES ===");
        
        setProducts(items);
      } catch (error) {
        console.error("Failed to fetch products from Contentful", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sort + paginate when data or filters change
  useEffect(() => {
    let filtered = [...products];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product => {
        const nameMatch = product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const descMatch = product.shortDescription && product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = product.category && product.category.some(cat => 
          cat && cat.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return nameMatch || descMatch || categoryMatch;
      });
    }
    
    // Apply category filter
    if (selectedCategory) {
      console.log("=== CATEGORY FILTER DEBUG ===");
      console.log("Selected Category:", selectedCategory);
      console.log("Products before filter:", filtered.length);
      
      filtered = filtered.filter(product => {
        if (!product.category || !Array.isArray(product.category)) {
          console.log(`Product ${product.name} has no category array:`, product.category);
          return false;
        }
        
        console.log(`Checking product ${product.name} with categories:`, product.category);
        
        // Use exact category matching for dynamic categories
        const match = product.category.some(cat => 
          cat && cat.toLowerCase() === selectedCategory.toLowerCase()
        );
        
        console.log(`Product ${product.name} match:`, match);
        return match;
      });
      
      console.log("Products after filter:", filtered.length);
      console.log("=== END CATEGORY FILTER DEBUG ===");
    }
    
    // Apply model filter
    if (selectedModel) {
      filtered = filtered.filter(product => {
        if (!product.model || !Array.isArray(product.model)) {
          return false;
        }
        return product.model.some(model => 
          model && model.toLowerCase() === selectedModel.toLowerCase()
        );
      });
    }
    
    // Apply color filter
    if (selectedColor) {
      filtered = filtered.filter(product => {
        if (!product.color || !Array.isArray(product.color)) {
          return false;
        }
        return product.color.some(color => 
          color && color.toLowerCase() === selectedColor.toLowerCase()
        );
      });
    }
    
    // Apply sorting
    let sorted = getSortedProducts(filtered, sortType, sortValue);
    sorted = getSortedProducts(sorted, filterSortType, filterSortValue);
    setSortedProducts(sorted);
    setCurrentData(sorted.slice(offset, offset + pageLimit));
  }, [products, offset, sortType, sortValue, filterSortType, filterSortValue, searchTerm, selectedCategory, selectedColor, selectedModel]);
  


  if (loading) {
    return (
      <div className="shop-area pt-95 pb-100">
        <div className="container">
          <div className="text-center">
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
              <SEO titleTemplate="IFILifestyle Collection - Premium Quality Watches" description="Shop the latest collection of premium quality watches at IFILifestyle. Pakistan's premier destination for luxury timepieces with fast delivery. Visit https://www.ifilifestyle.pk/" />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="shop-area pt-95 pb-100">
          <div className="container">
            {products.length === 0 ? (
              <div className="text-center">
                <p>No products found. Please check your Contentful configuration.</p>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-3 order-2 order-lg-1">
                  <ShopSidebar
                    products={products}
                    handleSearch={handleSearch}
                    handleCategoryFilter={handleCategoryFilter}
                    selectedCategory={selectedCategory}
                    searchTerm={searchTerm}
                    clearAllFilters={clearAllFilters}
                    sideSpaceClass="mr-30"
                  />
                </div>
                <div className="col-lg-9 order-1 order-lg-2">
                  {/* Mobile Search Bar */}
                  <div className="mobile-search-bar mb-4 d-lg-none">
                    <div className="search-wrapper">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="form-control"
                        style={{
                          padding: "12px 20px",
                          fontSize: "14px",
                          border: "1px solid #e5e5e5",
                          borderRadius: "5px",
                          width: "100%"
                        }}
                      />
                    </div>
                  </div>
                  
                  <ShopTopbar
                    productCount={products.length}
                    sortedProductCount={sortedProducts.length}
                    getFilterSortParams={getFilterSortParams}
                    getLayout={getLayout}
                    handleModelFilter={handleModelFilter}
                    handleColorFilter={handleColorFilter}
                    selectedModel={selectedModel}
                    selectedColor={selectedColor}
                    uniqueModels={getUniqueModels()}
                    availableColors={getAvailableColors()}
                  />
                                     <FilterMessage
                     selectedCategory={selectedCategory}
                     selectedColor={selectedColor}
                     selectedModel={selectedModel}
                     searchTerm={searchTerm}
                     totalProducts={products.length}
                     filteredProducts={sortedProducts.length}
                     products={products}
                   />
                   
                   {/* Temporary Debug Display */}
                  
                   
                   
                  <ShopProducts layout="grid three-column" products={currentData} />
                  <div className="pro-pagination-style text-center mt-30">
                    <Paginator
                      totalRecords={sortedProducts.length}
                      pageLimit={pageLimit}
                      pageNeighbours={2}
                      setOffset={setOffset}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      pageContainerClass="mb-0 mt-0"
                      pagePrevText="«"
                      pageNextText="»"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ShopGridStandard;
