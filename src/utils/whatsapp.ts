import { CompletedOrder } from '../types/menu';

export const WHATSAPP_PHONE = '923198377511'; // 0319 8377511

export const formatOrderForWhatsApp = (order: CompletedOrder): string => {
  const dateFormatted = new Date().toLocaleString('en-PK', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const orderTypeLabel =
    order.customer.orderType === 'delivery'
      ? '🛵 Home Delivery'
      : order.customer.orderType === 'takeaway'
      ? '🛍️ Takeaway / Pickup'
      : '🍽️ Dine-in';

  const itemsList = order.items
    .map((cartItem, idx) => {
      const sizeStr = cartItem.selectedSize.label !== 'Standard' && cartItem.selectedSize.label !== 'Price'
        ? ` (${cartItem.selectedSize.label})`
        : '';
      const lineTotal = cartItem.selectedSize.price * cartItem.quantity;
      return `${idx + 1}. *${cartItem.item.name}*${sizeStr}\n   ▫️ Qty: ${cartItem.quantity} x Rs. ${cartItem.selectedSize.price.toLocaleString()} = Rs. ${lineTotal.toLocaleString()}`;
    })
    .join('\n\n');

  const text = `
🥢 *NEW ORDER - ZAP THOUNG CAFÉ*
━━━━━━━━━━━━━━━━━━━━━
📋 *Order ID:* #${order.orderNumber}
📅 *Date & Time:* ${dateFormatted}
🏛️ *Branch:* ${order.branch.name}
📍 *Branch Address:* ${order.branch.address}
🛵 *Order Mode:* ${orderTypeLabel}

👤 *CUSTOMER INFORMATION*
• *Name:* ${order.customer.customerName}
• *Phone:* ${order.customer.phone}
${order.customer.orderType === 'delivery' ? `• *Delivery Address:* ${order.customer.deliveryAddress}` : ''}
${order.customer.notes ? `• *Special Instructions:* ${order.customer.notes}` : ''}

🛒 *ORDERED ITEMS:*
━━━━━━━━━━━━━━━━━━━━━
${itemsList}

━━━━━━━━━━━━━━━━━━━━━
🧾 *BILLING SUMMARY*
• Subtotal: Rs. ${order.subtotal.toLocaleString()}
${order.deliveryFee > 0 ? `• Delivery Fee: Rs. ${order.deliveryFee.toLocaleString()}` : '• Delivery Fee: Free / Self-Pickup'}
${order.discount > 0 ? `• Discount: -Rs. ${order.discount.toLocaleString()}` : ''}
🔥 *GRAND TOTAL: Rs. ${order.total.toLocaleString()}*
💵 *Payment Method:* ${order.customer.paymentMethod.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━
✨ *Feel The Taste of Royalty*
Thank you for choosing Zap Thoung Café!
`.trim();

  return text;
};

export const getWhatsAppUrl = (message: string, phone: string = WHATSAPP_PHONE): string => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const openWhatsAppOrder = (order: CompletedOrder): void => {
  const message = formatOrderForWhatsApp(order);
  const targetPhone = order.branch.whatsapp || WHATSAPP_PHONE;
  const url = getWhatsAppUrl(message, targetPhone);
  window.open(url, '_blank', 'noopener,noreferrer');
};
