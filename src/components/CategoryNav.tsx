import React from 'react';
import { Category } from '../types/menu';
import { Flame, UtensilsCrossed, Sparkles, Soup, Coffee, Layers, Wheat, Zap, LayoutGrid } from 'lucide-react';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalItemsCount: number;
}

const getCategoryIcon = (iconName: string, className = 'w-4 h-4') => {
  switch (iconName) {
    case 'Flame':
      return <Flame className={className} />;
    case 'UtensilsCrossed':
      return <UtensilsCrossed className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Soup':
      return <Soup className={className} />;
    case 'Coffee':
      return <Coffee className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Wheat':
      return <Wheat className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    default:
      return <UtensilsCrossed className={className} />;
  }
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalItemsCount,
}) => {
  return (
    <div className="sticky top-16 z-30 bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 py-2.5 px-3 sm:px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Horizontal Category Scroll */}
        <div className="w-full md:w-auto flex-1 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            {/* All Items Button */}
            <button
              type="button"
              onClick={() => onSelectCategory('all')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-950/40 ring-1 ring-orange-400/50'
                  : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All Items</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30 text-amber-200">
                {totalItemsCount}
              </span>
            </button>

            {/* Individual Categories */}
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-950/40 ring-1 ring-orange-400/50'
                      : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800 hover:text-white'
                  }`}
                >
                  {getCategoryIcon(cat.icon, 'w-3.5 h-3.5 text-amber-400')}
                  <span>{cat.shortName}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isSelected
                        ? 'bg-black/30 text-amber-200'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {cat.itemCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Search Input */}
        <div className="w-full md:w-64 relative flex-shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dish or deal..."
            className="w-full pl-8 pr-8 py-1.5 text-xs sm:text-sm bg-stone-900/90 border border-stone-800 rounded-full text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
          />
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
