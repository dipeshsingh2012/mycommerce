'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { PriceDisplay } from '@dipesh.singh/commerce-ui';

export default function CheckoutPage() {
  const router = useRouter();
  const [isOrdered, setIsOrdered] = useState(false);

  if (isOrdered) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-5 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">Order Confirmed!</h1>
        <p className="text-slate-600 text-xs max-w-sm mx-auto leading-relaxed">
          Order #HILJ-84920 has been placed. Our roasters will prepare your freshly batch-roasted coffee beans today.
        </p>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
        >
          Return to Storefront
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
          <Lock className="w-6 h-6 text-amber-800" />
          Secure Checkout
        </h1>
        <button
          type="button"
          onClick={() => router.push('/cart')}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Bag
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900">Shipping Details</h2>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Dipesh Singh"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-700"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Shipping Address</label>
              <input
                type="text"
                defaultValue="42 Indiranagar 100ft Road, Bangalore, KA"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-700"
              />
            </div>
          </div>

          <h2 className="text-sm font-bold text-slate-900 pt-3">Payment Method</h2>
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center gap-3 text-xs text-amber-900 font-semibold">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            <span>Encrypted UPI / Card Payment Simulation</span>
          </div>

          <button
            type="button"
            onClick={() => setIsOrdered(true)}
            className="w-full py-3.5 bg-amber-800 hover:bg-amber-900 text-white rounded-2xl text-xs font-bold transition-all shadow-md mt-4"
          >
            Pay & Place Order
          </button>
        </div>

        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5 space-y-4 h-fit">
          <h3 className="text-xs font-bold text-slate-800">Order Preview</h3>
          <div className="space-y-2 text-xs text-slate-600 border-b border-slate-200 pb-3">
            <p>1x Baarbara Whiskey Barrel Aged (250g)</p>
            <p>2x Attikan Estate Dark Roast (250g)</p>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-900">
            <span>Total to Pay:</span>
            <span>₹ 2,350</span>
          </div>
        </div>
      </div>
    </div>
  );
}
