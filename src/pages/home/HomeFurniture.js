import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import ProductSection from "../../wrappers/product/ProductSection";
import RecurringCountDown from "../../wrappers/countdown/RecurringCountDown";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconTwo";
import BannerSlider from "../../components/banner/BannerSlider";
import ShippingReturnsFeatures from "../../components/features/ShippingReturnsFeatures";
import LatestProductsSection from "../../wrappers/product/LatestProductsSection";
import VideoSection from "../../wrappers/video/VideoSection";

const HomeFurniture = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Alharam - Premium Electronics Store"
        description="Discover premium electronic appliances at Alharam. Quality AC, Freezer, and other electronic products for your home and business."
      />
      <LayoutOne headerTop="visible">
        {/* hero slider */}
       <BannerSlider/>
{/*      
       <BannerTwentySeven spaceTopClass="pt-80" spaceBottomClass="pb-60" /> */}
        {/* shipping and returns features */}
        <ShippingReturnsFeatures />

        {/* latest products section */}
        <LatestProductsSection 
          spaceTopClass="pt-5" 
          spaceBottomClass="pb-60" 
        />

        


        {/* mobile accessories section */}
        <ProductSection
          spaceBottomClass="pb-100"
          category="mobileaccessories"
          title="MOBILE ACCESSORIES"
        />
         {/* All In One Kit section */}
         <ProductSection
          spaceBottomClass="pb-100"
          category="allinonekit"
          title="ALL IN ONE KIT"
          backgroundClass="bg-brand"
          contentClass="content-black"
          sectionTitleSpaceClass="mt-40"
        />
        {/* OnlyCase section */}
        <br/>
        <ProductSection
          spaceBottomClass="pb-100"
          category="onlycase"
          title="ONLYCASE"
        />
        {/* OnlyGlass section */}
        <ProductSection
          spaceBottomClass="pb-100"
          category="onlyglass"
          title="ONLYGLASS"
        />
       
        {/* video section */}
        <VideoSection 
          spaceTopClass="pt-80" 
          spaceBottomClass="pb-80" 
        />
        <br/>

 {/* electronics section */}
 <ProductSection
          spaceBottomClass="pb-100"
          category="electronics"
          title="ELECTRONICS"
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
