import PropTypes from "prop-types";
import clsx from "clsx"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridTwo from "./ProductGridTwo";
import client from "../../data/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

const TabProductTwo = ({ spaceBottomClass, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
            images: fields.images?.map((img) => img.fields.file.url) || [],
            color: fields.color || [],
            size: fields.size || [],
            metaTitle: fields.metaTitle || "",
            metaDescription: fields.metaDescription || "",
            stock: fields.stock || 0,
            // For backward compatibility
            image: fields.images?.[0]?.fields?.file?.url,
            title: fields.name,
            description: fields.shortDescription,
            // Add variation structure if colors/sizes exist
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
        setProducts(items);
      } catch (error) {
        console.error("Failed to fetch products from Contentful", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Show all products regardless of category
  const allProducts = products;

  // Get different product types - limit to 3 latest products
  const newArrivals = allProducts.slice(0, 3);
  const bestSellers = allProducts
    .sort((a, b) => (b.stock || 0) - (a.stock || 0))
    .slice(0, 3);
  const saleItems = allProducts
    .filter(product => product.discount > 0)
    .slice(0, 3);

  if (loading) {
    return (
      <div className={clsx("product-area", spaceBottomClass)}>
        <div className="container">
          <SectionTitle titleText="DAILY DEALS!" positionClass="text-center" />
          <div className="text-center py-5">
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("product-area", spaceBottomClass)}>
      <div className="container">
        <SectionTitle titleText="DAILY DEALS!" positionClass="text-center" />
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className="product-tab-list pt-30 pb-55 text-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>New Arrivals</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>Best Sellers</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>Sale Items</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row three-column">
                <ProductGridTwo
                  products={newArrivals}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row three-column">
                <ProductGridTwo
                  products={bestSellers}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row three-column">
                <ProductGridTwo
                  products={saleItems}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/shop"}
          >
            VIEW MORE PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductTwo.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default TabProductTwo;
