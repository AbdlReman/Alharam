import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const VideoSection = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("video-area", spaceTopClass, spaceBottomClass)} style={{
      backgroundColor: "#ffffff",
      padding: "40px 20px",
      position: "relative"
    }}>
      <div 
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          borderRadius: "20px"
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
            borderRadius: "20px"
          }}
        >
          <source src="/assets/video/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)",
          pointerEvents: "none",
          borderRadius: "20px"
        }}></div>
      </div>
    </div>
  );
};

VideoSection.propTypes = {
  spaceTopClass: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default VideoSection;
