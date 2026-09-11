'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, Coffee } from 'lucide-react';
import { ProductItem } from '@/lib/catalogApi';

interface CoffeesClientProps {
  initialProducts: ProductItem[];
}

export default function CoffeesClient({ initialProducts }: CoffeesClientProps) {
  const router = useRouter();
  const [products] = useState<ProductItem[]>(initialProducts);
  const [activeFilter, setActiveFilter] = useState('All Roasts');

  const filteredProducts = products.filter((prod) => {
    if (activeFilter === 'All Roasts') return true;
    const roast = (prod.roastLevel || '').toLowerCase();
    const name = prod.name.toLowerCase();
    const desc = prod.description.toLowerCase();

    if (activeFilter === 'Light & Fruity') {
      return roast.includes('light') || desc.includes('fruity') || desc.includes('floral');
    }
    if (activeFilter === 'Medium & Balanced') {
      return (roast.includes('medium') && !roast.includes('dark')) || desc.includes('balanced') || desc.includes('smooth');
    }
    if (activeFilter === 'Dark & Smoky') {
      return roast.includes('dark') || roast.includes('vienna') || desc.includes('smoky');
    }
    if (activeFilter === 'Cold Brew & Easy Pour') {
      return name.includes('cold brew') || name.includes('drip') || name.includes('pour');
    }
    return true;
  });

  return (
    <div className="space-y-8 py-6">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Specialty Coffee Collection
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl">
          Single origin estate harvests, producer nano-lots, and signature roaster blends freshly roasted weekly at Hiljhil Roasters.
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All Roasts', 'Light & Fruity', 'Medium & Balanced', 'Dark & Smoky', 'Cold Brew & Easy Pour'].map((pill) => (
          <button
            key={pill}
            type="button"
            onClick={() => setActiveFilter(pill)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeFilter === pill
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-amber-700'
            }`}
          >
            {pill}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          No coffee lots found matching "{activeFilter}".
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const subtitle =
              prod.tasteNotes && prod.tasteNotes.length > 0
                ? prod.tasteNotes.join(', ')
                : prod.description;

            return (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <Link href={`/product/${prod.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    {prod.image ? (
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Coffee className="w-12 h-12" />
                      </div>
                    )}
                    {prod.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-400 text-slate-900 text-[10px] font-black rounded-md tracking-wider">
                        {prod.badge}
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3 bg-[#d7ecf2]/95 backdrop-blur-xs text-slate-900 px-3 py-1.5 rounded-lg text-xs font-black shadow-xs">
                      ₹ {(prod.priceCents / 100).toLocaleString('en-IN')}
                    </div>
                  </div>
                </Link>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${prod.id}`} className="hover:text-amber-800">
                      <h3 className="font-bold text-slate-900 text-sm leading-snug tracking-tight">
                        {prod.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {subtitle}
                    </p>
                    {prod.estateName && (
                      <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700">
                        {prod.estateName}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => router.push(`/product/${prod.id}`)}
                      className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors text-center"
                    >
                      VIEW LOT
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push(`/product/${prod.id}`)}
                      className="p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-colors"
                      title="View Coffee Details"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

