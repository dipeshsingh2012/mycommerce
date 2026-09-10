import React from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';

interface OffersPageProps {
  onApplyPromoCode?: (code: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onApplyPromoCode }) => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    onApplyPromoCode?.(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const coupons = [
    {
      code: 'COFFEE10',
      discount: '10% OFF',
      title: 'First Coffee Purchase Special',
      description: 'Get 10% off your first single-origin roast bag, easy pour box, or concentrate drop.',
      terms: 'Valid for new customers. No minimum spend.',
    },
    {
      code: 'ROASTCLUB',
      discount: '15% OFF',
      title: 'Recurring Roasters Subscription',
      description: 'Subscribe to regular deliveries of fresh beans and receive an ongoing 15% discount on every dispatch.',
      terms: 'Applies automatically to recurring coffee subscriptions.',
    },
    {
      code: 'GEARSHIP',
      discount: 'FREE SHIPPING',
      title: 'Espresso Hardware Free Shipping',
      description: 'Complimentary insured white-glove shipping on all espresso machines, burr grinders, and barista tools over ₹ 2,500.',
      terms: 'Valid on all hardware orders across India.',
    },
  ];

  const bundles = [
    {
      title: 'Explorer Starter Duo',
      description: '1x Attikan Estate Espresso (250g) + 1x Easy Pour Vienna Box (5 Sachets)',
      price: '₹ 800',
      regularPrice: '₹ 950',
      savings: 'Save ₹ 150',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&fit=crop&q=80',
      href: '#/product/prod_breville_barista_touch',
    },
    {
      title: 'Cold Brew Lover Bundle',
      description: '2x Sea Salt Mocha Drops Concentrate + 1x Glass Barista Tumbler',
      price: '₹ 850',
      regularPrice: '₹ 1,050',
      savings: 'Save ₹ 200',
      imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&fit=crop&q=80',
      href: '#/product/prod_fellow_ode_gen2',
    },
  ];

  return (
    <div className="space-y-12 py-4 sm:py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-widest border border-amber-200">
          Exclusive Perks & Deals
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Special Offers & Bundles
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Unlock seasonal discounts, starter explorer bundles, and complimentary roastery perks designed to elevate your home brewing.
        </p>
      </div>

      {/* Promo Code Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {coupons.map((c) => (
          <div
            key={c.code}
            className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors"
          >
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">
                {c.discount}
              </span>
              <h3 className="font-bold text-base text-stone-900 leading-snug">{c.title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">{c.description}</p>
            </div>

            <div className="pt-3 border-t border-stone-100 space-y-2">
              <button
                type="button"
                onClick={() => copyCode(c.code)}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-mono font-bold text-xs flex items-center justify-between transition-colors"
              >
                <span>Code: {c.code}</span>
                {copiedCode === c.code ? (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-sans">
                    <Check className="w-3.5 h-3.5" /> Copied!
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] text-amber-800 font-sans">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </span>
                )}
              </button>
              <span className="text-[10px] text-stone-400 block">{c.terms}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Bundles */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Curated Tasting Bundles
          </h2>
          <span className="text-xs text-stone-500 font-medium">Limited batch bundles</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {bundles.map((b, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs flex flex-col justify-between"
            >
              <div className="h-48 sm:h-56 relative bg-stone-100 overflow-hidden">
                <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-amber-400 text-stone-900 text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider">
                  {b.savings}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-base text-stone-900">{b.title}</h3>
                  <p className="text-xs text-stone-500 mt-1">{b.description}</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-stone-900">{b.price}</span>
                  <span className="text-xs text-stone-400 line-through">{b.regularPrice}</span>
                </div>

                <a
                  href={b.href}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-stone-900 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-widest transition-colors shadow-xs"
                >
                  <span>Shop Bundle</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
