// SEO Configuration for Alharam Electronics Store

export const siteConfig = {
  name: "Alharam",
  description: "Pakistan's premier electronics store. Shop premium quality AC, Freezer, and other electronic appliances for your home and business.",
  url: "https://www.alharam.store",
  ogImage: "/logo.png",
  keywords: "electronics, AC, freezer, appliances, Pakistan, Alharam, home appliances, air conditioning",
  author: "Alharam",
  twitterHandle: "@alharam",
  facebookAppId: "",
  googleAnalyticsId: "G-GY1FYDPZCB",
};

// Default SEO settings
export const defaultSEO = {
  titleTemplate: "%s | Alharam - Premium Electronics Store",
  defaultTitle: "Alharam - Premium Electronics Store",
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    site_name: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    handle: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
    cardType: "summary_large_image",
  },
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: "Home",
    description: "Welcome to Alharam - Pakistan's trusted electronics store. Discover premium AC units, freezers, and home appliances with unbeatable quality and service.",
    keywords: "electronics store, AC, freezer, home appliances, Pakistan, Alharam",
    ogType: "website",
  },
  shop: {
    title: "Shop",
    description: "Browse our extensive collection of premium electronics and home appliances. Find the perfect AC, freezer, and more for your home.",
    keywords: "shop electronics, buy AC, freezer, home appliances, online store",
    ogType: "website",
  },
  product: {
    title: "Product",
    description: "Discover premium quality electronics and home appliances. View detailed specifications, reviews, and competitive pricing.",
    keywords: "product details, electronics specifications, AC, freezer, home appliances",
    ogType: "product",
  },
  about: {
    title: "About Us",
    description: "Learn about Alharam's commitment to quality electronics and exceptional customer service. Your trusted partner for home appliances in Pakistan.",
    keywords: "about Alharam, electronics company, customer service, Pakistan",
    ogType: "website",
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with Alharam for all your electronics needs. We're here to help you find the perfect appliances for your home.",
    keywords: "contact Alharam, customer support, electronics help, Pakistan",
    ogType: "website",
  },
  blog: {
    title: "Blog",
    description: "Stay updated with the latest electronics trends, maintenance tips, and product guides from Alharam's expert team.",
    keywords: "electronics blog, maintenance tips, product guides, Alharam",
    ogType: "website",
  },
};

// Structured Data for different page types
export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
    },
    sameAs: [
      `https://facebook.com/${siteConfig.facebookAppId}`,
      `https://twitter.com/${siteConfig.twitterHandle}`,
    ],
  },
  
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  
  product: (productData) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: productData.name,
    description: productData.description,
    image: productData.image,
    sku: productData.sku,
    brand: {
      "@type": "Brand",
      name: productData.brand,
    },
    offers: {
      "@type": "Offer",
      price: productData.price,
      priceCurrency: "PKR",
      availability: productData.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    aggregateRating: productData.rating ? {
      "@type": "AggregateRating",
      ratingValue: productData.rating,
      reviewCount: productData.reviewCount,
    } : undefined,
  }),
  
  breadcrumb: (breadcrumbs) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  }),
};

// SEO utility functions
export const generateSEOProps = (pageType, customProps = {}) => {
  const baseSEO = pageSEO[pageType] || pageSEO.home;
  
  return {
    title: customProps.title || baseSEO.title,
    description: customProps.description || baseSEO.description,
    keywords: customProps.keywords || baseSEO.keywords,
    ogType: customProps.ogType || baseSEO.ogType,
    canonical: customProps.canonical || `${siteConfig.url}${customProps.path || ""}`,
    ogImage: customProps.ogImage || siteConfig.ogImage,
  };
};

export const generateStructuredData = (type, data = {}) => {
  if (type === "product" && data) {
    return structuredData.product(data);
  }
  if (type === "breadcrumb" && data) {
    return structuredData.breadcrumb(data);
  }
  return structuredData[type] || structuredData.website;
}; 