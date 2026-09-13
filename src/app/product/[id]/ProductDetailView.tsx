'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Ruler, Star, CheckCircle2, ShieldCheck, Truck, RotateCcw, PackageCheck } from 'lucide-react';
import { PriceDisplay, FitmentBadge } from '@dipesh.singh/commerce-ui';
import type { ProductItem } from '@/lib/catalogApi';
import {
  CoffeeTerroirGrid,
  SensoryMeters,
  BaristaBrewGuide,
  PackSizeSelector,
  GrindSelector,
  EstateProvenanceCard,
  CoffeeStorySection,
} from '@/components/coffee';

interface Props {
  product: ProductItem;
}

export function ProductDetailView({ product }: Props) {
  const router = useRouter();

  // Variant & Pricing State
  const variants = product.variants && product.variants.length > 0 ? product.variants : undefined;
  const initialSize = variants ? variants[0].size : '250g';
  const [selectedSize, setSelectedSize] = useState<string>(initialSize);
  const [selectedVariant, setSelectedVariant] = useState(variants ? variants[0] : null);
  const [isSubscription, setIsSubscription] = useState(false);

  // Grind Selection
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');

  // Gallery State
  const galleryImages = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images.map((img) => img.src);
    }
    return [product.image];
  }, [product.image, product.images]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedToast, setAddedToast] = useState(false);

  // Dynamic Price calculation based on variant and subscription discount
  const activePriceCents = useMemo(() => {
    let base = selectedVariant ? Math.round(selectedVariant.price * 100) : product.priceCents;
    if (isSubscription) {
      base = Math.round(base * 0.9); // 10% subscription discount
    }
    return base;
  }, [selectedVariant, product.priceCents, isSubscription]);

  const activeCompareAtCents = useMemo(() => {
    if (isSubscription) {
      return selectedVariant ? Math.round(selectedVariant.price * 100) : product.priceCents;
    }
    return selectedVariant?.compare_at_price
      ? Math.round(selectedVariant.compare_at_price * 100)
      : product.compareAtCents;
  }, [selectedVariant, product.compareAtCents, product.priceCents, isSubscription]);

  const handleAddToCart = () => {
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3500);
  };

  const isCoffee = product.category === 'coffee';
  const specsData = product.specsData;

  return (
    <div className="space-y-10 py-6 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-amber-800">Home</Link>
        <span>/</span>
        <Link
          href={isCoffee ? '/coffees' : '/equipment'}
          className="hover:text-amber-800 capitalize"
        >
          {isCoffee ? 'Specialty Coffees' : 'Barista Equipment'}
        </Link>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Hero Section: Gallery & Purchase Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Multi-Angle Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xs group">
            <img
              src={galleryImages[activeImageIndex] || product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-slate-900 text-[11px] font-black rounded-lg tracking-wider shadow-xs uppercase">
                {product.badge}
              </span>
            )}
            {isSubscription && (
              <span className="absolute top-4 right-4 px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-lg tracking-wide shadow-xs uppercase">
                10% Recurring Save
              </span>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {galleryImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-amber-800 ring-2 ring-amber-800/20 shadow-xs'
                      : 'border-slate-200 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Trust Badges */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center">
              <Truck className="w-4 h-4 text-slate-700 mb-1" />
              <span className="text-[11px] font-bold text-slate-800">Fresh Roasted</span>
              <span className="text-[10px] text-slate-400">Shipped within 24h</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800">Direct Trade</span>
              <span className="text-[10px] text-slate-400">100% Single Origin</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center">
              <PackageCheck className="w-4 h-4 text-amber-700 mb-1" />
              <span className="text-[11px] font-bold text-slate-800">Degas Valve</span>
              <span className="text-[10px] text-slate-400">Nitrogen Sealed</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Pricing, Variant Selectors & CTAs */}
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

            {product.estateName && (
              <p className="text-xs font-semibold text-amber-900 tracking-wide uppercase">
                {product.estateName} {product.region ? `• ${product.region}` : ''}
              </p>
            )}

            <div className="pt-2 flex items-baseline gap-3">
              <PriceDisplay
                cents={activePriceCents}
                compareAtCents={activeCompareAtCents}
                currency="INR"
                size="xl"
              />
              <span className="text-xs text-slate-400 font-medium">Inclusive of all taxes</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Taste Notes (for coffee) */}
          {isCoffee && product.tasteNotes && product.tasteNotes.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Aromatics & Tasting Notes
              </span>
              <div className="flex flex-wrap gap-2">
                {product.tasteNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-full text-xs font-extrabold shadow-2xs"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Multi-Size Variant Selector */}
          {variants && variants.length > 0 && (
            <PackSizeSelector
              variants={variants}
              selectedSize={selectedSize}
              onSelectSize={(v) => {
                setSelectedSize(v.size);
                setSelectedVariant(v);
              }}
              isSubscription={isSubscription}
              onToggleSubscription={(sub) => setIsSubscription(sub)}
            />
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
                label={`Height: ${product.heightCm} cm — Fits under standard 45cm wall cabinets with headroom`}
              />
            </div>
          )}

          {/* Grind Selection (for coffee) */}
          {isCoffee && (
            <GrindSelector
              selectedGrind={selectedGrind}
              onSelectGrind={(grind) => setSelectedGrind(grind)}
            />
          )}

          {/* Action CTAs */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/checkout')}
              className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black transition-all shadow-md text-center cursor-pointer tracking-wide"
            >
              {isSubscription ? 'START SUBSCRIPTION' : 'BUY NOW'}
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              className="py-4 px-6 bg-amber-800 hover:bg-amber-900 text-white rounded-2xl text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer tracking-wide"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag
            </button>
          </div>

          {addedToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Added {product.name} ({selectedSize} • {selectedGrind}) to your shopping bag!
            </div>
          )}

          {/* Equipment Specs Table */}
          {!isCoffee && product.specs && (
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

      {/* Specialty Coffee Deep Dive Sections */}
      {isCoffee && (
        <div className="space-y-8 pt-4">
          {/* 1. Terroir & Roasting Matrix */}
          <CoffeeTerroirGrid
            roastLevel={product.roastLevel || 'Medium'}
            bestEnjoyed={product.bestEnjoyed || 'black'}
            elevationM={product.elevationM || 1450}
            processMethod={product.processMethod || 'Oak Whiskey Barrel Aged Washed'}
            region={product.region || 'Baba Budangiri, Chikmagalur, Karnataka'}
            varietal={product.varietal || 'Arabica S795'}
          />

          {/* 2. Sensory Evaluation & Palate Profile */}
          <SensoryMeters
            sensoryScales={specsData?.sensory_scales}
            tasteNotes={product.tasteNotes}
          />

          {/* 3. Craft & Aging Narrative */}
          {specsData?.origin_story && (
            <CoffeeStorySection
              title="The Barrel Aging Craft & Bean Journey"
              story={specsData.origin_story}
              restingDays={product.restingPeriodDays || 10}
              restingNote={specsData.resting_note}
            />
          )}

          {/* 4. Estate Provenance & Farmer Heritage */}
          {specsData?.estate_details && (
            <EstateProvenanceCard
              estateName={specsData.estate_details.name}
              location={specsData.estate_details.location}
              coordinates={specsData.coordinates}
              heritage={specsData.estate_details.heritage}
              certifications={specsData.estate_details.certifications}
            />
          )}

          {/* 5. Barista Brew Guides */}
          <BaristaBrewGuide guides={specsData?.brew_guides} />
        </div>
      )}
    </div>
  );
}
