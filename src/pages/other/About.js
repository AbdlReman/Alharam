import { Fragment } from "react"; 
import { useLocation } from "react-router-dom"; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import AboutContent from "../../components/section-title/AboutContent";
import BannerOne from "../../wrappers/banner/BannerOne";
import TextGridOne from "../../wrappers/text-grid/TextGridOne";
import FunFactOne from "../../wrappers/fun-fact/FunFactOne";
import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";

const About = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="About Us – Alharam"
        title="About Alharam - Pakistan's Premier Mobile Accessories Store"
        description="Learn about Alharam's story, values, and commitment to providing premium mobile accessories, glass protectors, all-in-one kits, mobile covers, and electronic appliances across Pakistan."
        keywords="Alharam, about us, mobile accessories, mobile glass, screen protectors, mobile covers, all in one kits, mobile cases, AC units, freezers, electronics, Pakistan"
      /> 
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "About Us", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />

        {/* section title with text */}
        <SectionTitleWithText
          spaceTopClass="pt-100"
          spaceBottomClass="pb-95"
          title="About Us"
          description={
            "Welcome to Alharam – Pakistan's premier destination for mobile accessories and premium electronics. We specialize in high-quality mobile glass protectors, all-in-one mobile kits, stylish mobile covers, and a wide range of mobile accessories. We also offer premium electronic appliances including AC units and freezers, delivering quality and reliability across Pakistan."
          }
        />

        {/* about content */}
        <AboutContent />

        <div className="container pt-30 pb-30">
          <div className="row">
            <div className="col-12">
              <h3 className="mb-20">Our Journey</h3>
              <p>
                Our journey began with a vision to provide Pakistan's mobile users with the best accessories and protection for their devices. What started as a passion for mobile technology has evolved into a trusted destination for premium mobile accessories, from tempered glass protectors and all-in-one mobile kits to stylish covers and essential gadgets. We've expanded to include quality electronic appliances, ensuring customers from Karachi to Islamabad receive the finest products with fast delivery and exceptional service.
              </p>
              <h3 className="mb-20 mt-30">Our Specialization</h3>
              <p>
                <strong>Mobile Accessories Excellence:</strong> We specialize in comprehensive mobile protection and enhancement solutions:
              </p>
              <ul style={{ paddingLeft: 18 }}>
                <li><strong>Mobile Glass Protectors</strong> – Premium tempered glass and screen protectors for all major brands</li>
                <li><strong>All-in-One Mobile Kits</strong> – Complete protection packages including glass, cover, and accessories</li>
                <li><strong>Mobile Covers & Cases</strong> – Stylish and durable covers for every style and device</li>
                <li><strong>Mobile Accessories</strong> – Chargers, cables, earphones, power banks, and more</li>
                <li><strong>Electronic Appliances</strong> – Quality AC units, freezers, and home appliances</li>
              </ul>
              <h3 className="mb-20 mt-30">Why Choose Alharam</h3>
              <p>
                We're not just selling products — we're protecting your investment and enhancing your mobile experience. Every item in our collection is carefully selected, tested for quality and durability, and backed by our commitment to customer satisfaction. From the latest smartphone accessories to reliable home appliances, we ensure you get genuine products at competitive prices.
              </p>
              <h3 className="mb-20 mt-30">Our Promise</h3>
              <ul style={{ paddingLeft: 18 }}>
                <li>Premium Quality – Genuine products with quality guarantee</li>
                <li>Wide Selection – Everything for your mobile and home electronics needs</li>
                <li>Affordable Prices – Best value for premium products</li>
                <li>Nationwide Delivery – Fast, reliable shipping across Pakistan</li>
                <li>Expert Support – Knowledgeable customer service team</li>
                <li>Customer Satisfaction – Your trust is our top priority</li>
              </ul>
              <h3 className="mb-20 mt-30">Why Choose Alharam.store</h3>
              <p>
                At Alharam, we're creating more than just an online store — we're building a brand you can trust for all your mobile accessories and electronics needs. Whether you're looking for the perfect screen protector, a complete mobile kit, a stylish cover, or quality home appliances, you'll find genuine products, competitive prices, and exceptional service at www.alharam.store. Your device deserves the best protection, and your home deserves quality appliances — we deliver both.
              </p>
              
            </div>
          </div>
        </div>

        {/* banner */}
        {/* <BannerOne spaceBottomClass="pb-70" /> */}

         {/* fun fact */}
         <FunFactOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-70"
          bgClass="bg-gray-3"
        />


        {/* text grid */}
        <TextGridOne spaceBottomClass="pb-70 pt-100 " />

       
        {/* team member */}
        {/* <TeamMemberOne spaceTopClass="pt-95" spaceBottomClass="pb-70" /> */}

        {/* brand logo slider */}
        {/* <BrandLogoSliderOne spaceBottomClass="pb-70" /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default About;
