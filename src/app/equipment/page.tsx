'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Ruler, ShoppingBag } from 'lucide-react';
import { FitmentBadge } from '@dipesh.singh/commerce-ui';
import { fetchEquipment, ProductItem } from '@/lib/catalogApi';

export default function EquipmentPage() {
  const router = useRouter();
  const [equipment, setEquipment] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxHeight, setMaxHeight] = useState<number>(45);

  useEffect(() => {
    async function loadEquipment() {
      try {
        setLoading(true);
        const data = await fetchEquipment();
        setEquipment(data);
      } catch (err) {
        console.error('Failed to load equipment from catalog service:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEquipment();
  }, []);

  const filteredGear = equipment.filter((item) => !item.heightCm || item.heightCm <= maxHeight);

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

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-500">Loading equipment from catalog service...</p>
        </div>
      ) : filteredGear.length === 0 ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          No hardware items found fitting beneath {maxHeight} cm.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredGear.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group p-5 space-y-4"
            >
              <Link href={`/product/${prod.id}`} className="block">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {prod.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-400 text-slate-900 text-[10px] font-black rounded-md tracking-wider">
                      {prod.badge}
                    </span>
                  )}
                </div>
              </Link>

              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/product/${prod.id}`} className="hover:text-amber-800">
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {prod.name}
                    </h3>
                  </Link>
                  <span className="text-base font-black text-slate-900 shrink-0">
                    ₹ {(prod.priceCents / 100).toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {prod.description}
                </p>
                {prod.heightCm && (
                  <div className="pt-2">
                    <FitmentBadge
                      status="verified"
                      label={`Height: ${prod.heightCm} cm (Fits under standard ${maxHeight} cm cabinets)`}
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => router.push(`/product/${prod.id}`)}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors text-center"
                >
                  VIEW SPECS
                </button>
                <button
                  type="button"
                  onClick={() => router.push(`/product/${prod.id}`)}
                  className="p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-colors"
                  title="View Equipment Details"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
