import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Check, Sparkles, Flame, Eye } from 'lucide-react';
import { MenuItem, SizeOption } from '../types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  onAddToCart: (item: MenuItem, selectedSize: SizeOption, quantity: number) => void;
  onQuickView?: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  index,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState<SizeOption>(item.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(item, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
    }, 1200);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.04, 0.4),
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative flex flex-col bg-stone-900/90 border border-stone-800 hover:border-orange-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-950/20 transition-all duration-300"
    >
      {/* Image container */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-stone-950">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {item.isPopular && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-600 text-white shadow-md">
              <Flame className="w-3.5 h-3.5 fill-current" />
              Popular
            </span>
          )}
          {item.isSpecial && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 shadow-md">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Special
            </span>
          )}
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-stone-900/80 text-stone-300 backdrop-blur-md border border-stone-700/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(item)}
            className="absolute top-3 right-3 p-2 rounded-full bg-stone-950/60 hover:bg-orange-600 text-stone-300 hover:text-white backdrop-blur-md transition-colors"
            title="Quick details"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Category Tag bottom corner */}
        <div className="absolute bottom-2 left-3 text-[11px] font-semibold tracking-wide text-orange-400 uppercase">
          {item.category}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col p-4 sm:p-5">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-stone-100 group-hover:text-orange-400 transition-colors">
            {item.name}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-stone-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Deal items list if combo/deal */}
          {item.dealItems && item.dealItems.length > 0 && (
            <div className="mt-2.5 p-2 rounded-lg bg-stone-950/70 border border-orange-500/20">
              <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
                Included in this Feast:
              </p>
              <ul className="text-xs text-stone-300 space-y-0.5">
                {item.dealItems.map((dealItem, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    <span className="line-clamp-1">{dealItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Portion / Size Selector (if multiple options available) */}
        {item.sizes.length > 1 && (
          <div className="mt-3.5 pt-3 border-t border-stone-800">
            <span className="text-[11px] font-medium text-stone-400 block mb-1.5">
              Select Size / Portion:
            </span>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5">
              {item.sizes.map((s) => {
                const isActive = selectedSize.sizeKey === s.sizeKey;
                return (
                  <button
                    key={s.sizeKey}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left sm:text-center ${
                      isActive
                        ? 'bg-orange-600 text-white shadow-xs font-semibold'
                        : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border border-stone-700/50'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="block text-[10px] opacity-80 font-mono">
                      Rs. {s.price.toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer: Price & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
              Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-orange-400">Rs.</span>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {selectedSize.price.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quantity controls */}
            <div className="flex items-center bg-stone-950 border border-stone-800 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-white rounded hover:bg-stone-800 text-sm font-bold"
              >
                -
              </button>
              <span className="w-6 text-center text-xs font-bold text-stone-200">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-white rounded hover:bg-stone-800 text-sm font-bold"
              >
                +
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={isAdded}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
