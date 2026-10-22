import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, MapPin, CreditCard, FileText, ArrowRight, ShieldCheck, Store } from 'lucide-react';
import { CartItem, CustomerOrderDetails, OrderType } from '../types/menu';
import { BRANCHES } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderType: OrderType;
  onConfirmOrder: (customer: CustomerOrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  orderType,
  onConfirmOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState(BRANCHES[0].id);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'jazzcash' | 'easypaisa' | 'bank_transfer'>('cash');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const subtotal = items.reduce(
    (sum, item) => sum + item.selectedSize.price * item.quantity,
    0
  );
  const deliveryFee = orderType === 'delivery' ? (subtotal > 0 ? 150 : 0) : 0;
  const grandTotal = subtotal + deliveryFee;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!customerName.trim()) newErrors.customerName = 'Please enter your name';
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your mobile number';
    } else if (phone.trim().length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Please enter complete delivery address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onConfirmOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      orderType,
      branchId: selectedBranchId,
      deliveryAddress: deliveryAddress.trim(),
      notes: notes.trim(),
      paymentMethod,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Checkout & Place Order
                </h3>
                <p className="text-xs text-stone-400">
                  {orderType === 'delivery' ? 'Home Delivery Details' : 'Takeaway / Pickup Details'}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Select Branch */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1.5">
                  <Store className="w-3.5 h-3.5 text-orange-400" />
                  Select Nearby Branch:
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-100 focus:outline-hidden focus:border-orange-500"
                >
                  {BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.area})
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1.5">
                    <User className="w-3.5 h-3.5 text-orange-400" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (errors.customerName) setErrors({ ...errors, customerName: '' });
                    }}
                    placeholder="e.g. Ali Ahmed"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-orange-500"
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1.5">
                    <Phone className="w-3.5 h-3.5 text-orange-400" />
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="0300-1234567"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-orange-500 font-mono"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Delivery Address (if Delivery) */}
              {orderType === 'delivery' && (
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    Complete Delivery Address *
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => {
                      setDeliveryAddress(e.target.value);
                      if (errors.deliveryAddress) setErrors({ ...errors, deliveryAddress: '' });
                    }}
                    placeholder="House/Flat #, Street #, Sector / Colony, Landmark"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-orange-500"
                  />
                  {errors.deliveryAddress && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.deliveryAddress}</p>
                  )}
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-orange-400" />
                  Payment Method:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'cash', label: 'Cash on Delivery' },
                    { id: 'jazzcash', label: 'JazzCash' },
                    { id: 'easypaisa', label: 'EasyPaisa' },
                    { id: 'bank_transfer', label: 'Bank Transfer' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        paymentMethod === pm.id
                          ? 'bg-orange-600 text-white border-orange-500 shadow-xs'
                          : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 mb-1.5">
                  <FileText className="w-3.5 h-3.5 text-stone-400" />
                  Special Instructions / Taste Preferences (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra spicy, less oil, include extra cutlery"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-orange-500"
                />
              </div>

              {/* Mini Order Summary */}
              <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Selected Items ({items.length})</span>
                  <span className="font-mono text-stone-300">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Delivery Charges</span>
                  <span className="font-mono text-stone-300">
                    {orderType === 'delivery' ? `Rs. ${deliveryFee}` : 'Free (Takeaway)'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1.5 border-t border-stone-800">
                  <span>Total Amount</span>
                  <span className="text-orange-400 font-mono">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-950/50 active:scale-98 transition-all"
              >
                <span>Confirm & Generate WhatsApp Slip</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct dispatch to Zap Thoung Café kitchen</span>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
