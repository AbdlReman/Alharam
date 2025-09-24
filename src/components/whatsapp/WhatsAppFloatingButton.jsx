import React from "react";
import { WHATSAPP_CONFIG } from "../../config/whatsapp";

const buttonStyle = {
  position: "fixed",
  right: "22px",
  bottom: "22px",
  width: "56px",
  height: "56px",
  background: "transparent",
  boxShadow: "none",
  border: "none",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  cursor: "pointer",
};

const imgStyle = {
  width: "56px",
  height: "56px",
  display: "block",
};

const WhatsAppFloatingButton = () => {
  const phone = WHATSAPP_CONFIG?.PRIMARY_PHONE || (WHATSAPP_CONFIG?.PHONE_NUMBERS?.[0] || "");

  const handleClick = () => {
    if (!phone) return;
    const url = `${WHATSAPP_CONFIG.API_URL}?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent("Hello! I have a query.")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!phone) return null;

  return (
    <button aria-label="Contact on WhatsApp" type="button" onClick={handleClick} style={buttonStyle}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        style={imgStyle}
      />
    </button>
  );
};

export default WhatsAppFloatingButton;


