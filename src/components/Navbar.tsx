import React from 'react';
import { ShoppingBag, Ruler, Home, Grid, CreditCard } from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  cartCount?: number;
  activeClearanceFilter?: number | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  cartCount = 0,
  activeClearanceFilter,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('#/')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-black text-base shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
            m
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-black text-slate-900 text-lg tracking-tight">
              mycommerce
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          </div>
        </div>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            type="button"
            onClick={() => onNavigate('#/')}
            className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${
              currentRoute === '#/' || currentRoute === ''
                ? 'text-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('#/collection')}
            className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${
              currentRoute.startsWith('#/collection')
                ? 'text-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Collection
          </button>
        </nav>

        {/* Right Section: Active Clearance Badge, Cart, Checkout */}
        <div className="flex items-center gap-3">
          {activeClearanceFilter && (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
              <Ruler className="w-3 h-3" />
              <span>≤ {activeClearanceFilter} cm clearance</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => onNavigate('#/cart')}
            className="relative p-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
            title="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('#/checkout')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5" />
            Checkout
          </button>
        </div>
      </div>
    </header>
  );
};
