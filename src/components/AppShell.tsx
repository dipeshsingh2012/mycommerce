'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Footer } from '@dipesh.singh/commerce-ui';
import { StoreHeader } from './StoreHeader';
import { StorePromoBar } from './StorePromoBar';
import { FederatedSearchModal } from './FederatedSearchModal';
import { ProtonThemeProvider } from '@dipesh.singh/proton/react';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';
import {
  GlobalShellConfig,
  DEFAULT_GLOBAL_SHELL,
  fetchGlobalShell,
  transformHeaderToNavLinks,
  transformFooterToSections,
  transformFooterSocialLinks,
  normalizeCmsUrl,
} from '../lib/contentApi';

interface AppShellProps {
  children: React.ReactNode;
  initialShell?: GlobalShellConfig;
}

export const AppShell: React.FC<AppShellProps> = ({ children, initialShell }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [shell, setShell] = useState<GlobalShellConfig>(initialShell || DEFAULT_GLOBAL_SHELL);
  const [cartCount, setCartCount] = useState<number>(0);
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

  // Fetch active shell and listen for live CMS preview messages
  useEffect(() => {
    let isMounted = true;

    fetchGlobalShell().then((activeShell) => {
      if (isMounted && activeShell) {
        setShell(activeShell);
      }
    });

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PIM_SHELL_UPDATED' && event.data.shell) {
        setShell(event.data.shell);
      } else if (event.data?.type === 'PIM_THEME_UPDATED' && event.data.theme) {
        setShell((prev) => ({
          ...prev,
          theme: event.data.theme,
        }));
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

  const theme = shell.theme || DEFAULT_GLOBAL_SHELL.theme!;
  const fontClass =
    theme.font_family === 'serif'
      ? 'font-serif'
      : theme.font_family === 'mono'
      ? 'font-mono'
      : 'font-sans';

  const promo = shell.promo_bar;
  const header = shell.header;
  const footer = shell.footer;

  return (
    <ProtonThemeProvider>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${fontClass}`}
        style={{
          backgroundColor: theme.background_color || '#f8fafc',
          color: theme.text_color || '#0f172a',
        }}
      >
        {/* Dynamic Global Announcement PromoBar from content-service */}
        {promo && promo.enabled && (
          <StorePromoBar
            message={promo.text}
            badge={promo.badge || undefined}
            promoCode={promo.badge || undefined}
            ctaText={promo.cta_text || undefined}
            ctaUrl={promo.cta_url ? normalizeCmsUrl(promo.cta_url) : undefined}
            dismissible={promo.dismissible !== false}
            theme={theme}
          />
        )}

        {/* Dynamic Retail Navigation Header with Next.js Client Routing & Active States */}
        {header && (
          <StoreHeader
            logo={{
              imageUrl: header.logo_url || '/logo.jpg',
              text: header.brand_name || 'HILL JHIL',
              tagline: header.brand_tagline || 'Specialty Sourced & Micro-Lot Roasted',
              badge: header.brand_badge || 'FLAGSHIP ROASTERY',
              href: '/',
            }}
            links={transformHeaderToNavLinks(header)}
            ctaPill={
              promo?.cta_text && promo?.cta_url
                ? {
                    label: promo.cta_text,
                    href: normalizeCmsUrl(promo.cta_url),
                    onClick: () => router.push(normalizeCmsUrl(promo.cta_url)),
                  }
                : undefined
            }
            cartCount={cartCount}
            onSearchClick={() => setIsSearchOpen(true)}
            onAccountClick={() => showToast('Demo Account Profile: Highland District Club Member')}
            onCartClick={() => router.push('/cart')}
            sticky={header.sticky !== false}
            theme={theme}
          />
        )}

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

        {/* Dynamic Storefront Footer from content-service */}
        {footer && (
          <Footer
            brandName={footer.brand_name || 'HILL JHIL ROASTERS'}
            sections={transformFooterToSections(footer)}
            socialLinks={transformFooterSocialLinks(footer)}
            onNewsletterSubmit={async (email) => {
              await new Promise((r) => setTimeout(r, 600));
              showToast(`Thank you for subscribing with ${email}!`);
            }}
          />
        )}
      </div>
    </ProtonThemeProvider>
  );
};

// Re-export for backward compatibility
export const StoreNavigation = AppShell;
