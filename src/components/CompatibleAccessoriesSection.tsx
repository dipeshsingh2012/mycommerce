'use client';

import React, { useState } from 'react';
import { ShieldCheck, Check, ShoppingBag, AlertTriangle, Layers } from 'lucide-react';
import { CompatibleAccessory } from '@/lib/catalogApi';

interface CompatibleAccessoriesSectionProps {
  machineName: string;
  collarDiameter?: string;
  accessories: CompatibleAccessory[];
}

export function CompatibleAccessoriesSection({
  machineName,
  collarDiameter = '54mm',
  accessories,
}: CompatibleAccessoriesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  if (!accessories || accessories.length === 0) {
    return null;
  }

  // Derive unique categories
  const categories = ['all', ...Array.from(new Set(accessories.map((a) => a.category)))];

  const filteredAccessories =
    selectedCategory === 'all'
      ? accessories
      : accessories.filter((a) => a.category === selectedCategory);

  const handleAddToCart = (accessory: CompatibleAccessory) => {
    setAddedIds((prev) => ({ ...prev, [accessory.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [accessory.id]: false }));
    }, 2000);

    // Dispatch standard mycommerce cart events
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('cart:add', {
          detail: {
            id: accessory.id,
            name: accessory.name,
            priceCents: accessory.priceCents,
            sku: accessory.sku,
            quantity: 1,
            image: accessory.image_url,
          },
          bubbles: true,
        })
      );

      window.dispatchEvent(
        new CustomEvent('upsell:add-to-cart', {
          detail: { item: accessory },
          bubbles: true,
        })
      );
    }
  };

  function formatCategoryLabel(cat: string): string {
    if (cat === 'all') return 'All Compatible Gear';
    return cat
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function getFitLabel(fits: Record<string, string>): string {
    if (fits.collar_diameter && fits.collar_diameter !== 'universal') {
      return `Fits ${fits.collar_diameter}`;
    }
    if (fits.group_head_type) {
      return fits.group_head_type.replace(/_/g, ' ');
    }
    return 'Universal Fit';
  }

  return (
    <section className="mt-16 pt-12 border-t border-stone-200/80 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Guaranteed Fit Verification
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Compatible Barista Gear & Workflow Tools
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Engineered and tested for zero-guesswork fitment with your{' '}
            <span className="font-semibold text-stone-900">{machineName}</span> ({collarDiameter}{' '}
            collar). Filtered for mechanical and spatial overhead clearance.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-150 ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
              }`}
            >
              {formatCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredAccessories.map((item) => {
          const isAdded = addedIds[item.id];
          const fitLabel = getFitLabel(item.fits);
          const hasClearanceWarning = item.spatial?.requires_overhead_clearance;

          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between rounded-2xl bg-white border p-5 transition-all duration-200 hover:shadow-md ${
                hasClearanceWarning
                  ? 'border-amber-300 ring-1 ring-amber-300/40'
                  : 'border-stone-200/90 hover:border-stone-300'
              }`}
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 text-stone-700 uppercase tracking-wider">
                    {formatCategoryLabel(item.category)}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                    <Check className="w-3 h-3 text-emerald-600" />
                    {fitLabel}
                  </span>
                </div>

                {/* Spatial Clearance Warning Badge */}
                {item.spatial && item.spatial.adds_height_cm > 0 && (
                  <div
                    className={`mb-3 p-2.5 rounded-xl text-xs flex items-start gap-2 ${
                      hasClearanceWarning
                        ? 'bg-amber-50 text-amber-900 border border-amber-300'
                        : 'bg-stone-50 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {hasClearanceWarning ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    ) : (
                      <Layers className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                    )}
                    <div className="leading-tight">
                      <span className="font-bold">
                        {hasClearanceWarning
                          ? `⚠️ Adds +${item.spatial.adds_height_cm} cm height`
                          : `Adds +${item.spatial.adds_height_cm} cm height`}
                      </span>{' '}
                      <span className="opacity-80">
                        (Total: {item.spatial.total_height_cm} cm)
                      </span>
                      {hasClearanceWarning && (
                        <p className="text-[10px] text-amber-800 mt-1 font-medium">
                          Exceeds recommended overhead clearance. Check cabinet height.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* SKU */}
                {item.sku && (
                  <span className="block font-mono text-[10px] text-stone-400 uppercase tracking-wider mb-1">
                    {item.sku}
                  </span>
                )}

                {/* Name */}
                <h3 className="font-bold text-stone-900 text-base leading-snug line-clamp-2 mb-2">
                  {item.name}
                </h3>

                {/* Description */}
                {item.description && (
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Bottom Price & Add to Cart Row */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-2">
                <div>
                  <span className="block text-[10px] font-semibold uppercase text-stone-400">
                    Price
                  </span>
                  <span className="text-lg font-black text-stone-900">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={isAdded}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                    isAdded
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-95'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
