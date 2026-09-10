import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MfeErrorBoundary } from './components/MfeErrorBoundary';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';

// Dynamic Module Federation Lazy Imports
const HomepageFragment = lazy(() =>
  import('homepageUi/HomepageFragment').then((m) => ({ default: m.HomepageFragment || m.default }))
);
const DiscoveryFragment = lazy(() =>
  import('discoveryUi/DiscoveryFragment').then((m) => ({ default: m.DiscoveryFragment || m.default }))
);
const ProductPageFragment = lazy(() =>
  import('productPageUi/ProductPageFragment').then((m) => ({ default: m.ProductPageFragment || m.default }))
);
const CounterCheckWidget = lazy(() =>
  import('counterCheck/CounterCheckWidget').then((m) => ({ default: m.CounterCheckWidget || m.default }))
);
const CartFragment = lazy(() =>
  import('cartUi/CartFragment').then((m) => ({ default: m.CartFragment || m.default }))
);
const CheckoutFragment = lazy(() =>
  import('checkoutUi/CheckoutFragment').then((m) => ({ default: m.CheckoutFragment || m.default }))
);
const SearchModal = lazy(() =>
  import('searchUi/SearchModal').then((m) => ({ default: m.SearchModal || m.default }))
);
const SearchFragment = lazy(() =>
  import('searchUi/SearchFragment').then((m) => ({ default: m.SearchFragment || m.default }))
);

const MfeLoadingPlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <div className="py-24 text-center space-y-3">
    <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
    <p className="text-xs font-semibold text-slate-500">Loading {name} fragment via Module Federation...</p>
  </div>
);

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
                navigate('#/collection');
                showToast(`Applied clearance filter: ≤ ${clearanceCm} cm`, 'View Collection', '#/collection');
              }}
            />
          </Suspense>
        </MfeErrorBoundary>
      );
    }

    if (currentRoute.startsWith('#/collection')) {
      return (
        <MfeErrorBoundary fragmentName="DiscoveryFragment">
          <Suspense fallback={<MfeLoadingPlaceholder name="Discovery & Collection" />}>
            <DiscoveryFragment
              initialCategory={activeCategory}
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
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Global MFE Storefront Header */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigate}
        cartCount={cartCount}
        activeClearanceFilter={activeClearanceFilter}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Main Micro-Frontend Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
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
              className="ml-2 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
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

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
