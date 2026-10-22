import React from 'react';
import { ShoppingBag, MapPin, BookOpen } from 'lucide-react';
import { ZapThoungLogo } from './ZapThoungLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { RESTAURANT_INFO } from '../data/menuData';

interface NavbarProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenMenuImages: () => void;
  selectedBranchName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  cartTotal,
  onOpenCart,
  onOpenMenuImages,
  selectedBranchName,
}) => {
  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      'Assalam-o-Alaikum Zap Thoung Café! I want to inquire about menu and place an order.'
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappIntl}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <ZapThoungLogo variant="navbar" />
        </div>

        {/* Center / Branch & Menu Badges (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-900 border border-stone-800 hover:border-orange-500/50 text-stone-300 hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span className="truncate max-w-[180px]">{selectedBranchName}</span>
          </a>

          <button
            type="button"
            onClick={onOpenMenuImages}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-amber-300/90 hover:text-amber-200 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Original Menu Card</span>
          </button>
        </div>

        {/* Right Actions: WhatsApp Icon + Cart */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          {/* Menu button for mobile */}
          <button
            type="button"
            onClick={onOpenMenuImages}
            className="flex lg:hidden p-2 rounded-xl bg-stone-900 border border-stone-800 text-amber-300/90 hover:text-white transition-colors"
            title="View Original Menu Card"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Clean WhatsApp Icon Button - NO ugly raw phone text, just clean icon */}
          <button
            type="button"
            onClick={handleDirectWhatsApp}
            className="group relative flex items-center justify-center p-2.5 sm:px-3 sm:py-2 rounded-xl bg-emerald-600/15 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 hover:border-emerald-500 transition-all shadow-xs"
            title="Chat on WhatsApp"
            aria-label="Contact on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <span className="hidden md:inline-block ml-1.5 text-xs font-bold">
              WhatsApp
            </span>
          </button>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-950/40 active:scale-95 transition-all"
            aria-label="Open Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-stone-950 text-white text-[10px] font-mono font-black flex items-center justify-center border border-orange-400 shadow-xs animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </div>

            <span className="hidden sm:inline font-mono">
              {cartTotal > 0 ? `Rs. ${cartTotal.toLocaleString()}` : 'Cart'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
