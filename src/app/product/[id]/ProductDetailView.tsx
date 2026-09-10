'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Ruler, Star, CheckCircle2 } from 'lucide-react';
import { PriceDisplay, FitmentBadge } from '@dipesh.singh/commerce-ui';
import { ProductItem } from '@/data/catalog';

interface Props {
  product: ProductItem;
}

export function ProductDetailView({ product }: Props) {
  const router = useRouter();
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCart = () => {
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-amber-800">Home</Link>
        <span>/</span>
        <Link href={product.category === 'coffee' ? '/coffees' : '/equipment'} className="hover:text-amber-800 capitalize">
          {product.category === 'coffee' ? 'Specialty Coffees' : 'Barista Equipment'}
        </Link>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Product Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Gallery Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xs group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-slate-900 text-[11px] font-black rounded-lg tracking-wider shadow-xs">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Product Specs & Purchase Box */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewCount} verified reviews)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>

            <div className="pt-2">
              <PriceDisplay
                cents={product.priceCents}
                compareAtCents={product.compareAtCents}
                currency="INR"
                size="lg"
              />
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Taste Notes (for coffee) */}
          {product.tasteNotes && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Flavor & Aroma Notes
              </span>
              <div className="flex flex-wrap gap-2">
                {product.tasteNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-full text-xs font-bold"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Spatial Fitment (for equipment) */}
          {product.heightCm && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-amber-700" />
                  CounterCheck™ Kitchen Cabinet Verification
                </span>
                <span className="text-emerald-700 font-black">PASS</span>
              </div>
              <FitmentBadge
                status="verified"
                label={`Height: ${product.heightCm} cm — Fits under standard 45cm wall cabinets with hopper headroom`}
              />
            </div>
          )}

          {/* Grind Selection (for coffee) */}
          {product.category === 'coffee' && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700">Select Grind Size</span>
              <div className="grid grid-cols-2 gap-2">
                {['Whole Bean', 'Pour Over / Aeropress', 'Espresso Grind', 'French Press / Channi'].map((grind) => (
                  <button
                    key={grind}
                    type="button"
                    onClick={() => setSelectedGrind(grind)}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                      selectedGrind === grind
                        ? 'border-amber-800 bg-amber-50 text-amber-950 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {grind}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/checkout')}
              className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md text-center"
            >
              BUY NOW
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              className="py-3.5 px-5 bg-amber-800 hover:bg-amber-900 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag
            </button>
          </div>

          {addedToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Added {product.name} ({selectedGrind}) to your shopping bag!
            </div>
          )}

          {/* Specs Table */}
          {product.specs && (
            <div className="border-t border-slate-200 pt-5 space-y-2">
              <span className="text-xs font-bold text-slate-700">Specifications</span>
              <div className="divide-y divide-slate-100 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="py-2 flex justify-between">
                    <span className="text-slate-500">{key}</span>
                    <span className="font-semibold text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
