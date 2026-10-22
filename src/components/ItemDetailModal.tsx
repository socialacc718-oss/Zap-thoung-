import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Check, Flame, Sparkles } from 'lucide-react';
import { MenuItem, SizeOption } from '../types/menu';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, selectedSize: SizeOption, quantity: number) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(
    item ? item.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Sync state if item changes
  React.useEffect(() => {
    if (item) {
      setSelectedSize(item.sizes[0]);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [item]);

  if (!item || !selectedSize) return null;

  const handleAdd = () => {
    onAddToCart(item, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
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
          className="fixed inset-0 bg-black/80 backdrop-blur-xs"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="relative h-60 w-full overflow-hidden bg-stone-950">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

            <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
              {item.isPopular && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-600 text-white shadow-md">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  Popular
                </span>
              )}
              {item.isSpecial && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-stone-950 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  Special
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-900/90 text-orange-400 border border-orange-500/30">
                {item.category}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            <div>
              <h3 className="text-xl font-extrabold text-white">{item.name}</h3>
              <p className="mt-1 text-xs sm:text-sm text-stone-300 leading-relaxed">
                {item.description}
              </p>

              {item.dealItems && item.dealItems.length > 0 && (
                <div className="mt-3 p-3 rounded-xl bg-stone-950/80 border border-orange-500/20">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                    Included in Deal:
                  </p>
                  <ul className="text-xs text-stone-300 space-y-1">
                    {item.dealItems.map((di, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <span>{di}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Size Options */}
            {item.sizes.length > 1 && (
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-2">
                  Select Size / Portion:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {item.sizes.map((s) => (
                    <button
                      key={s.sizeKey}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        selectedSize.sizeKey === s.sizeKey
                          ? 'bg-orange-600 text-white border-orange-500 shadow-xs'
                          : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <span className="text-xs font-bold block">{s.label}</span>
                      <span className="text-xs font-mono opacity-90">
                        Rs. {s.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-stone-400 block uppercase">
                  Subtotal
                </span>
                <span className="text-xl font-black text-orange-400 font-mono">
                  Rs. {(selectedSize.price * quantity).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex items-center bg-stone-950 border border-stone-800 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-stone-300 hover:text-white rounded-lg hover:bg-stone-800 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-300 hover:text-white rounded-lg hover:bg-stone-800 text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={isAdded}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-950/40 active:scale-95 transition-all"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
