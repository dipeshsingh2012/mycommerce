import React from 'react';
import { Check, Repeat } from 'lucide-react';
import type { CatalogVariant } from '@/lib/catalogApi';

export interface PackSizeSelectorProps {
  variants?: CatalogVariant[];
  selectedSize: string;
  onSelectSize: (variant: CatalogVariant) => void;
  isSubscription?: boolean;
  onToggleSubscription?: (isSub: boolean) => void;
  subscriptionDiscountPercent?: number;
  className?: string;
}

const DEFAULT_VARIANTS: CatalogVariant[] = [
  { size: '250g', weight_grams: 250, price: 1250, compare_at_price: 1400, available: true },
  { size: '500g', weight_grams: 500, price: 2350, compare_at_price: 2800, available: true },
  { size: '1kg', weight_grams: 1000, price: 4400, compare_at_price: 5600, available: true },
];

export const PackSizeSelector: React.FC<PackSizeSelectorProps> = ({
  variants = DEFAULT_VARIANTS,
  selectedSize,
  onSelectSize,
  isSubscription = false,
  onToggleSubscription,
  subscriptionDiscountPercent = 10,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Pack Size Selector */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-800">Select Pack Size:</span>
          <span className="text-slate-500 font-medium">
            Selected: <strong className="text-slate-900">{selectedSize}</strong>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {variants.map((v) => {
            const isSelected = v.size === selectedSize;
            const unitPrice = v.weight_grams ? Math.round((v.price / v.weight_grams) * 100) : null;
            const hasDiscount = v.compare_at_price && v.compare_at_price > v.price;
            const savings = hasDiscount
              ? Math.round(((v.compare_at_price! - v.price) / v.compare_at_price!) * 100)
              : null;

            return (
              <button
                key={v.size}
                type="button"
                onClick={() => onSelectSize(v)}
                className={`relative p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-800 bg-amber-50/60 ring-2 ring-amber-800/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {savings && (
                  <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-amber-600 text-white text-[10px] font-black rounded-md tracking-tight shadow-2xs">
                    SAVE {savings}%
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-serif font-black text-sm text-slate-900">{v.size}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-800 shrink-0" />}
                </div>
                <p className="text-xs font-bold text-slate-700 mt-1">₹{v.price.toLocaleString('en-IN')}</p>
                {unitPrice && (
                  <p className="text-[10px] text-slate-400 font-medium">₹{unitPrice}/100g</p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subscribe & Save Box */}
      {onToggleSubscription && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-100/80 rounded-xl text-amber-800">
              <Repeat className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-slate-900">Subscribe & Save</span>
                <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[9px] font-black rounded">
                  {subscriptionDiscountPercent}% OFF
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Fresh roast delivered automatically every 2-4 weeks. Cancel anytime.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onToggleSubscription(!isSubscription)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isSubscription
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isSubscription ? 'Active' : 'Apply'}
          </button>
        </div>
      )}
    </div>
  );
};

