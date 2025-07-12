import { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import emailjs from "emailjs-com";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { deleteAllFromCart } from "../../store/slices/cart-slice";

// Initialize EmailJS with your brand configuration
emailjs.init("uOGdgPbVqeIsG8gD8");

const Checkout = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Pakistan",
    streetAddress: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  const { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  let cartTotalPrice = 0;

  // Show welcome toast when component mounts (only once)
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      toast.info(
        `Welcome to checkout! You have ${cartItems.length} item(s) in your cart.`
      );
    }
  }, []); // Empty dependency array - only runs once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "country",
      "streetAddress",
      "city",
      "phone",
      "email",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Processing your order...");

    // Create order summary with proper discount calculation
    const orderSummary = cartItems.map((item) => {
      const finalProductPrice = (item.price * currency.currencyRate).toFixed(2);
      const discountedPrice = getDiscountPrice(item.price, item.discount);
      const finalDiscountedPrice = discountedPrice 
        ? (discountedPrice * currency.currencyRate).toFixed(2)
        : finalProductPrice;
      
      const itemTotal = (finalDiscountedPrice * item.quantity).toFixed(2);
      
      return {
        productName: item.name,
        quantity: item.quantity,
        price: finalDiscountedPrice,
        total: itemTotal
      };
    });

    const total = orderSummary
      .reduce((sum, item) => sum + parseFloat(item.total), 0)
      .toFixed(2);

    // Create separate arrays for each column
    const productNames = orderSummary.map(item => {
      const shortName = item.productName.length > 30 
        ? item.productName.substring(0, 27) + '...' 
        : item.productName;
      return shortName;
    });
    
    const quantities = orderSummary.map(item => item.quantity);
            const prices = orderSummary.map(item => `${"Rs "}${item.price}`);
        const totals = orderSummary.map(item => `${"Rs "}${item.total}`);
    
    // Join arrays with line breaks for display
    const formattedProductNames = productNames.join('\n');
    const formattedQuantities = quantities.join('\n');
    const formattedPrices = prices.join('\n');
    const formattedTotals = totals.join('\n');

    // Log the data to be sent for debugging
    console.log("FormData:", {
      ...formData,
      productNames: formattedProductNames,
      quantities: formattedQuantities,
      prices: formattedPrices,
      totals: formattedTotals,
      total,
    });

    try {
      const result = await emailjs.send(
        "service_fuhazui", // Your service ID
        "template_524i96s", // Your template ID
        {
          brandName: "Alharam",
          firstName: formData.firstName,
          lastName: formData.lastName,
          companyName: formData.companyName,
          country: formData.country,
          streetAddress: formData.streetAddress,
          streetAddress2: formData.streetAddress2,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          phone: formData.phone,
          email: formData.email,
          orderNotes: formData.orderNotes,
          productNames: formattedProductNames,
          quantities: formattedQuantities,
          prices: formattedPrices,
          totals: formattedTotals,
          total: total,
        },
        "uOGdgPbVqeIsG8gD8" // Your user ID
      );
      console.log("Email sent successfully:", result);

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);

      // Clear the cart after successful order placement (without showing cart clear toast)
      dispatch(deleteAllFromCart({ silent: true }));

      // Clear form data
      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        country: "",
        streetAddress: "",
        city: "",
        state: "",
        postcode: "",
        phone: "",
        email: "",
        orderNotes: "",
      });

      // Show single success notification
      toast.success("Order completed successfully!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error sending email:", error);

      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout - Alharam"
        description="Complete your purchase at Alharam. Secure checkout for premium electronic appliances with reliable delivery."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <form onSubmit={handleSubmit}>
                {" "}
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>Billing Details</h3>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>First Name *</label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Last Name *</label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Company Name</label>
                            <input
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-select mb-20">
                            <label>Country *</label>
                            <select
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                            >
                              <option value="">Select a country</option>
                              <option value="Pakistan">Pakistan</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Street Address *</label>
                            <input
                              className="billing-address"
                              placeholder="House number and street name"
                              type="text"
                              name="streetAddress"
                              value={formData.streetAddress}
                              onChange={handleChange}
                            />
                            <input
                              placeholder="Apartment, suite, unit etc."
                              type="text"
                              name="streetAddress2"
                              value={formData.streetAddress2}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Town / City *</label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>State / County</label>
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Postcode / ZIP</label>
                            <input
                              type="text"
                              name="postcode"
                              value={formData.postcode}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Phone *</label>
                            <input
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Email Address *</label>
                            <input
                              type="text"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="additional-info-wrap">
                        <h4>Additional information</h4>
                        <div className="additional-info">
                          <label>Order notes</label>
                          <textarea
                            placeholder="Notes about your order, e.g. special notes for delivery."
                            name="orderNotes"
                            value={formData.orderNotes}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Your order</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Product</li>
                              <li>Total</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, key) => {
                                const discountedPrice = getDiscountPrice(
                                  cartItem.price,
                                  cartItem.discount
                                );
                                const finalProductPrice = (
                                  cartItem.price * currency.currencyRate
                                ).toFixed(2);
                                const finalDiscountedPrice = (
                                  discountedPrice * currency.currencyRate
                                ).toFixed(2);

                                discountedPrice != null
                                  ? (cartTotalPrice +=
                                      finalDiscountedPrice * cartItem.quantity)
                                  : (cartTotalPrice +=
                                      finalProductPrice * cartItem.quantity);
                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.name} X {cartItem.quantity}
                                    </span>{" "}
                                    <span className="order-price">
                                      {discountedPrice !== null
                                        ? "Rs " +
                                          (
                                            finalDiscountedPrice *
                                            cartItem.quantity
                                          ).toFixed(2)
                                        : "Rs " +
                                          (
                                            finalProductPrice *
                                            cartItem.quantity
                                          ).toFixed(2)}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">Shipping</li>
                              <li>Free shipping</li>
                            </ul>
                          </div>
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>
                                {"Rs " +
                                  cartTotalPrice.toFixed(2)}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="payment-method"></div>
                      </div>
                      <div className="place-order mt-25">
                        <button className="btn-hover" type="submit">
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        Shop Now
                      </Link>
                    </div>
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

export default Checkout;
