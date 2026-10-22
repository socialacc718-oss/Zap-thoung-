import React from 'react';

interface ZapThoungLogoProps {
  variant?: 'full' | 'compact' | 'navbar' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ZapThoungLogo: React.FC<ZapThoungLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
}) => {
  const getScale = () => {
    switch (size) {
      case 'sm':
        return 'scale-90 origin-left';
      case 'lg':
        return 'scale-110';
      case 'xl':
        return 'scale-125';
      default:
        return 'scale-100';
    }
  };

  // The authentic bowl + chopsticks icon exactly from the menu
  const renderBowlIcon = (iconSize = 'w-10 h-10') => (
    <div className={`relative ${iconSize} flex-shrink-0 flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Chopstick (Grey/White) */}
        <line
          x1="22"
          y1="8"
          x2="52"
          y2="68"
          stroke="#e2e8f0"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Right Chopstick (Orange accent) */}
        <line
          x1="38"
          y1="8"
          x2="90"
          y2="52"
          stroke="#ea580c"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* White Bowl Body */}
        <path
          d="M24 38 Q50 35 76 38 C72 65 64 78 50 80 C36 78 28 65 24 38 Z"
          fill="#f8fafc"
          stroke="#1e293b"
          strokeWidth="2.5"
        />
        {/* Bowl Rim Highlight */}
        <ellipse cx="50" cy="38" rx="26" ry="6" fill="#f1f5f9" />
        {/* Inner Bowl Shadow / Steam */}
        <path
          d="M32 40 Q50 44 68 40"
          stroke="#ea580c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{renderBowlIcon()}</div>;
  }

  // Dedicated Navbar variant for mobile and desktop top navigation bar
  if (variant === 'navbar' || variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 sm:gap-2.5 flex-shrink-0 select-none whitespace-nowrap ${className}`}>
        {/* Bowl Icon with glow */}
        <div className="relative flex-shrink-0 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-xl blur-xs opacity-50 group-hover:opacity-80 transition duration-300" />
          <div className="relative bg-stone-900 border border-orange-500/40 rounded-xl p-0.5 shadow-inner">
            {renderBowlIcon('w-8 h-8 sm:w-9 sm:h-9')}
          </div>
        </div>

        {/* Text Container - strictly single-line, perfectly balanced */}
        <div className="flex flex-col justify-center leading-tight whitespace-nowrap">
          <div className="flex items-baseline gap-1 whitespace-nowrap">
            <span className="royal-text-animated text-[15px] sm:text-lg font-black tracking-tight drop-shadow-sm">
              ZAP THOUNG
            </span>
            <span className="text-white font-serif font-bold italic text-xs sm:text-base tracking-wide">
              Café
            </span>
          </div>

          <div className="flex items-center gap-1.5 whitespace-nowrap mt-0.5">
            <span className="text-[8px] sm:text-[9px] px-1 py-0.2 rounded bg-orange-950/90 border border-orange-500/40 text-amber-300 font-bold tracking-tight">
              饮食
            </span>
            <span className="text-[8px] sm:text-[9px] font-serif font-bold uppercase tracking-[0.14em] text-amber-300/90">
              Taste of Royalty
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Full Hero & Footer variant
  return (
    <div className={`flex items-center gap-3.5 select-none whitespace-nowrap ${getScale()} ${className}`}>
      {/* Bowl Icon with glow */}
      <div className="relative group flex-shrink-0">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-500 rounded-2xl blur-xs opacity-40 group-hover:opacity-75 transition duration-300" />
        <div className="relative bg-stone-900 border border-orange-500/40 rounded-2xl p-1 shadow-inner">
          {renderBowlIcon('w-12 h-12')}
        </div>
      </div>

      {/* Brand Text & Royalty Tagline */}
      <div className="flex flex-col justify-center whitespace-nowrap">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="royal-text-animated text-xl sm:text-2xl font-black tracking-tight drop-shadow-[0_2px_8px_rgba(234,88,12,0.4)]">
              ZAP THOUNG
            </span>
            <span className="text-white font-serif font-bold text-lg sm:text-xl tracking-wide">
              Café
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-950/70 text-orange-300 border border-orange-500/30 font-semibold">
            Since 2020
          </span>
        </div>

        {/* Chinese Seal and Royalty Slogan */}
        <div className="flex items-center gap-2 mt-0.5 whitespace-nowrap">
          {/* Chinese 饮食 Seal */}
          <div className="px-1.5 py-0.2 rounded bg-stone-900 border border-orange-500/80 flex items-center justify-center shadow-xs">
            <span className="text-amber-400 text-[10px] font-bold tracking-tight">
              饮食
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-serif font-bold uppercase tracking-[0.16em] text-amber-300/95 drop-shadow-xs">
            FEEL THE TASTE OF ROYALITY
          </span>
        </div>
      </div>
    </div>
  );
};
