import React from 'react';
import { Sparkles, Clock, MapPin, Bike, Flame } from 'lucide-react';
import { RESTAURANT_INFO, BRANCHES } from '../data/menuData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroBannerProps {
  onExploreDeals: () => void;
  onSelectBranch: (branchId: string) => void;
  currentBranchId: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreDeals,
  onSelectBranch,
  currentBranchId,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800 py-8 sm:py-12 px-4 sm:px-6">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-radial from-orange-600/15 via-amber-600/5 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Text */}
          <div className="max-w-2xl text-center lg:text-left">
            {/* Top Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>FEEL THE TASTE OF ROYALITY • SINCE 2020</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Authentic Chinese &amp; Asian Cuisine{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-300 to-orange-400">
                Delivered Hot &amp; Fresh
              </span>
            </h1>

            <p className="mt-3 text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
              From sizzling Chicken Chilli Dry and classic Manchurian to handcrafted dumplings and family feast combos. Order online and receive instant WhatsApp order slip confirmation!
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 mt-5 text-xs text-stone-300 font-medium">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900/80 border border-stone-800">
                <Bike className="w-3.5 h-3.5 text-orange-400" />
                <span>Fast Delivery in Islamabad</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900/80 border border-stone-800">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{RESTAURANT_INFO.openingHours}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900/80 border border-stone-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Kitchen Open for Orders</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6">
              <button
                type="button"
                onClick={onExploreDeals}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-950/40 active:scale-95 transition-all"
              >
                <Flame className="w-4 h-4" />
                <span>Explore Royal Deals</span>
              </button>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700/80 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>View on Maps</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-400 border border-emerald-500/40 transition-colors"
                title="Direct WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Quick Inquiry</span>
              </a>
            </div>
          </div>

          {/* Right Branch Selector Cards */}
          <div className="w-full lg:w-80 flex-shrink-0 bg-stone-950/90 border border-stone-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                Our 3 Islamabad Branches
              </span>
              <span className="text-[10px] text-amber-400 font-semibold uppercase">
                Active Selection
              </span>
            </div>

            <div className="space-y-2 mt-3">
              {BRANCHES.map((branch, idx) => {
                const isActive = currentBranchId === branch.id;
                return (
                  <button
                    key={branch.id}
                    type="button"
                    onClick={() => onSelectBranch(branch.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-orange-950/40 border-orange-500/80 ring-1 ring-orange-500/30'
                        : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-stone-800 text-stone-300 font-mono">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-stone-100">{branch.name}</h4>
                      </div>
                      <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                        {branch.address}
                      </p>
                    </div>

                    {/* WhatsApp Icon for branch */}
                    <a
                      href={`https://wa.me/${branch.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-colors flex-shrink-0"
                      title="Contact Branch via WhatsApp"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                    </a>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
