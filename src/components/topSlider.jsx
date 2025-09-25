import React, { useEffect, useMemo, useState } from "react";

const SLIDE_INTERVAL_MS = 4000;

function TopSlider() {
  const slides = useMemo(
    () => [
      "Free shipping all Pakistan",
      "Welcome to Alharam Store",
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <div
      role="region"
      aria-label="Store announcements"
      style={{
        width: "100%",
        backgroundColor: "#B79346",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 40,
          position: "relative",
        }}
      >
        {slides.map((text, index) => (
          <div
            key={index}
            aria-hidden={activeIndex !== index}
            style={{
              position: activeIndex === index ? "relative" : "absolute",
              opacity: activeIndex === index ? 1 : 0,
              transition: "opacity 400ms ease-in-out",
              whiteSpace: "nowrap",
              fontWeight: 600,
              letterSpacing: 0.3,
              lineHeight: "40px",
            }}
          >
            {text}
          </div>
        ))}

        {/* Left Arrow */}
        <button
          type="button"
          aria-label="Previous announcement"
          onClick={() =>
            setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
          }
          style={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            color: "#fff",
            border: 0,
            padding: 0,
            fontSize: 28,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </button>

        {/* Right Arrow */}
        <button
          type="button"
          aria-label="Next announcement"
          onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            color: "#fff",
            border: 0,
            padding: 0,
            fontSize: 28,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default TopSlider;


