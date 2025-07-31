import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = ({ 
    title, 
    titleTemplate, 
    description, 
    keywords,
    canonical,
    ogImage,
    ogType = "website",
    twitterCard = "summary_large_image"
}) => {
    // Ensure title and titleTemplate are strings with fallbacks
    const safeTitle = title || "Alharam";
    const safeTitleTemplate = titleTemplate || "Premium Electronics Store";
    const safeDescription = description || "Alharam - Pakistan's premier electronics store. Shop premium quality AC, Freezer, and other electronic appliances for your home and business.";
    const safeKeywords = keywords || "electronics, AC, freezer, appliances, Pakistan, Alharam, home appliances, air conditioning";
    const safeCanonical = canonical || window.location.href;
    const safeOgImage = ogImage || "/logo.png";
    
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {safeTitle} | {safeTitleTemplate}
                </title>
                <meta name="description" content={safeDescription} />
                <meta name="keywords" content={safeKeywords} />
                <link rel="canonical" href={safeCanonical} />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content={ogType} />
                <meta property="og:url" content={safeCanonical} />
                <meta property="og:title" content={`${safeTitle} | ${safeTitleTemplate}`} />
                <meta property="og:description" content={safeDescription} />
                <meta property="og:image" content={safeOgImage} />
                <meta property="og:site_name" content="Alharam" />
                <meta property="og:locale" content="en_US" />
                
                {/* Twitter */}
                <meta property="twitter:card" content={twitterCard} />
                <meta property="twitter:url" content={safeCanonical} />
                <meta property="twitter:title" content={`${safeTitle} | ${safeTitleTemplate}`} />
                <meta property="twitter:description" content={safeDescription} />
                <meta property="twitter:image" content={safeOgImage} />
                
                {/* Additional SEO meta tags */}
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Alharam" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                
                {/* Structured Data for Organization */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Alharam",
                        "url": "https://yourdomain.com",
                        "logo": "https://yourdomain.com/logo.png",
                        "description": safeDescription,
                        "address": {
                            "@type": "PostalAddress",
                            "addressCountry": "PK"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "customer service"
                        }
                    })}
                </script>
            </Helmet>
        </HelmetProvider>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
    titleTemplate: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    canonical: PropTypes.string,
    ogImage: PropTypes.string,
    ogType: PropTypes.string,
    twitterCard: PropTypes.string,
}

SEO.defaultProps = {
    title: "Alharam",
    titleTemplate: "Premium Electronics Store",
    description: "Alharam - Pakistan's premier electronics store. Shop premium quality AC, Freezer, and other electronic appliances for your home and business.",
    keywords: "electronics, AC, freezer, appliances, Pakistan, Alharam, home appliances, air conditioning",
};

export default SEO;