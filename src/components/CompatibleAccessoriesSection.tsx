'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ShieldCheck,
  Check,
  ShoppingBag,
  AlertTriangle,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import type { CompatibleAccessory } from '@/lib/catalogApi';

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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Derive unique categories
  const categories = ['all', ...Array.from(new Set(accessories?.map((a) => a.category) || []))];

  const filteredAccessories =
    selectedCategory === 'all'
      ? accessories
      : accessories.filter((a) => a.category === selectedCategory);

  // Update slider navigation arrow states based on scroll position
  const updateScrollBounds = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    updateScrollBounds();
    el.addEventListener('scroll', updateScrollBounds, { passive: true });
    window.addEventListener('resize', updateScrollBounds);

    return () => {
      el.removeEventListener('scroll', updateScrollBounds);
      window.removeEventListener('resize', updateScrollBounds);
    };
  }, [updateScrollBounds, filteredAccessories]);

  // Smooth scroll handler
  const handleScroll = (direction: 'prev' | 'next') => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollOffset = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'next' ? scrollOffset : -scrollOffset,
      behavior: 'smooth',
    });
  };

  // Reset scroll when category filter changes
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  if (!accessories || accessories.length === 0) {
    return null;
  }

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
    <section className="mt-16 pt-12 border-t border-teal-900/10 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header with Title, Verification Badge, Category Filter & Slider Arrows */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            Guaranteed Fit Verification
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            Compatible Barista Gear & Workflow Tools
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
            Engineered and tested for zero-guesswork fitment with your{' '}
            <span className="font-semibold text-stone-900">{machineName}</span> ({collarDiameter}{' '}
            collar). Filtered for mechanical and spatial overhead clearance.
          </p>
        </div>

        {/* Header Right Zone: Slider Navigation Buttons */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => handleScroll('prev')}
            disabled={!canScrollLeft}
            aria-label="Previous accessories"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-700 hover:border-[#085454] hover:text-[#085454] hover:bg-teal-50/70 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-xs"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('next')}
            disabled={!canScrollRight}
            aria-label="Next accessories"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-700 hover:border-[#085454] hover:text-[#085454] hover:bg-teal-50/70 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-xs"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-150 shrink-0 ${
              selectedCategory === cat
                ? 'bg-[#085454] text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-teal-50 hover:text-teal-950'
            }`}
          >
            {formatCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Horizontal Carousel / Slider Track */}
      <div
        ref={sliderRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth pb-4 pt-1 px-1"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {filteredAccessories.map((item) => {
          const isAdded = addedIds[item.id];
          const fitLabel = getFitLabel(item.fits);
          const hasClearanceWarning = item.spatial?.requires_overhead_clearance;

          return (
            <article
              key={item.id}
              className={`w-[82vw] max-w-[290px] sm:w-[310px] md:w-[320px] shrink-0 [scroll-snap-align:start] flex flex-col justify-between rounded-2xl bg-white border p-5 transition-all duration-200 hover:shadow-md group ${
                hasClearanceWarning
                  ? 'border-amber-300 ring-1 ring-amber-300/40'
                  : 'border-stone-200/90 hover:border-teal-800/30'
              }`}
            >
              <div>
                {/* Optional Product Image Preview */}
                {item.image_url && (
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-50 mb-3.5 border border-stone-100 flex items-center justify-center select-none">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                  </div>
                )}

                {/* Top Badge Row */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-100 text-stone-700 uppercase tracking-wider">
                    {formatCategoryLabel(item.category)}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-teal-50 text-teal-900 border border-teal-200/70 uppercase">
                    <Check className="w-3 h-3 text-teal-700" />
                    {fitLabel}
                  </span>
                </div>

                {/* Spatial Clearance Warning Badge */}
                {item.spatial && item.spatial.adds_height_cm > 0 && (
                  <div
                    className={`mb-3 p-2.5 rounded-xl text-xs flex items-start gap-2 ${
                      hasClearanceWarning
                        ? 'bg-amber-50 text-amber-900 border border-amber-300'
                        : 'bg-teal-50/60 text-teal-950 border border-teal-100'
                    }`}
                  >
                    {hasClearanceWarning ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    ) : (
                      <Layers className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    )}
                    <div className="leading-tight">
                      <span className="font-bold text-[11px]">
                        {hasClearanceWarning
                          ? `⚠️ Adds +${item.spatial.adds_height_cm} cm height`
                          : `Adds +${item.spatial.adds_height_cm} cm height`}
                      </span>{' '}
                      <span className="opacity-80 text-[10px]">
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
                <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2 mb-2 group-hover:text-[#085454] transition-colors">
                  {item.name}
                </h3>

                {/* Description */}
                {item.description && (
                  <p className="text-xs text-stone-500 line-clamp-2 sm:line-clamp-3 leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Bottom Price & Add to Cart Row */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-2">
                <div>
                  <span className="block text-[9px] font-bold uppercase text-stone-400 tracking-wider">
                    Price
                  </span>
                  <span className="text-base sm:text-lg font-black text-stone-900">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  disabled={isAdded}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-150 select-none shadow-xs ${
                    isAdded
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-[#085454] hover:bg-[#063b3b] text-white active:scale-95'
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
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default CompatibleAccessoriesSection;
