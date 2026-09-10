import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ProtonThemeProvider } from '@dipesh.singh/proton/react';
import { PromoBar, NavigationHeader, Footer as StoreFooter, NavLinkItem } from '@dipesh.singh/commerce-ui';
import { MfeErrorBoundary } from './components/MfeErrorBoundary';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';
import { SubscriptionsPage } from './views/SubscriptionsPage';
import { CafesPage } from './views/CafesPage';
import { AboutPage } from './views/AboutPage';
import { OffersPage } from './views/OffersPage';
import { LegalPage } from './views/LegalPage';

// Resilient Federated Component Resolver
function resolveFederatedComponent<T extends React.ComponentType<any>>(
  modulePromise: Promise<any>,
  componentName: string
): Promise<{ default: T }> {
  return modulePromise.then((m) => {
    // 1. Root named export (e.g. m.HomepageFragment)
    if (typeof m?.[componentName] === 'function') {
      return { default: m[componentName] };
    }
    // 2. Nested inside wrapDefault (e.g. m.default.HomepageFragment)
    if (typeof m?.default?.[componentName] === 'function') {
      return { default: m.default[componentName] };
    }
    // 3. Default export function (e.g. m.default)
    if (typeof m?.default === 'function') {
      return { default: m.default };
    }
    // 4. Directly exported component function
    if (typeof m === 'function') {
      return { default: m };
    }
    console.error(`[MFE Resolver] Could not resolve component "${componentName}" from module:`, m);
    throw new TypeError(`Module federation remote for "${componentName}" did not export a valid React component.`);
  });
}

// Dynamic Module Federation Lazy Imports
const HomepageFragment = lazy(() =>
  resolveFederatedComponent(import('homepageUi/HomepageFragment'), 'HomepageFragment')
);
const DiscoveryFragment = lazy(() =>
  resolveFederatedComponent(import('discoveryUi/DiscoveryFragment'), 'DiscoveryFragment')
);
const ProductPageFragment = lazy(() =>
  resolveFederatedComponent(import('productPageUi/ProductPageFragment'), 'ProductPageFragment')
);
const CounterCheckWidget = lazy(() =>
  resolveFederatedComponent(import('counterCheck/CounterCheckWidget'), 'CounterCheckWidget')
);
const CartFragment = lazy(() =>
  resolveFederatedComponent(import('cartUi/CartFragment'), 'CartFragment')
);
const CheckoutFragment = lazy(() =>
  resolveFederatedComponent(import('checkoutUi/CheckoutFragment'), 'CheckoutFragment')
);
const SearchModal = lazy(() =>
  resolveFederatedComponent(import('searchUi/SearchModal'), 'SearchModal')
);
const SearchFragment = lazy(() =>
  resolveFederatedComponent(import('searchUi/SearchFragment'), 'SearchFragment')
);

const MfeLoadingPlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <div className="py-24 flex flex-col items-center justify-center space-y-3" role="status" aria-label={`Loading ${name} fragment`}>
    <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin" />
    <p className="text-xs font-semibold text-slate-500">Loading {name} fragment via Module Federation...</p>
  </div>
);

