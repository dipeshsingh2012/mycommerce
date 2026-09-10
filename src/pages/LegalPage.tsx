import React from 'react';
import { Shield, FileText } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="py-6 sm:py-10 max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-800">
          {isPrivacy ? <Shield className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          <span>Legal & Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
          {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        </h1>
        <p className="text-xs text-stone-500">
          Last updated: September 10, {new Date().getFullYear()} • Hiljhil Specialty Coffee Pvt. Ltd.
        </p>
      </div>

      {/* Content Body */}
      <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed space-y-6">
        {isPrivacy ? (
          <>
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-stone-900">1. Information We Collect</h2>
              <p>
                When you visit Hiljhil Cafe (hiljhil.cafe) or purchase coffee beans and espresso hardware, we collect necessary customer details including your name, shipping address, billing details, phone number, and email. We also log browser analytics, anonymized session fitment inputs, and device cookies to optimize store navigation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-stone-900">2. How We Use Your Data</h2>
              <p>
                Your information is used strictly to fulfill roastery orders, coordinate white-glove hardware delivery, process subscription recurring renewals, and send roast notifications. We never sell, rent, or trade your personal data to third-party brokers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-stone-900">3. Computer Vision & CounterCheck Diagnostics</h2>
              <p>
                When using CounterCheck Spatial AI to verify overhead kitchen cabinet clearance, images captured by your camera are processed on-device in WebAssembly or securely via our computer vision pipeline. Fitment snapshots are never retained beyond your session without explicit permission.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-stone-900">4. Your Data Rights</h2>
              <p>
                You may request full export, deletion, or modification of your account credentials and order history at any time by contacting privacy@hiljhil.cafe.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-stone-900">1. Storefront & Purchase Agreement</h2>
              <p>
                By placing an order for roasted coffee beans, brewing equipment, or recurring subscriptions through Hiljhil Cafe, you agree to our standard terms and conditions. All prices are listed in Indian Rupees (INR) and include applicable GST taxes unless stated otherwise.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-stone-900">2. Roasted-to-Order & Perishable Goods</h2>
              <p>
                Our coffees are roasted in micro-batches and shipped within 24 to 48 hours of degas. Because coffee is an artisanal perishable product, returns on opened bean bags cannot be accepted. If you receive damaged packaging or notice a defect, our customer care team will dispatch an immediate replacement.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-stone-900">3. White-Glove Hardware Warranty & Fitment Guarantee</h2>
              <p>
                All espresso machines (Breville, Gaggia, etc.) include official manufacturer warranty coverage. When verified through our CounterCheck spatial fitment tool with a Verified Fitment Badge, customers are protected with complimentary 30-day hassle-free exchange if the physical unit cannot clear kitchen cabinets.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-stone-900">4. Subscriptions & Billing</h2>
              <p>
                The Roasters Club recurring subscriptions can be modified, paused, or canceled anytime via your account dashboard or by reaching out to support@hiljhil.cafe before your next dispatch date.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

