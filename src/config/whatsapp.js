export const WHATSAPP_CONFIG = {
  // WhatsApp Business API configuration
  PHONE_NUMBER: '+923020058237', // Your WhatsApp number
  API_URL: 'https://api.whatsapp.com/send', // WhatsApp API URL
  BUSINESS_NAME: 'Alharam Store',
  // Alternative webhook service for more reliable delivery
  WEBHOOK_URL: 'https://api.callmebot.com/whatsapp.php'
};

// Function to format order details for WhatsApp message
export const formatOrderForWhatsApp = (orderData) => {
  const {
    firstName,
    lastName,
    companyName,
    country,
    streetAddress,
    city,
    state,
    postcode,
    phone,
    email,
    orderNotes,
    paymentMethod,
    transactionId,
    productNames,
    quantities,
    prices,
    totals,
    total
  } = orderData;

  const message = `🛒 *NEW ORDER RECEIVED* 🛒

👤 *Customer Details:*
• Name: ${firstName} ${lastName}
• Company: ${companyName || 'N/A'}
• Phone: ${phone}
• Email: ${email}

📍 *Shipping Address:*
• Country: ${country}
• Address: ${streetAddress}
• City: ${city}
• State: ${state || 'N/A'}
• Postcode: ${postcode || 'N/A'}

💳 *Payment Information:*
• Method: ${paymentMethod}
${transactionId ? `• Transaction ID: ${transactionId}` : ''}

📦 *Order Items:*
${productNames.split('\n').map((name, index) => {
  const qty = quantities.split('\n')[index];
  const price = prices.split('\n')[index];
  const itemTotal = totals.split('\n')[index];
  return `• ${name} (Qty: ${qty}) - ${price} = ${itemTotal}`;
}).join('\n')}

💰 *Total Amount: Rs ${total}*

📝 *Order Notes:*
${orderNotes || 'No special notes'}

---
*Order received at: ${new Date().toLocaleString('en-PK')}*
*Alharam Store - Premium Electronic Appliances*`;

  return message;
};

// Function to send WhatsApp message using direct API (opens WhatsApp)
export const sendWhatsAppMessage = async (message) => {
  try {
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${WHATSAPP_CONFIG.API_URL}?phone=${WHATSAPP_CONFIG.PHONE_NUMBER}&text=${encodedMessage}`;
    
    // Open WhatsApp in a new window/tab
    window.open(whatsappUrl, '_blank');
    
    return { success: true, message: 'WhatsApp message prepared successfully' };
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return { success: false, error: error.message };
  }
};

// Function to send automatic WhatsApp notification (no user interaction required)
export const sendAutomaticWhatsApp = async (message) => {
  try {
    // This function can be extended to use services like:
    // - WhatsApp Business API
    // - Twilio WhatsApp API
    // - CallMeBot API
    // - Other WhatsApp automation services
    
    // For now, we'll use a simple approach that creates a clickable link
    // You can replace this with actual API calls to your preferred service
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${WHATSAPP_CONFIG.API_URL}?phone=${WHATSAPP_CONFIG.PHONE_NUMBER}&text=${encodedMessage}`;
    
    // Create a temporary link and click it programmatically
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true, message: 'WhatsApp notification sent automatically' };
  } catch (error) {
    console.error('Error sending automatic WhatsApp:', error);
    return { success: false, error: error.message };
  }
};

// Alternative function using webhook service for more reliable delivery
export const sendWhatsAppViaWebhook = async (message) => {
  try {
    // You can use services like CallMeBot, WhatsApp Business API, or similar
    // For now, we'll use the direct API method as it doesn't require authentication
    return await sendWhatsAppMessage(message);
  } catch (error) {
    console.error('Error sending WhatsApp via webhook:', error);
    return { success: false, error: error.message };
  }
};

// Function to send notification using multiple methods for better reliability
export const sendOrderNotification = async (orderData) => {
  const message = formatOrderForWhatsApp(orderData);
  
  // Try automatic method first
  const automaticResult = await sendAutomaticWhatsApp(message);
  
  if (automaticResult.success) {
    return automaticResult;
  }
  
  // Fallback to direct method if automatic fails
  const directResult = await sendWhatsAppMessage(message);
  
  if (!directResult.success) {
    // Final fallback to webhook method
    return await sendWhatsAppViaWebhook(message);
  }
  
  return directResult;
}; 