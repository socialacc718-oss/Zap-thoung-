import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Copy, Check, CheckCircle2, MapPin, Store } from 'lucide-react';
import { CompletedOrder } from '../types/menu';
import { WhatsAppIcon } from './WhatsAppIcon';
import { formatOrderForWhatsApp, openWhatsAppOrder } from '../utils/whatsapp';
import { ZapThoungLogo } from './ZapThoungLogo';

interface OrderSlipModalProps {
  order: CompletedOrder | null;
  onClose: () => void;
}

export const OrderSlipModal: React.FC<OrderSlipModalProps> = ({ order, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const handleCopy = () => {
    const text = formatOrderForWhatsApp(order);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppSend = () => {
    openWhatsAppOrder(order);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Top Status Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <div>
                <span className="text-sm font-bold block leading-tight">
                  Order Successfully Placed!
                </span>
                <span className="text-[11px] opacity-90">
                  Digital Slip Generated for Kitchen
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Printable Receipt Card Body */}
          <div className="p-4 sm:p-5 max-h-[72vh] overflow-y-auto">
            <div
              id="restaurant-slip"
              className="bg-white text-stone-900 p-5 rounded-xl shadow-inner font-sans border-t-4 border-orange-600 relative print:p-0 print:border-none"
            >
              {/* Slip Header */}
              <div className="text-center pb-4 border-b border-dashed border-stone-300">
                <div className="flex justify-center mb-1">
                  <ZapThoungLogo variant="compact" size="sm" />
                </div>
                <h4 className="text-base font-black tracking-tight text-stone-950 uppercase mt-1">
                  ZAP THOUNG CAFÉ
                </h4>
                <p className="text-[10px] font-serif uppercase tracking-widest text-orange-600 font-bold">
                  FEEL THE TASTE OF ROYALITY
                </p>
                <p className="text-[11px] text-stone-600 mt-1 font-medium">
                  {order.branch.name}
                </p>
                <p className="text-[10px] text-stone-500 leading-tight">
                  {order.branch.address}
                </p>
              </div>

              {/* Order Meta */}
              <div className="py-2.5 border-b border-dashed border-stone-300 text-[11px] text-stone-600 grid grid-cols-2 gap-y-1">
                <div>
                  <span className="text-stone-400 block text-[9px] uppercase">
                    Order Token
                  </span>
                  <span className="font-mono font-bold text-stone-900 text-xs">
                    #{order.orderNumber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 block text-[9px] uppercase">
                    Order Type
                  </span>
                  <span className="font-semibold text-orange-600 capitalize">
                    {order.customer.orderType === 'delivery' ? 'Home Delivery' : 'Takeaway / Pickup'}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[9px] uppercase">
                    Date & Time
                  </span>
                  <span className="font-mono text-stone-700 text-[10px]">
                    {order.timestamp}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 block text-[9px] uppercase">
                    Payment
                  </span>
                  <span className="font-semibold text-stone-900 text-[10px] uppercase">
                    {order.customer.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="py-2.5 border-b border-dashed border-stone-300 text-xs text-stone-700 space-y-0.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">Customer:</span>
                  <span className="font-bold text-stone-950">{order.customer.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Phone:</span>
                  <span className="font-mono text-stone-800">{order.customer.phone}</span>
                </div>
                {order.customer.orderType === 'delivery' && (
                  <div className="flex justify-between items-start gap-2 pt-0.5">
                    <span className="text-stone-500 flex-shrink-0">Address:</span>
                    <span className="font-medium text-stone-800 text-right leading-tight">
                      {order.customer.deliveryAddress}
                    </span>
                  </div>
                )}
                {order.customer.notes && (
                  <div className="flex justify-between items-start gap-2 pt-0.5 text-amber-700">
                    <span className="flex-shrink-0">Note:</span>
                    <span className="italic text-right text-[11px] leading-tight">
                      {order.customer.notes}
                    </span>
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div className="py-3 border-b border-dashed border-stone-300">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-stone-500 text-[10px] uppercase border-b border-stone-200">
                      <th className="text-left pb-1 font-semibold">Item & Size</th>
                      <th className="text-center pb-1 font-semibold">Qty</th>
                      <th className="text-right pb-1 font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {order.items.map((cartItem) => {
                      const lineTotal = cartItem.selectedSize.price * cartItem.quantity;
                      return (
                        <tr key={cartItem.cartItemId} className="py-1">
                          <td className="py-1.5 pr-2">
                            <span className="font-bold text-stone-900 block leading-tight">
                              {cartItem.item.name}
                            </span>
                            <span className="text-[10px] text-stone-500">
                              {cartItem.selectedSize.label} (@ Rs. {cartItem.selectedSize.price})
                            </span>
                          </td>
                          <td className="py-1.5 text-center font-mono font-medium text-stone-800">
                            {cartItem.quantity}
                          </td>
                          <td className="py-1.5 text-right font-mono font-bold text-stone-900">
                            Rs. {lineTotal.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Bill Totals */}
              <div className="py-2.5 border-b border-dashed border-stone-300 text-xs space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal:</span>
                  <span className="font-mono">Rs. {order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Charges:</span>
                  <span className="font-mono">
                    {order.deliveryFee > 0 ? `Rs. ${order.deliveryFee}` : 'FREE'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-stone-950 pt-1.5 border-t border-stone-200">
                  <span>GRAND TOTAL:</span>
                  <span className="font-mono text-orange-600">
                    Rs. {order.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Receipt Footer */}
              <div className="pt-3 text-center">
                <p className="text-[11px] font-bold text-stone-800">
                  *** Thank You For Ordering! ***
                </p>
                <p className="text-[10px] text-stone-500 mt-0.5">
                  Taste of Royalty • Prepared Fresh & Hot
                </p>

                {/* Decorative barcode bar */}
                <div className="mt-2.5 h-6 flex justify-center items-center gap-0.5 opacity-60">
                  {Array.from({ length: 38 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-black h-full"
                      style={{
                        width: `${(i % 3) + 1}px`,
                        marginRight: `${(i % 2) * 1.5}px`,
                      }}
                    />
                  ))}
                </div>
                <p className="text-[8px] font-mono tracking-widest text-stone-500 mt-0.5">
                  ZT-{order.orderNumber}-ISB
                </p>
              </div>
            </div>

            {/* Action Buttons Below Slip */}
            <div className="mt-4 space-y-2.5">
              {/* Send to WhatsApp Button (Highlighted as requested) */}
              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 active:scale-98 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current text-white flex-shrink-0" />
                <span>Send Slip to WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
                >
                  <Printer className="w-4 h-4 text-stone-400" />
                  <span>Print Slip</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-400" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>

              {/* View Restaurant Location link */}
              <a
                href={order.branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 text-xs text-amber-400/90 hover:text-amber-300 font-medium hover:underline text-center"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>View Branch Location on Google Maps</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
