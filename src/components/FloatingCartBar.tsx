import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/menu';

interface FloatingCartBarProps {
  items: CartItem[];
  onOpenCart: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({ items, onOpenCart }) => {
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.selectedSize.price * item.quantity,
    0
  );

  if (totalCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="fixed bottom-4 inset-x-3 sm:hidden z-40"
      >
        <button
          type="button"
          onClick={onOpenCart}
          className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white rounded-2xl shadow-2xl shadow-black/80 border border-orange-400/40 active:scale-98 transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black/25 flex items-center justify-center font-bold text-sm">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold block leading-tight">
                {totalCount} {totalCount === 1 ? 'Item' : 'Items'} in Cart
              </span>
              <span className="text-[11px] text-amber-200 font-mono font-medium">
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-black bg-black/30 px-3 py-1.5 rounded-xl border border-white/20">
            <span>View Cart</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
