'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft } from 'lucide-react';
import { QuantityStepper, PriceDisplay } from '@dipesh.singh/commerce-ui';

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState([
    {
      id: 'prod_baarbara_whiskey',
      name: 'Baarbara Estate - Whiskey Barrel Aged (250g)',
      grind: 'Whole Bean',
      priceCents: 125000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=300',
    },
    {
      id: 'prod_attikan_estate',
      name: 'Attikan Estate - Dark Roast (250g)',
      grind: 'Aeropress Grind',
      priceCents: 55000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=300',
    },
  ]);

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      );
    }
  };

  const subtotalCents = items.reduce((acc, item) => acc + item.priceCents * item.quantity, 0);
  const shippingCents = subtotalCents > 100000 ? 0 : 9900;
  const grandTotalCents = subtotalCents + shippingCents;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
          <ShoppingBag className="w-7 h-7 text-amber-800" />
          Shopping Bag ({items.reduce((a, b) => a + b.quantity, 0)} items)
        </h1>
        <button
          type="button"
          onClick={() => router.push('/coffees')}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-200 p-8">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">Your bag is empty</h2>
          <p className="text-slate-500 text-sm">Explore our single origins, espresso machines, and brewing gear.</p>
          <button
            type="button"
            onClick={() => router.push('/coffees')}
            className="px-6 py-3 bg-amber-800 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-amber-900 transition-colors"
          >
            Explore Coffees
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 flex items-center gap-4 shadow-xs justify-between"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl shrink-0 bg-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{item.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Grind: {item.grind}</p>
                  <div className="mt-2">
                    <PriceDisplay cents={item.priceCents} currency="INR" size="sm" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <QuantityStepper
                    value={item.quantity}
                    min={1}
                    max={10}
                    onChange={(val) => updateQuantity(item.id, val)}
                  />
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 0)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-6 h-fit shadow-xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <PriceDisplay cents={subtotalCents} currency="INR" size="sm" />
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Standard Shipping</span>
                <span>{shippingCents === 0 ? 'FREE' : '₹ 99'}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-slate-900 text-sm">
                <span>Grand Total</span>
                <PriceDisplay cents={grandTotalCents} currency="INR" size="md" />
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push('/checkout')}
              className="w-full py-3.5 bg-amber-800 hover:bg-amber-900 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              Proceed to White-Glove Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
