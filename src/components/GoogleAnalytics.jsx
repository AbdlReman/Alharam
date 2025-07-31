import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics utility functions
export const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Track page views
export const trackPageView = (url) => {
  gtag('config', 'G-GY1FYDPZCB', {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track ecommerce events
export const trackPurchase = (transactionId, value, currency = 'PKR') => {
  gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
  });
};

export const trackAddToCart = (itemId, itemName, price, quantity = 1) => {
  gtag('event', 'add_to_cart', {
    items: [{
      item_id: itemId,
      item_name: itemName,
      price: price,
      quantity: quantity,
    }],
  });
};

export const trackViewItem = (itemId, itemName, price, category) => {
  gtag('event', 'view_item', {
    items: [{
      item_id: itemId,
      item_name: itemName,
      price: price,
      item_category: category,
    }],
  });
};

// Component to automatically track page views
const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics; 