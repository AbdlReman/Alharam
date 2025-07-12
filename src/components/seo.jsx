import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = ({ title, titleTemplate, description }) => {
    // Ensure title and titleTemplate are strings with fallbacks
    const safeTitle = title || "Alharam";
    const safeTitleTemplate = titleTemplate || "Premium Ladies Undergarments";
    
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {safeTitle} | {safeTitleTemplate}
                </title>
                <meta name="description" content={description} />
            </Helmet>
        </HelmetProvider>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
    titleTemplate: PropTypes.string,
    description: PropTypes.string,
}

SEO.defaultProps = {
    title: "Alharam",
    titleTemplate: "Premium Electronics Store",
    description: "Alharam - Pakistan's premier electronics store. Shop premium quality AC, Freezer, and other electronic appliances for your home and business.",
};

export default SEO;