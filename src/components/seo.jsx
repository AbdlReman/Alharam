import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = ({ 
  title, 
  titleTemplate, 
  description, 
  keywords,
  ogTitle,
  ogDescription,
  ogType = "website",
  ogUrl,
  ogImage = "https://www.alharam.store/logo.png",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  canonical,
  robots = "index, follow",
  pageType = "website"
}) => {
  // Ensure title and titleTemplate are strings with fallbacks
  const safeTitle = title || "Alharam - Mobile Accessories, Glass Protectors & Electronics";
  const safeTitleTemplate = titleTemplate || "Alharam | www.alharam.store";
  const safeDescription = description || "Alharam is Pakistan's premier destination for mobile accessories. Shop premium mobile glass protectors, all-in-one mobile kits, stylish mobile covers, and quality electronics. Fast delivery nationwide.";
  const safeKeywords = keywords || "Alharam, mobile accessories, mobile glass, screen protector, tempered glass, mobile cover, all in one kit, mobile case, chargers, electronics, AC, freezer, Pakistan, alharam.store";
  const safeCanonical = canonical || "https://www.alharam.store/";
  
  // Structured Data for Organization
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alharam",
    "alternateName": "Alharam Store Pakistan",
    "url": "https://www.alharam.store",
    "logo": "https://www.alharam.store/logo.png",
    "description": "Pakistan's premier destination for mobile accessories including glass protectors, all-in-one kits, mobile covers, and quality electronics",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Pakistan"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+923342743554",
      "email": "info@alharam.store"
    },
    "sameAs": [
      "https://www.facebook.com/alharam.store",
      "https://www.instagram.com/alharam.store",
      "https://www.twitter.com/alharam.store"
    ]
  };

  // Structured Data for Website
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Alharam",
    "url": "https://www.alharam.store",
    "description": "Premium mobile accessories, glass protectors, mobile covers, all-in-one kits, and quality electronics",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.alharam.store/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Structured Data for BreadcrumbList
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.alharam.store"
      }
    ]
  };

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {safeTitle} | {safeTitleTemplate}
        </title>
        
        {/* Meta Tags */}
        <meta name="description" content={safeDescription} />
        <meta name="keywords" content={safeKeywords} />
        <meta name="author" content="Alharam" />
        <meta name="robots" content={robots} />
        
        {/* Open Graph */}
        <meta property="og:title" content={ogTitle || safeTitle} />
        <meta property="og:description" content={ogDescription || safeDescription} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={ogUrl || safeCanonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Alharam" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:title" content={twitterTitle || safeTitle} />
        <meta name="twitter:description" content={twitterDescription || safeDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@alharam.store" />
        
        {/* Canonical Tag */}
        <link rel="canonical" href={safeCanonical} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="geo.region" content="PK" />
        <meta name="geo.country" content="Pakistan" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData)
          }}
        />
      </Helmet>
    </HelmetProvider>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  titleTemplate: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogType: PropTypes.string,
  ogUrl: PropTypes.string,
  ogImage: PropTypes.string,
  twitterCard: PropTypes.string,
  twitterTitle: PropTypes.string,
  twitterDescription: PropTypes.string,
  canonical: PropTypes.string,
  robots: PropTypes.string,
  pageType: PropTypes.string,
}

SEO.defaultProps = {
  title: "Alharam - Mobile Accessories, Glass Protectors & Electronics",
  titleTemplate: "Alharam | www.alharam.store",
  description: "Alharam is Pakistan's premier destination for mobile accessories. Shop premium mobile glass protectors, all-in-one mobile kits, stylish mobile covers, and quality electronics. Fast delivery nationwide.",
  keywords: "Alharam, mobile accessories, mobile glass, screen protector, tempered glass, mobile cover, all in one kit, mobile case, chargers, electronics, AC, freezer, Pakistan, alharam.store",
  ogType: "website",
  ogImage: "https://www.alharam.store/logo.png",
  twitterCard: "summary_large_image",
  robots: "index, follow",
  pageType: "website"
};

export default SEO;