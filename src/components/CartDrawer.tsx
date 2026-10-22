import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus, Bike, Store } from 'lucide-react';
import { CartItem, OrderType } from '../types/menu';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  orderType: OrderType;
  onOrderTypeChange: (type: OrderType) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  orderType,
  onOrderTypeChange,
  onProceedToCheckout,
}) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.selectedSize.price * item.quantity,
    0
  );
  const deliveryFee = orderType === 'delivery' ? (subtotal > 0 ? 150 : 0) : 0;
  const grandTotal = subtotal + deliveryFee;
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />

          {/* Cart Container - Fixed screen fit on mobile & desktop */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="relative w-full sm:max-w-md h-full bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col z-10 max-h-screen overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 sm:px-6 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    Your Order Cart
                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-600/30 text-orange-300 font-semibold border border-orange-500/30">
                      {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                    </span>
                  </h2>
                  <p className="text-[11px] text-stone-400">Zap Thoung Café • Taste of Royalty</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {items.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-stone-400 hover:text-red-400 px-2 py-1 rounded transition-colors"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Delivery Mode Toggle */}
            <div className="p-3 bg-stone-950/60 border-b border-stone-800/80 flex-shrink-0">
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-900 rounded-xl border border-stone-800">
                <button
                  type="button"
                  onClick={() => onOrderTypeChange('delivery')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    orderType === 'delivery'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Home Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOrderTypeChange('takeaway')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    orderType === 'takeaway'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Takeaway / Pickup</span>
                </button>
              </div>
            </div>

            {/* Scrollable Items List - Perfectly fitting without bleeding */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 overscroll-contain">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                  <div className="w-16 h-16 rounded-2xl bg-stone-800/60 flex items-center justify-center mb-3 text-stone-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-semibold text-stone-200">Your cart is empty</h3>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs">
                    Explore our Chinese gravies, chowmein, wings, and royal deals to add items.
                  </p>
                </div>
              ) : (
                items.map((cartItem) => {
                  const lineTotal = cartItem.selectedSize.price * cartItem.quantity;
                  return (
                    <div
                      key={cartItem.cartItemId}
                      className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 flex items-start gap-3 hover:border-stone-700 transition-colors"
                    >
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-stone-900"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-bold text-stone-100 truncate">
                            {cartItem.item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(cartItem.cartItemId)}
                            className="text-stone-500 hover:text-red-400 p-0.5"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Size tag */}
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[11px] px-1.5 py-0.2 rounded bg-stone-800 text-amber-300 font-medium">
                            {cartItem.selectedSize.label}
                          </span>
                          <span className="text-xs font-mono text-stone-400">
                            @ Rs. {cartItem.selectedSize.price.toLocaleString()}
                          </span>
                        </div>

                        {/* Quantity and Line Total */}
                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-800/50">
                          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)
                              }
                              className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white rounded hover:bg-stone-800 text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-stone-200">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white rounded hover:bg-stone-800 text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-white font-mono">
                              Rs. {lineTotal.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Sticky Bottom Order Summary */}
            {items.length > 0 && (
              <div className="p-4 bg-stone-950 border-t border-stone-800 flex-shrink-0 space-y-3">
                <div className="space-y-1.5 text-xs text-stone-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-stone-200 font-medium">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {orderType === 'delivery' ? 'Delivery Fee' : 'Takeaway / Pickup'}
                    </span>
                    <span className="font-mono text-stone-200 font-medium">
                      {orderType === 'delivery' ? `Rs. ${deliveryFee}` : 'FREE'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-stone-800">
                    <span className="text-stone-200">Grand Total</span>
                    <span className="text-orange-400 font-mono text-base">
                      Rs. {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onProceedToCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-950/50 active:scale-98 transition-all"
                >
                  <span>Checkout & Generate Slip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-center text-stone-400">
                  Instant slip will be generated & sent directly to restaurant WhatsApp!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
