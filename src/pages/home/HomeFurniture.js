import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderTwentySeven from "../../wrappers/hero-slider/HeroSliderTwentySeven";
import BannerTwentySeven from "../../wrappers/banner/BannerTwentySeven";
import ProductSection from "../../wrappers/product/ProductSection";
import RecurringCountDown from "../../wrappers/countdown/RecurringCountDown";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconTwo";

const HomeFurniture = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Alharam - Premium Electronics Store"
        description="Discover premium electronic appliances at Alharam. Quality AC, Freezer, and other electronic products for your home and business."
      />
      <LayoutOne headerTop="visible">
        {/* hero slider */}
        <HeroSliderTwentySeven />

        {/* banner */}
        <BannerTwentySeven spaceTopClass="pt-80" spaceBottomClass="pb-60" />

        {/* mobile accessories section */}
        <ProductSection
          spaceBottomClass="pb-100"
          category="mobileaccessories"
          title="MOBILE ACCESSORIES"
        />

 {/* electronics section */}
 <ProductSection
          spaceBottomClass="pb-100"
          category="electronics"
          title="ELECTRONICS"
        />
        
        {/* cosmetics section */}
        <ProductSection
          spaceBottomClass="pb-100"
          category="cosmetic"
          title="COSMETICS"
        />

       

        {/* countdown */}
        <RecurringCountDown
          spaceTopClass="pt-115"
          spaceBottomClass="pb-115"
          bgImg="/assets/img/bg/bg.png"
          cycleDays={10}
        />

        {/* feature icon */}
        <FeatureIconTwo spaceTopClass="pt-100" spaceBottomClass="pb-60" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFurniture;
