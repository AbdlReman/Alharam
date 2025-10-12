import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import client from "../../data/contentful";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import ChildCategoryButtons from "../../components/category/ChildCategoryButtons";

const TopCategoriesPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const pageLimit = 15;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const entries = await client.getEntries({ content_type: "product" });
        const items = entries.items.map((item) => {
          const fields = item.fields;
          return {
            id: item.sys.id,
            name: fields.name,
            slug: fields.slug,
            price: parseFloat(fields.price) || 0,
            discount: parseFloat(fields.discount) || 0,
            shortDescription: fields.shortDescription,
            fullDescription: fields.fullDescription ? documentToHtmlString(fields.fullDescription) : "",
            category: fields.category || [],
            tag: fields.tag || [],
            images: Array.isArray(fields.images)
              ? fields.images.filter(img => img && img.fields && img.fields.file && img.fields.file.url).map(img => img.fields.file.url)
              : [],
            color: fields.color || [],
            size: fields.size || [],
            metaTitle: fields.metaTitle || "",
            metaDescription: fields.metaDescription || "",
            stock: fields.stock || 0,
            image: Array.isArray(fields.images)
              ? fields.images.filter(img => img && img.fields && img.fields.file && img.fields.file.url).map(img => img.fields.file.url)
              : [],
            title: fields.name,
            description: fields.shortDescription,
            variation: fields.color && fields.color.length > 0 ?
              fields.color.map(color => ({
                color: color,
                size: fields.size ? fields.size.map(size => ({
                  name: size,
                  stock: fields.stock || 0
                })) : []
              })) : null
          };
        });

        // Filter for top categories: Bras, Lingerie, Nightwear, Panties
        const topCategoriesProducts = items.filter(product => {
          if (!product.category || !Array.isArray(product.category)) return false;

          const hasBras = product.category.some(cat => 
            cat && cat.toLowerCase().includes('bras') || cat.toLowerCase().includes('bra')
          );

          const hasLingerie = product.category.some(cat => 
            cat && cat.toLowerCase().includes('lingerie')
          );

          const hasNightwear = product.category.some(cat => 
            cat && cat.toLowerCase().includes('nightwear') || cat.toLowerCase().includes('nightwears') || cat.toLowerCase().includes('nighties') || cat.toLowerCase().includes('night suit') || cat.toLowerCase().includes('night suits')
          );

          const hasPanties = product.category.some(cat => 
            cat && cat.toLowerCase().includes('panties') || cat.toLowerCase().includes('panty')
          );

          return hasBras || hasLingerie || hasNightwear || hasPanties;
        });

        setProducts(topCategoriesProducts);
        setSortedProducts(topCategoriesProducts);
        setCurrentData(topCategoriesProducts.slice(0, pageLimit));
      } catch (error) {
        console.error("Failed to fetch products from Contentful", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => {
        if (!product.category || !Array.isArray(product.category)) return false;
        
        // Filter based on selected category in top categories page
        switch (selectedCategory) {
          case "Bras":
            return product.category.some(cat => 
              cat && (cat.toLowerCase().includes('bras') || cat.toLowerCase().includes('bra'))
            );

          case "Lingerie":
            return product.category.some(cat => 
              cat && cat.toLowerCase().includes('lingerie')
            );

          case "Nightwear":
            return product.category.some(cat => 
              cat && (cat.toLowerCase().includes('nightwear') || cat.toLowerCase().includes('nightwears') || cat.toLowerCase().includes('nighties') || cat.toLowerCase().includes('night suit') || cat.toLowerCase().includes('night suits'))
            );

          case "Panties":
            return product.category.some(cat => 
              cat && (cat.toLowerCase().includes('panties') || cat.toLowerCase().includes('panty'))
            );
          
          default:
            return false;
        }
      });
    }

    // Apply color filter
    if (selectedColor) {
      filtered = filtered.filter(product =>
        product.color && product.color.includes(selectedColor)
      );
    }

    setSortedProducts(filtered);
    setCurrentData(filtered.slice(0, pageLimit));
  }, [products, searchTerm, selectedCategory, selectedColor]);

  if (loading) {
    return (
      <div className="shop-area pt-95 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p>Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <SEO
        titleTemplate="Top Categories – IFI (Iconic Futures Innovations)"
        description="Discover premium watches, straps, perfumes, and more at IFI – Iconic Futures Innovations (ifilifestyle)."
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Top Categories", path: process.env.PUBLIC_URL + "/top-categories" },
          ]}
        />
        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <ChildCategoryButtons parentCategory="top-categories" />
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                <ShopSidebar
                  products={products}
                  handleSearch={setSearchTerm}
                  handleCategoryFilter={setSelectedCategory}
                  handleColorFilter={setSelectedColor}
                  selectedCategory={selectedCategory}
                  selectedColor={selectedColor}
                  searchTerm={searchTerm}
                  clearAllFilters={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setSelectedColor("");
                  }}
                  sideSpaceClass="mr-30"
                  pageType="top-categories"
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                <ShopTopbar
                  productCount={products.length}
                  sortedProductCount={sortedProducts.length}
                />
                <ShopProducts layout="grid three-column" products={currentData} />
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default TopCategoriesPage; 