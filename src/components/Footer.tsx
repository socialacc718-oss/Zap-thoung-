import React from 'react';
import { MapPin, Clock, Phone, Heart } from 'lucide-react';
import { ZapThoungLogo } from './ZapThoungLogo';
import { RESTAURANT_INFO, BRANCHES } from '../data/menuData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onOpenMenuCards: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMenuCards }) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <ZapThoungLogo variant="full" size="md" />
            <p className="text-stone-400 text-xs leading-relaxed">
              Serving the authentic taste of Chinese delicacies and Asian gravies. Handcrafted with passion, royal ingredients, and delivered steaming hot.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                title="WhatsApp Us"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>
              <button
                type="button"
                onClick={onOpenMenuCards}
                className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-xs font-medium transition-colors"
              >
                View Menu Cards
              </button>
            </div>
          </div>

          {/* Col 2: Branches in Islamabad */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-400" />
              Our Branches
            </h4>
            <div className="space-y-2.5">
              {BRANCHES.map((b) => (
                <div key={b.id} className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800/80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-200">{b.name}</span>
                    <a
                      href={`https://wa.me/${b.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300"
                      title="Branch WhatsApp"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                    </a>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">{b.address}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Timings & Ordering */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Kitchen Timings
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li className="flex justify-between pb-1 border-b border-stone-800/60">
                <span className="text-stone-400">Monday - Sunday:</span>
                <span className="font-medium text-white">{RESTAURANT_INFO.openingHours}</span>
              </li>
              <li className="flex justify-between pb-1 border-b border-stone-800/60">
                <span className="text-stone-400">Delivery Coverage:</span>
                <span className="text-amber-400 font-medium">Islamabad & Surroundings</span>
              </li>
              <li className="flex justify-between pb-1 border-b border-stone-800/60">
                <span className="text-stone-400">Delivery Duration:</span>
                <span className="text-stone-200 font-mono">{RESTAURANT_INFO.minDeliveryTime}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-stone-400">Order Method:</span>
                <span className="text-emerald-400 font-medium">Online + WhatsApp Slip</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Location Map & Direct Directions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-500" />
              Find Us on Map
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Main Location: Near Pakeeza Cash &amp; Carry, Jinnah Garden Islamabad.
            </p>
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600/20 hover:bg-orange-600 text-orange-400 hover:text-white border border-orange-500/40 transition-all font-semibold"
            >
              <MapPin className="w-4 h-4" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-[11px]">
          <p>© {new Date().getFullYear()} ZAP THOUNG CAFÉ. All Rights Reserved. Feel The Taste of Royalty.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for authentic Chinese dining experience</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
