'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import type { SliderProduct } from '@dipesh.singh/commerce-ui';

export type { SliderProduct };

export interface ProductSliderProps {
  title?: string;
  subtitle?: string;
  products: SliderProduct[];
  onBuyNow?: (product: SliderProduct, event: React.MouseEvent) => void;
  onQuickAdd?: (product: SliderProduct, event: React.MouseEvent) => void;
  onProductClick?: (product: SliderProduct, event: React.MouseEvent) => void;
  currencySymbol?: string;
  className?: string;
}

/**
 * Format price value to display string with currency symbol.
 */
const formatPrice = (price: string | number, symbol = '₹'): string => {
  if (typeof price === 'number') {
    return `${symbol} ${price.toLocaleString('en-IN')}`;
  }
  if (typeof price === 'string') {
    const trimmed = price.trim();
    if (trimmed.startsWith('₹') || trimmed.startsWith('$') || trimmed.startsWith('€') || trimmed.startsWith('£')) {
      return trimmed;
    }
    return `${symbol} ${trimmed}`;
  }
  return String(price);
};

export const ProductSlider: React.FC<ProductSliderProps> = ({
  title = 'Bestseller Coffees',
  subtitle,
  products = [],
  onBuyNow,
  onQuickAdd,
  onProductClick,
  currencySymbol = '₹',
  className = '',
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update arrow disabled states based on scroll position
  const updateScrollBounds = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    // Tolerance of 6px to account for fractional pixel rounding
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    updateScrollBounds();
    el.addEventListener('scroll', updateScrollBounds, { passive: true });
    window.addEventListener('resize', updateScrollBounds);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateScrollBounds();
      });
      ro.observe(el);
      Array.from(el.children).forEach((child) => ro?.observe(child));
    }

    return () => {
      el.removeEventListener('scroll', updateScrollBounds);
      window.removeEventListener('resize', updateScrollBounds);
      if (ro) ro.disconnect();
    };
  }, [updateScrollBounds, products]);

  const handleScroll = (direction: 'prev' | 'next') => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollOffset = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'next' ? scrollOffset : -scrollOffset,
      behavior: 'smooth',
    });
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className={`w-full py-2 sm:py-4 ${className}`}>
      {/* Header Section */}
      <div className="flex items-end justify-between gap-4 mb-4 sm:mb-6 px-1">
        <div>
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 font-normal tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-sans">
              {subtitle}
            </p>
          )}
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleScroll('prev')}
            disabled={!canScrollLeft}
            aria-label="Previous products"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-700 hover:border-stone-800 hover:bg-stone-50 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('next')}
            disabled={!canScrollRight}
            aria-label="Next products"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-700 hover:border-stone-800 hover:bg-stone-50 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={sliderRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 pt-1 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {products.map((product) => {
          const targetUrl = product.productUrl || `/product/${product.id}`;

          return (
            <article
              key={product.id}
              className="w-[76vw] max-w-[280px] sm:max-w-none sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] shrink-0 snap-start flex flex-col group"
            >
              {/* 1:1 Square Image Container */}
              <div className="relative w-full aspect-square bg-stone-100 rounded-2xl overflow-hidden select-none">
                <Link
                  href={targetUrl}
                  onClick={(e) => {
                    if (onProductClick) {
                      e.preventDefault();
                      onProductClick(product, e);
                    }
                  }}
                  className="block w-full h-full"
                  tabIndex={-1}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </Link>

                {/* Promotional Badge (e.g., BESTSELLER, LIMITED RESERVE) */}
                {product.badge && (
                  <div className="absolute top-2.5 left-2.5 bg-[#fed700] text-stone-900 font-extrabold text-[10px] tracking-wider px-2.5 py-0.5 uppercase rounded-sm z-10 select-none shadow-xs">
                    {product.badge}
                  </div>
                )}

                {/* Floating Price Pill */}
                <div className="absolute bottom-2.5 left-2.5 bg-[#d7ecf2] text-stone-900 font-extrabold text-xs sm:text-sm px-3 py-1 rounded-lg z-10 select-none shadow-xs">
                  {formatPrice(product.price, currencySymbol)}
                </div>
              </div>

              {/* Product Meta / Title & Taste Notes */}
              <div className="mt-3 flex flex-col flex-1">
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm uppercase tracking-wide truncate">
                  <Link
                    href={targetUrl}
                    onClick={(e) => {
                      if (onProductClick) {
                        e.preventDefault();
                        onProductClick(product, e);
                      }
                    }}
                    title={product.title}
                    className="hover:text-amber-800 transition-colors focus:outline-hidden focus:underline"
                  >
                    {product.title}
                  </Link>
                </h3>

                {product.subtitle && (
                  <p
                    className="text-xs text-stone-500 line-clamp-1 mt-1 font-normal"
                    title={product.subtitle}
                  >
                    {product.subtitle}
                  </p>
                )}

                {/* Action Bar (Split Button: BUY NOW + Add) */}
                <div className="mt-3.5 flex items-stretch w-full bg-[#82b9c7] text-white rounded-xl overflow-hidden shadow-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onBuyNow) {
                        onBuyNow(product, e);
                      }
                    }}
                    className="flex-1 py-2.5 px-3 text-center text-xs font-bold tracking-wider uppercase text-white hover:bg-black/10 active:bg-black/20 transition-colors select-none cursor-pointer"
                    aria-label={`Buy ${product.title} now`}
                  >
                    BUY NOW
                  </button>
                  <div className="w-[1px] bg-white/40 self-stretch my-1" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onQuickAdd) {
                        onQuickAdd(product, e);
                      }
                    }}
                    className="px-3.5 py-2.5 flex items-center justify-center text-white hover:bg-black/10 active:bg-black/20 transition-colors select-none cursor-pointer"
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
