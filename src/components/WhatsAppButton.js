import React from 'react';
import '../assets/css/whatsapp-button.css';

const WhatsAppButton = () => {
  const phoneNumber = '923342743554'; // Without + or spaces
  const message = 'Hello Alharam! I would like to inquire about your mobile accessories and products.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <i className="fa fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppButton;