const STORE_NAV_LINKS: NavLinkItem[] = [
  {
    id: 'coffees',
    label: 'Coffees',
    href: '#/coffees',
    subItems: [
      { id: 'roasted', label: 'Roasted & Ground Beans', href: '#/coffees', description: 'Single-origin estates & signature blends', badge: 'Popular' },
      { id: 'easy-pour', label: 'Easy Pour & Drip Bags', href: '#/coffees', description: 'Fresh pour over coffee in 3 easy steps' },
      { id: 'concentrates', label: 'Specialty Cold Brew Drops', href: '#/coffees', description: 'Stir & sip iced coffee concentrate', badge: 'NEW' },
      { id: 'bundles', label: 'Tasting & Explorer Bundles', href: '#/offers', description: 'Curated roasts for every palate' },
    ],
  },
  {
    id: 'equipment',
    label: 'Equipment',
    href: '#/equipment',
    subItems: [
      { id: 'espresso', label: 'Espresso Machines', href: '#/equipment', description: 'Breville, Gaggia, and home barista machines' },
      { id: 'grinders', label: 'Precision Burr Grinders', href: '#/equipment', description: 'Electric and manual burr grinders' },
      { id: 'pour-over', label: 'Pour Over & Drippers', href: '#/equipment', description: 'V60, Chemex, and Aeropress gear' },
      { id: 'drinkware', label: 'Barista Drinkware', href: '#/equipment' },
    ],
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    href: '#/subscriptions',
  },
  {
    id: 'cafes',
    label: 'Our Cafes',
    href: '#/cafes',
  },
  {
    id: 'offers',
    label: 'Offers',
    href: '#/offers',
    isHighlight: true,
    highlightBadge: 'HOT',
  },
];

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => window.location.hash || '#/');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeClearanceFilter, setActiveClearanceFilter] = useState<number | null>(null);
  const [activeProductId, setActiveProductId] = useState<string>('prod_breville_barista_touch');
  const [cartCount, setCartCount] = useState<number>(2); // 2 seed items in cart
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; actionText?: string; actionRoute?: string } | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentRoute(hash);

      if (hash.startsWith('#/product/')) {
        const id = hash.replace('#/product/', '');
        if (id) setActiveProductId(id);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global keyboard shortcut for Search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = (route: string) => {
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (text: string, actionText?: string, actionRoute?: string) => {
    setToastMessage({ text, actionText, actionRoute });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 4500);
  };

  const renderRouteFragment = () => {
    if (currentRoute === '#/' || currentRoute === '' || currentRoute === '#') {
      return (
        <MfeErrorBoundary fragmentName="HomepageFragment">
          <Suspense fallback={<MfeLoadingPlaceholder name="Homepage" />}>
            <HomepageFragment
              onCategorySelect={(catSlug: string) => {
                setActiveCategory(catSlug);
                navigate('#/collection');
              }}
              onClearanceSelect={(clearanceCm: number) => {
                setActiveClearanceFilter(clearanceCm);
                navigate('#/equipment');
                showToast(`Applied clearance filter: ≤ ${clearanceCm} cm`, 'View Equipment', '#/equipment');
              }}
              onProductSelect={(prodId: string) => {
                setActiveProductId(prodId);
                navigate(`#/product/${prodId}`);
              }}
              onAddToCart={(product: any) => {
                setCartCount((c) => c + 1);
                showToast(`Added ${product.name} to cart!`, 'View Cart', '#/cart');
              }}
            />
          </Suspense>
        </MfeErrorBoundary>
      );
    }

    if (currentRoute.startsWith('#/collection') || currentRoute.startsWith('#/coffees')) {
      const defaultCat = currentRoute.startsWith('#/coffees') ? 'coffee' : activeCategory;
      return (
        <MfeErrorBoundary fragmentName="DiscoveryFragment">
          <Suspense fallback={<MfeLoadingPlaceholder name="Coffees & Collection" />}>
            <DiscoveryFragment
              initialCategory={defaultCat}
              initialMaxHeight={activeClearanceFilter}
              onClearanceFilterChange={(cm: number | null) => {
                setActiveClearanceFilter(cm);
              }}
              onProductSelect={(product: any) => {
                setActiveProductId(product.id);
                navigate(`#/product/${product.id}`);
              }}
            />
          </Suspense>
        </MfeErrorBoundary>
      );
    }

    if (currentRoute.startsWith('#/equipment')) {
      return (
        <MfeErrorBoundary fragmentName="DiscoveryFragment">
          <Suspense fallback={<MfeLoadingPlaceholder name="Brewing Equipment & Machines" />}>
            <DiscoveryFragment
              initialCategory="espresso-machine"
              initialMaxHeight={activeClearanceFilter}
              onClearanceFilterChange={(cm: number | null) => {
                setActiveClearanceFilter(cm);
              }}
              onProductSelect={(product: any) => {
                setActiveProductId(product.id);
                navigate(`#/product/${product.id}`);
              }}
            />
          </Suspense>
        </MfeErrorBoundary>
      );
    }

    if (currentRoute === '#/subscriptions') {
      return (
        <SubscriptionsPage
          onStartSubscription={(plan) => {
            setCartCount((c) => c + 1);
            showToast(`Started ${plan.frequency} subscription!`, 'View Cart', '#/cart');
          }}
        />
      );
    }

    if (currentRoute === '#/cafes') {
      return (
        <CafesPage
          onOrderAhead={(cafeId) => {
            navigate('#/coffees');
            showToast(`Order ahead selected for ${cafeId}. Choose your favorite roasts.`);
          }}
        />
      );
    }

    if (currentRoute === '#/offers') {
      return (
        <OffersPage
          onApplyPromoCode={(code) => {
            showToast(`Promo discount coupon ${code} applied to your session!`);
          }}
        />
      );
    }

    if (currentRoute === '#/about') {
      return <AboutPage />;
    }

    if (currentRoute === '#/privacy') {
      return <LegalPage type="privacy" />;
    }

    if (currentRoute === '#/terms') {
      return <LegalPage type="terms" />;
    }

    if (currentRoute.startsWith('#/search')) {
      const queryString = currentRoute.includes('?') ? currentRoute.split('?')[1] : '';
      const params = new URLSearchParams(queryString);
      const searchQ = params.get('q') || '';

      return (
        <MfeErrorBoundary fragmentName="SearchFragment">
          <Suspense fallback={<MfeLoadingPlaceholder name="Search Results" />}>
            <SearchFragment
              initialQuery={searchQ}
              initialMaxHeight={activeClearanceFilter}
              onClearanceFilterChange={(cm: number | null) => {
                setActiveClearanceFilter(cm);
              }}
              onProductSelect={(product: any) => {
                setActiveProductId(product.id);
                navigate(`#/product/${product.id}`);
              }}
              onAddToCart={(product: any) => {
                setCartCount((c) => c + 1);
                showToast(`Added ${product.name} to cart!`, 'View Cart', '#/cart');
              }}
            />
          </Suspense>
        </MfeErrorBoundary>
      );
    }

    if (currentRoute.startsWith('#/product/')) {
      const prodId = currentRoute.replace('#/product/', '') || activeProductId;
      return (
        <MfeErrorBoundary fragmentName="ProductPageFragment">
          <Suspense fallback={<MfeLoadingPlaceholder name="Product Details" />}>
            <ProductPageFragment
              productId={prodId}
              onAddToCart={(product: any) => {
                setCartCount((c) => c + 1);
                showToast(`Added ${product.name} to cart!`, 'View Cart', '#/cart');
              }}
              renderCounterCheckSlot={(product: any) => (
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                      Spatial AI Verification Fragment
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      Verify Countertop Fitment with Computer Vision
                    </h3>
                  </div>
                  <MfeErrorBoundary fragmentName="CounterCheckWidget">
                    <Suspense fallback={<MfeLoadingPlaceholder name="Counter-Check Widget" />}>
                      <CounterCheckWidget
                        productId={product.id}
                        productName={product.name}
                        productHeightCm={product.height_cm}
                        productTopClearanceCm={product.top_clearance_cm}
                        onSelectAlternative={(altId: string) => {
                          setActiveProductId(altId);
                          navigate(`#/product/${altId}`);
                        }}
                      />
                    </Suspense>
                  </MfeErrorBoundary>
                </div>
              )}
            />
          </Suspense>
        </MfeErrorBoundary>
      );
    }

    if (currentRoute === '#/cart') {
      return (
        <MfeErrorBoundary fragmentName="CartFragment">
          <Suspense fallback={<MfeLoadingPlaceholder name="Shopping Cart" />}>
            <CartFragment
              cartId="cart_active_session"
              onVerifyFitmentClick={(productId: string) => {
                setActiveProductId(productId);
                navigate(`#/product/${productId}`);
              }}
              onProceedToCheckout={() => {
                navigate('#/checkout');
              }}
            />
          </Suspense>
        </MfeErrorBoundary>
      );
    }

    if (currentRoute === '#/checkout') {
      return (
        <MfeErrorBoundary fragmentName="CheckoutFragment">
          <Suspense fallback={<MfeLoadingPlaceholder name="Checkout" />}>
            <CheckoutFragment
              cartId="cart_active_session"
              onOrderComplete={(receipt: any) => {
                setCartCount(0);
                showToast(`Order ${receipt.order_number} confirmed with White-Glove delivery!`);
              }}
              onReturnToShopping={() => {
                navigate('#/collection');
              }}
            />
          </Suspense>
        </MfeErrorBoundary>
      );
    }

    // Default fallback
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Page Not Found</h2>
        <p className="text-slate-500 text-sm">The route {currentRoute} does not exist in the storefront.</p>
        <button
          type="button"
          onClick={() => navigate('#/')}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
        >
          Return to Homepage
        </button>
      </div>
    );
  };

  return (
    <ProtonThemeProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-700 selection:text-white">
        {/* Global Promotional Announcement Bar */}
        <PromoBar
          message="Get 10% off on your first coffee purchase, use code -"
          promoCode="COFFEE10"
          tag="WELCOME"
          variant="coffee"
          onCopyCode={(code) => showToast(`Copied promo coupon code: ${code}`)}
        />

        {/* Global Retail Navigation Header */}
        <NavigationHeader
          logo={{
            text: 'HILJHIL CAFE',
            tagline: 'Specialty Coffee Roasters',
            href: '#/',
          }}
          links={STORE_NAV_LINKS}
          ctaPill={{
            label: 'Subscribe & Save',
            onClick: () => navigate('#/subscriptions'),
          }}
          cartCount={cartCount}
          onSearchClick={() => setIsSearchModalOpen(true)}
          onAccountClick={() => showToast('Demo Account Profile: Highland District Club Member')}
          onCartClick={() => navigate('#/cart')}
        />

        {/* Main Micro-Frontend Viewport */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {renderRouteFragment()}
        </main>

        {/* Floating Notification Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">{toastMessage.text}</span>
            {toastMessage.actionText && toastMessage.actionRoute && (
              <button
                type="button"
                onClick={() => navigate(toastMessage.actionRoute!)}
                className="ml-2 px-2.5 py-1 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
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

        {/* Global Instant Search Modal (Federated Remote) */}
        {isSearchModalOpen && (
          <MfeErrorBoundary fragmentName="SearchModal">
            <Suspense fallback={null}>
              <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
                initialClearance={activeClearanceFilter}
                onSelectProduct={(product: any) => {
                  setActiveProductId(product.id);
                  navigate(`#/product/${product.id}`);
                }}
                onFullSearch={(query: string, maxHeight?: number | null) => {
                  if (maxHeight !== undefined) setActiveClearanceFilter(maxHeight);
                  const qParam = query ? `?q=${encodeURIComponent(query)}` : '';
                  navigate(`#/search${qParam}`);
                }}
              />
            </Suspense>
          </MfeErrorBoundary>
        )}

        {/* Global Storefront Footer */}
        <StoreFooter
          brandName="Hiljhil Cafe & Roastery"
          privacyPolicyUrl="#/privacy"
          termsUrl="#/terms"
          onNewsletterSubmit={(email) => {
            showToast(`Thank you! ${email} subscribed to our roastery newsletter.`);
          }}
        />
      </div>
    </ProtonThemeProvider>
  );
};

export default App;
