import React from 'react';
import { ShoppingBag, Ruler, Home, Grid, CreditCard, Search } from 'lucide-react';
import { ProtonStatusBadge, ProtonButton } from '@dipeshsingh2012/proton/react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  cartCount?: number;
  activeClearanceFilter?: number | null;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  cartCount = 0,
  activeClearanceFilter,
  onOpenSearch,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('#/')}
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-500 text-white flex items-center justify-center font-black text-base shadow-sm shadow-amber-200 group-hover:scale-105 transition-transform">
            H
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-black text-slate-900 text-lg tracking-tight">
                Hiljhil
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                Cafe
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium tracking-tight">
              hiljhil.cafe
            </span>
          </div>
        </div>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-6 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('#/')}
            className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${
              currentRoute === '#/' || currentRoute === ''
                ? 'text-amber-700 font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Cafe Flagship
          </button>
          <button
            type="button"
            onClick={() => onNavigate('#/collection')}
            className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${
              currentRoute.startsWith('#/collection')
                ? 'text-amber-700 font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Roastery & Store
          </button>
        </nav>

        {/* Search Bar / Trigger */}
        <div className="flex-1 max-w-xs hidden sm:block">
          <button
            type="button"
            onClick={onOpenSearch || (() => onNavigate('#/search'))}
            className="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-slate-400 text-xs font-medium transition-all group"
            title="Search appliances and dimensions (⌘K)"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-700 transition-colors shrink-0" />
              <span className="truncate">Search machines, brands...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-400 shadow-2xs">
              <span>⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right Section: Mobile Search, Clearance Badge, Cart, Checkout */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={onOpenSearch || (() => onNavigate('#/search'))}
            className="sm:hidden p-2 rounded-xl text-slate-700 hover:text-amber-700 hover:bg-slate-100"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {activeClearanceFilter && (
            <div className="hidden lg:block">
              <ProtonStatusBadge
                status="coffee"
                icon={<Ruler style={{ width: 12, height: 12 }} />}
                label={`≤ ${activeClearanceFilter} cm`}
                size="sm"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => onNavigate('#/cart')}
            className="relative p-2 rounded-xl text-slate-700 hover:text-amber-700 hover:bg-slate-100 transition-colors"
            title="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-700 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          <div className="hidden sm:block">
            <ProtonButton
              size="sm"
              variant="secondary"
              startIcon={<CreditCard style={{ width: 14, height: 14 }} />}
              onClick={() => onNavigate('#/checkout')}
            >
              Checkout
            </ProtonButton>
          </div>
        </div>
      </div>
    </header>
  );
};
