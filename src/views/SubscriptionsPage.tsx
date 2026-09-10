import React, { useState } from 'react';
import { Sparkles, RefreshCw, ShieldCheck, ArrowRight } from 'lucide-react';

interface SubscriptionsPageProps {
  onStartSubscription: (plan: { roast: string; grind: string; frequency: string; priceCents: number }) => void;
}

export const SubscriptionsPage: React.FC<SubscriptionsPageProps> = ({ onStartSubscription }) => {
  const [selectedRoast, setSelectedRoast] = useState<'espresso' | 'medium' | 'filter' | 'coldbrew'>('medium');
  const [selectedGrind, setSelectedGrind] = useState<'whole' | 'filter' | 'espresso' | 'frenchpress'>('whole');
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('biweekly');

  const roastOptions = [
    {
      id: 'espresso' as const,
      title: 'Attikan Espresso Roast',
      notes: 'Dark chocolate, roasted almonds & figs',
      badge: 'Bestseller',
    },
    {
      id: 'medium' as const,
      title: 'Silver Oak Cafe Blend',
      notes: 'Hazelnut, mild citrus & sweet honey',
      badge: 'Balanced',
    },
    {
      id: 'filter' as const,
      title: 'Single-Origin Estate Filter',
      notes: 'Stone fruit, wild jasmine & sugarcane',
      badge: 'Artisanal',
    },
    {
      id: 'coldbrew' as const,
      title: 'Cold Brew Blend Reserve',
      notes: 'Deep cocoa, caramel & spiced molasses',
      badge: 'Summer Pick',
    },
  ];

  const grindOptions = [
    { id: 'whole' as const, label: 'Whole Bean', desc: 'Freshest cup for home burr grinders' },
    { id: 'filter' as const, label: 'Pour Over / Aeropress', desc: 'Medium-fine grind calibrated for paper filters' },
    { id: 'espresso' as const, label: 'Espresso Grind', desc: 'Fine grind for portafilter machines' },
    { id: 'frenchpress' as const, label: 'French Press / Channi', desc: 'Coarse grind for steeping' },
  ];

  const frequencyOptions = [
    { id: 'weekly' as const, label: 'Weekly', discount: 'Save 20%', desc: 'For dedicated multi-cup daily coffee lovers' },
    { id: 'biweekly' as const, label: 'Every 2 Weeks', discount: 'Save 15%', desc: 'Our most popular household cadence' },
    { id: 'monthly' as const, label: 'Monthly', discount: 'Save 10%', desc: 'Ideal for weekend brewers & explorers' },
  ];

  const basePrice = 550; // ₹ 550
  const discountMultiplier = frequency === 'weekly' ? 0.8 : frequency === 'biweekly' ? 0.85 : 0.9;
  const finalPrice = Math.round(basePrice * discountMultiplier);

  const handleSubscribe = () => {
    onStartSubscription({
      roast: selectedRoast,
      grind: selectedGrind,
      frequency,
      priceCents: finalPrice * 100,
    });
  };

  return (
    <div className="space-y-12 py-4 sm:py-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-widest border border-amber-200">
          The Roasters Club
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Personalized Coffee Subscriptions
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Never run out of freshly roasted estate coffee. Enjoy 15% savings, complimentary surprise micro-lots, and total control to pause, adjust, or cancel anytime.
        </p>
      </div>

      {/* Perks Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase">Roasted to Order</h4>
            <p className="text-[11px] text-stone-500">Shipped within 24h of roasting</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase">Flexible Cadence</h4>
            <p className="text-[11px] text-stone-500">Skip, swap roasts, or cancel anytime</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase">Free Priority Delivery</h4>
            <p className="text-[11px] text-stone-500">Direct from roastery to your door</p>
          </div>
        </div>
      </div>

      {/* Step 1: Choose Roast */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-black flex items-center justify-center">
            1
          </span>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide">
            Select Your Preferred Roast Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roastOptions.map((opt) => (
            <div
              key={opt.id}
              onClick={() => setSelectedRoast(opt.id)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selectedRoast === opt.id
                  ? 'border-amber-700 bg-amber-50/40 shadow-xs'
                  : 'border-stone-200 hover:border-stone-400 bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-stone-900 uppercase">{opt.title}</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-amber-100 text-amber-900">
                  {opt.badge}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-2">{opt.notes}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step 2: Choose Grind */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-black flex items-center justify-center">
            2
          </span>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide">
            Choose Your Brewing Grind Size
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {grindOptions.map((opt) => (
            <div
              key={opt.id}
              onClick={() => setSelectedGrind(opt.id)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedGrind === opt.id
                  ? 'border-amber-700 bg-amber-50/40 shadow-xs'
                  : 'border-stone-200 hover:border-stone-400 bg-white'
              }`}
            >
              <h4 className="text-xs font-bold text-stone-900 uppercase">{opt.label}</h4>
              <p className="text-xs text-stone-500 mt-1">{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Choose Frequency & Checkout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-black flex items-center justify-center">
            3
          </span>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide">
            Choose Delivery Frequency
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {frequencyOptions.map((opt) => (
            <div
              key={opt.id}
              onClick={() => setFrequency(opt.id)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-center ${
                frequency === opt.id
                  ? 'border-amber-700 bg-amber-50/40 shadow-xs'
                  : 'border-stone-200 hover:border-stone-400 bg-white'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-stone-900 uppercase">{opt.label}</div>
                <div className="text-[10px] font-black text-emerald-700 uppercase mt-0.5">
                  {opt.discount}
                </div>
              </div>
              <p className="text-[11px] text-stone-500 mt-2">{opt.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing Summary Box */}
        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-stone-900">₹ {finalPrice}</span>
              <span className="text-xs text-stone-400 line-through">₹ {basePrice}</span>
              <span className="text-xs text-stone-500">/ 250g bag</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
              Includes free shipping & roaster fresh guarantee
            </p>
          </div>

          <button
            type="button"
            onClick={handleSubscribe}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-stone-900 hover:bg-amber-900 text-white font-bold text-xs tracking-widest uppercase transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Start Subscription</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
