'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { PromoBar, NavigationHeader, Footer, NavLinkItem } from '@dipesh.singh/commerce-ui';
import { FederatedSearchModal } from './FederatedSearchModal';
import { ProtonThemeProvider } from '@dipesh.singh/proton/react';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';
import { fetchActiveTheme, DEFAULT_STORE_THEME, ThemeConfig } from '../lib/contentApi';

const STORE_NAV_LINKS: NavLinkItem[] = [
  {
    id: 'coffees',
    label: 'Coffees',
    href: '/coffees',
    subItems: [
      { id: 'roasted', label: 'Roasted & Ground Beans', href: '/coffees', description: 'Single-origin estates & signature blends', badge: 'Popular' },
      { id: 'easy-pour', label: 'Easy Pour & Drip Bags', href: '/coffees', description: 'Fresh pour over coffee in 3 easy steps' },
      { id: 'concentrates', label: 'Specialty Cold Brew Drops', href: '/coffees', description: 'Stir & sip iced coffee concentrate', badge: 'NEW' },
      { id: 'bundles', label: 'Tasting & Explorer Bundles', href: '/offers', description: 'Curated roasts for every palate' },
    ],
  },
  {
    id: 'equipment',
    label: 'Equipment',
    href: '/equipment',
    subItems: [
      { id: 'espresso', label: 'Espresso Machines', href: '/equipment', description: 'Breville, Gaggia, and home barista machines' },
      { id: 'grinders', label: 'Precision Burr Grinders', href: '/equipment', description: 'Electric and manual burr grinders' },
      { id: 'pour-over', label: 'Pour Over & Drippers', href: '/equipment', description: 'V60, Chemex, and Aeropress gear' },
      { id: 'drinkware', label: 'Barista Drinkware', href: '/equipment' },
    ],
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    href: '/subscriptions',
  },
  {
    id: 'cafes',
    label: 'Our Cafes',
    href: '/cafes',
  },
  {
    id: 'offers',
    label: 'Offers',
    href: '/offers',
    isHighlight: true,
    highlightBadge: 'HOT',
  },
];

interface StoreNavigationProps {
  children: React.ReactNode;
}

export const StoreNavigation: React.FC<StoreNavigationProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_STORE_THEME);
  const [cartCount, setCartCount] = useState<number>(2);
  const [toastMessage, setToastMessage] = useState<{ text: string; actionText?: string; actionRoute?: string } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Global ⌘K / Ctrl+K keyboard shortcut for Search Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync theme from Cloud Run content-service and listen for live CMS preview messages
  useEffect(() => {
    let isMounted = true;
    fetchActiveTheme().then((activeTheme) => {
      if (isMounted && activeTheme) {
        setTheme(activeTheme);
      }
    });

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PIM_THEME_UPDATED' && event.data.theme) {
        setTheme(event.data.theme);
      }
    };

    const handleCartAdd = (event: Event) => {
      const customEvent = event as CustomEvent;
      const product = customEvent.detail?.product;
      setCartCount((c) => c + 1);
      if (product?.name) {
        showToast(`Added ${product.name} to your cart!`, 'View Cart', '/cart');
      } else {
        showToast('Item added to your cart!', 'View Cart', '/cart');
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('commerce:cart:add', handleCartAdd);
    return () => {
      isMounted = false;
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('commerce:cart:add', handleCartAdd);
    };
  }, []);

  const showToast = (text: string, actionText?: string, actionRoute?: string) => {
    setToastMessage({ text, actionText, actionRoute });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 4500);
  };

  const fontClass =
    theme.font_family === 'serif'
      ? 'font-serif'
      : theme.font_family === 'mono'
      ? 'font-mono'
      : 'font-sans';

  return (
    <ProtonThemeProvider>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${fontClass}`}
        style={{
          backgroundColor: theme.background_color || '#f8fafc',
          color: theme.text_color || '#0f172a',
        }}
      >
        {/* Global Announcement PromoBar */}
        <PromoBar
          message={
            theme.badge_text
              ? `${theme.badge_text} · Get 10% off on your first order with code -`
              : 'Get 10% off on your first coffee purchase, use code -'
          }
          promoCode="COFFEE10"
          tag={theme.badge_text || 'WELCOME'}
          variant="coffee"
          onCopyCode={(code) => showToast(`Copied promo coupon code: ${code}`)}
        />

        {/* Global Retail Navigation Header */}
        <NavigationHeader
          logo={{
            imageUrl: '/logo.jpg',
            text: 'HILL JHIL',
            tagline: 'Himalayan Alpine Sourced · Pure Mountain Roast',
            href: '/',
          }}
          links={STORE_NAV_LINKS}
          ctaPill={{
            label: 'Subscribe & Save',
            onClick: () => router.push('/subscriptions'),
          }}
          cartCount={cartCount}
          onSearchClick={() => setIsSearchOpen(true)}
          onAccountClick={() => showToast('Demo Account Profile: Highland District Club Member')}
          onCartClick={() => router.push('/cart')}
        />

        {/* Federated Search Modal (searchUi MFE) */}
        <FederatedSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        {/* Main Page Viewport */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* Floating Notification Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">{toastMessage.text}</span>
            {toastMessage.actionText && toastMessage.actionRoute && (
              <button
                type="button"
                onClick={() => router.push(toastMessage.actionRoute!)}
                className="ml-2 px-2.5 py-1 text-white rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1 shadow-xs"
                style={{ backgroundColor: theme.primary_color || '#92400e' }}
              >
                <ShoppingBag className="w-3 h-3" />
                {toastMessage.actionText}
              </button>
            )}
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Storefront Footer */}
        <Footer
          brandName="HILL JHIL ROASTERS"
          onNewsletterSubmit={async (email) => {
            await new Promise((r) => setTimeout(r, 600));
            showToast(`Thank you for subscribing with ${email}!`);
          }}
        />
      </div>
    </ProtonThemeProvider>
  );
};
