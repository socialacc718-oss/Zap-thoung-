import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Download } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface OriginalMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalMenuModal: React.FC<OriginalMenuModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Zap Thoung Official Menu Cards</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-600/30 text-orange-400 font-semibold border border-orange-500/30">
                  Original Print
                </span>
              </h3>
              <p className="text-[11px] text-stone-400">
                Direct scanned physical menu cards from restaurant
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={RESTAURANT_INFO.menuImages[activeTab].url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                title="Open image in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="px-4 py-2 bg-stone-950/70 border-b border-stone-800/80 flex items-center gap-2">
            {RESTAURANT_INFO.menuImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === idx
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                Page {idx + 1}: {img.title}
              </button>
            ))}
          </div>

          {/* Image Viewport */}
          <div className="flex-1 overflow-auto p-2 sm:p-4 bg-stone-950 flex items-center justify-center">
            <img
              src={RESTAURANT_INFO.menuImages[activeTab].url}
              alt={RESTAURANT_INFO.menuImages[activeTab].title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-xl border border-stone-800"
            />
          </div>

          {/* Footer note */}
          <div className="px-4 py-2.5 bg-stone-950 border-t border-stone-800 text-center text-xs text-stone-400 flex items-center justify-between">
            <span>All items, combos and prices on this website are 100% matched to this menu.</span>
            <button
              onClick={() => setActiveTab(activeTab === 0 ? 1 : 0)}
              className="text-orange-400 hover:underline text-xs font-medium"
            >
              Switch to {activeTab === 0 ? 'Page 2' : 'Page 1'} →
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
