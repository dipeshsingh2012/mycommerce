'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Ruler, ShieldCheck, ShoppingBag } from 'lucide-react';
import { FitmentBadge } from '@dipesh.singh/commerce-ui';

const EQUIPMENT_PRODUCTS = [
  {
    id: 'prod_breville_barista_touch',
    title: 'BREVILLE BARISTA TOUCH IMPRESS',
    subtitle: 'Automated touchscreen espresso machine with precision dosing & auto-milking',
    price: '₹ 89,900',
    heightCm: 41.0,
    badge: 'FLAGSHIP',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'prod_fellow_ode_gen2',
    title: 'FELLOW ODE BREW GRINDER GEN 2',
    subtitle: '64mm flat burr precision grinder calibrated for pour-over, drip & French press',
    price: '₹ 28,500',
    heightCm: 24.1,
    badge: 'POPULAR',
    imageUrl: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'prod_timemore_chestnut_c3',
    title: 'TIMEMORE CHESTNUT C3 PRO MANUAL GRINDER',
    subtitle: 'Foldable handle hand grinder with S2C stainless steel burrs',
    price: '₹ 6,499',
    heightCm: 16.0,
    badge: 'PORTABLE',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'prod_hario_v60_kettle',
    title: 'HARIO BUONO GOOSENECK KETTLE 1.2L',
    subtitle: 'Ergonomic precision pour spout for temperature-controlled pour-overs',
    price: '₹ 4,200',
    heightCm: 14.5,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
  },
];

export default function EquipmentPage() {
  const router = useRouter();
  const [maxHeight, setMaxHeight] = useState<number>(45);

  const filteredGear = EQUIPMENT_PRODUCTS.filter((item) => item.heightCm <= maxHeight);

  return (
    <div className="space-y-8 py-6">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Brewing Hardware & Espresso Equipment
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl">
          Prosumer espresso machines, flat-burr grinders, and barista tools verified for countertop cabinet clearance via CounterCheck™.
        </p>
      </div>

      {/* CounterCheck Clearance Bar */}
      <div className="p-5 rounded-3xl bg-amber-50/80 border border-amber-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-800 text-white rounded-2xl shadow-xs">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              CounterCheck™ Cabinet Height Clearance Filter
              <span className="text-[11px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">
                Spatial Verified
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Only showing equipment that fits beneath your kitchen cabinets (under {maxHeight} cm).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="range"
            min="15"
            max="60"
            value={maxHeight}
            onChange={(e) => setMaxHeight(Number(e.target.value))}
            className="w-36 accent-amber-800 cursor-pointer"
          />
          <span className="text-sm font-bold text-amber-900 min-w-[60px]">
            ≤ {maxHeight} cm
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredGear.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group p-5 space-y-4"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
              <img
                src={prod.imageUrl}
                alt={prod.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {prod.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-400 text-slate-900 text-[10px] font-black rounded-md tracking-wider">
                  {prod.badge}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {prod.title}
                </h3>
                <span className="text-base font-black text-slate-900 shrink-0">
                  {prod.price}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {prod.subtitle}
              </p>
              <div className="pt-2">
                <FitmentBadge
                  status="verified"
                  label={`Height: ${prod.heightCm} cm (Fits under standard ${maxHeight} cm cabinets)`}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push('/checkout')}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                BUY NOW
              </button>
              <button
                type="button"
                onClick={() => router.push('/cart')}
                className="p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-colors"
                title="Add to Cart"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
