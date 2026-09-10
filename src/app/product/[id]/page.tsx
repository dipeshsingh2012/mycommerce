'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ShieldCheck, ShoppingBag, ArrowLeft, Ruler, Star, Truck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PriceDisplay, FitmentBadge } from '@dipesh.singh/commerce-ui';

const CATALOG_DATA: Record<string, {
  id: string;
  name: string;
  category: 'coffee' | 'equipment';
  priceCents: number;
  compareAtCents?: number;
  badge?: string;
  heightCm?: number;
  rating: number;
  reviewCount: number;
  tasteNotes?: string[];
  specs?: Record<string, string>;
  description: string;
  image: string;
}> = {
  prod_baarbara_whiskey: {
    id: 'prod_baarbara_whiskey',
    name: 'Baarbara Estate - Whiskey Barrel Aged',
    category: 'coffee',
    priceCents: 125000,
    compareAtCents: 140000,
    badge: 'EXCLUSIVE HARVEST',
    rating: 4.9,
    reviewCount: 128,
    tasteNotes: ['Ripe Banana', 'Red Plum', 'Whiskey Oak', 'Caramelized Honey'],
    description:
      'Aged in authentic charred oak whiskey barrels for 60 days before drum roasting. Yields an intoxicating aroma with rich fruit notes and zero alcohol.',
    specs: {
      'Estate': 'Baarbara Estate, Chikmagalur',
      'Altitude': '1,450 MASL',
      'Roast Level': 'Medium Light',
      'Process': 'Whiskey Barrel Washed',
    },
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&auto=format&fit=crop&q=80',
  },
  prod_attikan_estate: {
    id: 'prod_attikan_estate',
    name: 'Attikan Estate - Dark Roast',
    category: 'coffee',
    priceCents: 55000,
    badge: 'BESTSELLER',
    rating: 5.0,
    reviewCount: 342,
    tasteNotes: ['Dark Chocolate', 'Roasted Almonds', 'Dried Figs', 'Heavy Crema'],
    description:
      'Grown in the Biligiriranga Hills. A rich, low-acidity classic tailored for milk-based espresso drinks, mokapots, and French press brews.',
    specs: {
      'Estate': 'Attikan Estate, BR Hills',
      'Altitude': '1,600 MASL',
      'Roast Level': 'Dark Espresso',
      'Process': 'Pulp Sun-Dried',
    },
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=800&auto=format&fit=crop&q=80',
  },
  prod_silver_oak_blend: {
    id: 'prod_silver_oak_blend',
    name: 'Silver Oak Blend - Medium Roast',
    category: 'coffee',
    priceCents: 52000,
    rating: 4.8,
    reviewCount: 95,
    tasteNotes: ['Hazelnut', 'Mild Citrus', 'Wild Honey'],
    description:
      'Our house morning blend pairing Chikmagalur washed arabica with sweet natural lots. Smooth, comforting, and sweet.',
    specs: {
      'Origin': 'Western Ghats Single Estates',
      'Roast Level': 'Medium',
      'Process': 'Washed & Natural Blend',
    },
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80',
  },
  prod_breville_barista_touch: {
    id: 'prod_breville_barista_touch',
    name: 'Breville Barista Touch Impress Espresso Machine',
    category: 'equipment',
    priceCents: 8990000,
    compareAtCents: 9500000,
    badge: 'FLAGSHIP GEAR',
    heightCm: 41.0,
    rating: 5.0,
    reviewCount: 47,
    description:
      'Automated touchscreen espresso system featuring assisted tamping, automated precision dosing, and intelligent microfoam texturing with real-time barista feedback.',
    specs: {
      'Dimensions': '32.2 x 40.7 x 32.2 cm',
      'Counter Clearance': 'Requires 45 cm standard cabinet clearance',
      'Boiler': 'ThermoJet 3-second rapid heating',
      'Hopper Capacity': '340g bean capacity with airtight lock',
    },
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
  },
  prod_fellow_ode_gen2: {
    id: 'prod_fellow_ode_gen2',
    name: 'Fellow Ode Brew Grinder Gen 2',
    category: 'equipment',
    priceCents: 2850000,
    badge: 'PRECISION BURR',
    heightCm: 24.1,
    rating: 4.9,
    reviewCount: 84,
    description:
      'Engineered for pour-over and drip brewing with commercial-grade 64mm flat burrs, anti-static technology, and single-dose zero-retention loading.',
    specs: {
      'Dimensions': '24.1 x 12.0 x 23.9 cm',
      'Burrs': '64mm stainless steel flat burrs',
      'Capacity': '100g single-dose load',
      'Clearance': 'Fits under any cabinet (24.1 cm height)',
    },
    image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=800&auto=format&fit=crop&q=80',
  },
};

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : 'prod_baarbara_whiskey';

  const product = CATALOG_DATA[id] || CATALOG_DATA['prod_baarbara_whiskey'];
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCart = () => {
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
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
