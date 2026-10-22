import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemCard } from './components/MenuItemCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSlipModal } from './components/OrderSlipModal';
import { OriginalMenuModal } from './components/OriginalMenuModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { FloatingCartBar } from './components/FloatingCartBar';
import { Footer } from './components/Footer';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import {
  CATEGORIES,
  MENU_ITEMS,
  BRANCHES,
  RESTAURANT_INFO,
} from './data/menuData';
import {
  CartItem,
  CustomerOrderDetails,
  CompletedOrder,
  MenuItem,
  OrderType,
  SizeOption,
} from './types/menu';
import { openWhatsAppOrder } from './utils/whatsapp';

export default function App() {
  // State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBranchId, setSelectedBranchId] = useState<string>(BRANCHES[0].id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>('delivery');

  // Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isMenuImagesOpen, setIsMenuImagesOpen] = useState<boolean>(false);
  const [activeItemForDetail, setActiveItemForDetail] = useState<MenuItem | null>(null);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  // Active branch
  const activeBranch = useMemo(() => {
    return BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];
  }, [selectedBranchId]);

  // Cart calculations
  const cartItemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.selectedSize.price * item.quantity,
        0
      ),
    [cart]
  );

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesDeals = item.dealItems?.some((d) =>
          d.toLowerCase().includes(query)
        );
        return matchesName || matchesCat || matchesDesc || matchesDeals;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Add to cart handler
  const handleAddToCart = (
    item: MenuItem,
    selectedSize: SizeOption,
    quantity: number
  ) => {
    const cartItemId = `${item.id}_${selectedSize.sizeKey}`;
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            item,
            selectedSize,
            quantity,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Order confirmation & slip generation
  const handleConfirmOrder = (customerDetails: CustomerOrderDetails) => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000).toString();
    const subtotal = cartTotal;
    const deliveryFee =
      customerDetails.orderType === 'delivery'
        ? subtotal > 0
          ? RESTAURANT_INFO.deliveryFee
          : 0
        : 0;
    const total = subtotal + deliveryFee;

    const branch =
      BRANCHES.find((b) => b.id === customerDetails.branchId) || activeBranch;

    const dateFormatted = new Date().toLocaleString('en-PK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: CompletedOrder = {
      orderId: `ZT-${Date.now()}`,
      orderNumber,
      timestamp: dateFormatted,
      customer: customerDetails,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount: 0,
      total,
      branch,
    };

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ea580c', '#f59e0b', '#10b981', '#ffffff'],
    });

    // Close checkout and cart, save order, and open Slip Modal
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCompletedOrder(newOrder);

    // Auto trigger WhatsApp send with generated slip
    setTimeout(() => {
      openWhatsAppOrder(newOrder);
    }, 600);

    // Empty cart
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        cartItemCount={cartItemCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenuImages={() => setIsMenuImagesOpen(true)}
        selectedBranchName={activeBranch.name}
      />

      {/* Hero Banner with branch selector */}
      <HeroBanner
        onExploreDeals={() => {
          setSelectedCategory('deals-combos');
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
        onSelectBranch={(id) => setSelectedBranchId(id)}
        currentBranchId={selectedBranchId}
      />

      {/* Sticky Category Navigation & Search */}
      <CategoryNav
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={(id) => setSelectedCategory(id)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        totalItemsCount={MENU_ITEMS.length}
      />

      {/* Main Content: Food Cards Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Active Category Heading & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 pb-4 border-b border-stone-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>
                {selectedCategory === 'all'
                  ? 'Complete Royal Menu'
                  : CATEGORIES.find((c) => c.id === selectedCategory)?.name ||
                    'Menu Items'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-600/30 text-orange-400 font-mono font-bold border border-orange-500/30">
                {filteredItems.length} dishes
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
              {selectedCategory === 'all'
                ? 'All authentic Chinese gravies, beef, combos, starters, dumplings, soups, noodles and rice.'
                : CATEGORIES.find((c) => c.id === selectedCategory)?.description}
            </p>
          </div>

          {searchQuery && (
            <div className="text-xs text-amber-400">
              Showing results for "{searchQuery}" (
              <button
                onClick={() => setSearchQuery('')}
                className="underline hover:text-white ml-1 font-semibold"
              >
                Clear
              </button>
              )
            </div>
          )}
        </div>

        {/* Menu Cards Grid with Framer Motion Fade-In-Up Animation */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/40 rounded-2xl border border-stone-800">
            <p className="text-stone-400 text-sm">
              No dishes found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredItems.map((item, idx) => (
              <MenuItemCard
                key={item.id}
                item={item}
                index={idx}
                onAddToCart={handleAddToCart}
                onQuickView={(it) => setActiveItemForDetail(it)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating WhatsApp Action Button (Clean icon only - as requested) */}
      <a
        href={`https://wa.me/${RESTAURANT_INFO.whatsappIntl}?text=${encodeURIComponent(
          'Hello Zap Thoung Café! I want to inquire about your menu and deals.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 flex items-center justify-center border-2 border-emerald-400/50 hover:scale-105 active:scale-95 transition-all"
        title="WhatsApp Direct Inquiry"
        aria-label="Direct WhatsApp Contact"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
      </a>

      {/* Mobile Floating Cart Bar */}
      <FloatingCartBar
        items={cart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Responsive Fitted Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        orderType={orderType}
        onOrderTypeChange={(t) => setOrderType(t)}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        orderType={orderType}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Digital Receipt Slip Modal (With WhatsApp Dispatch) */}
      <OrderSlipModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Original Printed Menu Cards Modal */}
      <OriginalMenuModal
        isOpen={isMenuImagesOpen}
        onClose={() => setIsMenuImagesOpen(false)}
      />

      {/* Single Item Quick Detail Modal */}
      <ItemDetailModal
        item={activeItemForDetail}
        onClose={() => setActiveItemForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Royal Footer */}
      <Footer onOpenMenuCards={() => setIsMenuImagesOpen(true)} />
    </div>
  );
}
