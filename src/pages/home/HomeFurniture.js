import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderTwentySeven from "../../wrappers/hero-slider/HeroSliderTwentySeven";
import BannerTwentySeven from "../../wrappers/banner/BannerTwentySeven";
import TabProductTwo from "../../wrappers/product/TabProductTwo";
import CountDownOne from "../../wrappers/countdown/CountDownOne";
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

        {/* tab product */}
        <TabProductTwo spaceBottomClass="pb-100" category="lingerie" />

        {/* countdown */}
        <CountDownOne
          spaceTopClass="pt-115"
          spaceBottomClass="pb-115"
          bgImg="/assets/img/bg/bg-1.jpg"
          dateTime="December 25, 2024 12:12:00"
        />

        {/* feature icon */}
        <FeatureIconTwo spaceTopClass="pt-100" spaceBottomClass="pb-60" />

      </LayoutOne>
    </Fragment>
  );
};

export default HomeFurniture;
