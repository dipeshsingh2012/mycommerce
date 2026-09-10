'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FilterPills, ProductSlider, SliderProduct } from '@dipesh.singh/commerce-ui';
import { ProtonButton } from '@dipesh.singh/proton/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const COFFEE_PRODUCTS: SliderProduct[] = [
  {
    id: 'prod_baarbara_whiskey',
    title: 'BAARBARA ESTATE - WHISKEY BARREL AGED',
    subtitle: 'Ripe banana, Red Plum, Whiskey Oak, Vanilla sweetness',
    price: '₹ 1,250',
    badge: 'NEW',
    imageUrl: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&auto=format&fit=crop&q=80',
    productUrl: '/coffees',
  },
  {
    id: 'prod_attikan_estate',
    title: 'ATTIKAN ESTATE - DARK ROAST',
    subtitle: 'Dark chocolate, Fig, Roasted Almonds, full-bodied espresso',
    price: '₹ 550',
    badge: 'BESTSELLER',
    imageUrl: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=600&auto=format&fit=crop&q=80',
    productUrl: '/coffees',
  },
  {
    id: 'prod_silver_oak_blend',
    title: 'SILVER OAK BLEND - MEDIUM ROAST',
    subtitle: 'Hazelnut, Honey, Crisp Green Apple, balanced morning brew',
    price: '₹ 520',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
    productUrl: '/coffees',
  },
  {
    id: 'prod_vienna_roast',
    title: 'VIENNA ROAST - DEEP & SMOKY',
    subtitle: 'Cocoa nibs, Burnt Caramel, Toasted walnut, heavy crema',
    price: '₹ 530',
    badge: 'POPULAR',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    productUrl: '/coffees',
  },
  {
    id: 'prod_cold_brew_blend',
    title: 'SUMMER COLD BREW BLEND - COARSE',
    subtitle: 'Sweet citrus, Milk Chocolate, stone fruits, low acidity',
    price: '₹ 580',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80',
    productUrl: '/coffees',
  },
  {
    id: 'prod_easy_pour_box',
    title: 'EASY POUR DRIP BAGS - 10 PACK',
    subtitle: 'Specialty single origin pour-overs without equipment. Just add hot water.',
    price: '₹ 450',
    badge: 'EASY BREW',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
    productUrl: '/coffees',
  },
];

export default function CoffeesPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="space-y-8 py-6">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Specialty Coffee Collection
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl">
          Single origin estate harvests, precision dark roasts, and easy-pour filter bags freshly roasted weekly in our roastery.
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All Roasts', 'Light & Fruity', 'Medium & Balanced', 'Dark & Smoky', 'Cold Brew & Easy Pour'].map((pill, i) => (
          <button
            key={pill}
            type="button"
            onClick={() => setActiveFilter(pill)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              (i === 0 && activeFilter === 'all') || activeFilter === pill
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-amber-700'
            }`}
          >
            {pill}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COFFEE_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-100">
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
              <div className="absolute bottom-3 left-3 bg-[#d7ecf2]/95 backdrop-blur-xs text-slate-900 px-3 py-1.5 rounded-lg text-xs font-black shadow-xs">
                {prod.price}
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug tracking-tight">
                  {prod.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {prod.subtitle}
                </p>
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
          </div>
        ))}
      </div>
    </div>
  );
}
