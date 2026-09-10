import React from 'react';
import { Ruler, ShieldCheck, Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      {/* Value props bar */}
      <div className="border-b border-slate-100 py-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-800">CounterCheck™ Fitment Assurance</h5>
              <p className="text-[11px] text-slate-500">Verify espresso machines fit your home coffee bar.</p>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-800">Fresh Roasts & In-Cafe Pickup</h5>
              <p className="text-[11px] text-slate-500">Pick up ready at the counter or shipped roast-to-order.</p>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-800">Artisanal Direct-Trade Sourcing</h5>
              <p className="text-[11px] text-slate-500">100% traceable specialty single origins and blends.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">Hiljhil Cafe & Roastery</span>
          <span>•</span>
          <span className="font-mono text-amber-700 font-semibold">hiljhil.cafe</span>
          <span>•</span>
          <span>Open Daily 7am – 9pm</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Specialty Coffee</span>
          <span>•</span>
          <span>Home Barista Gear</span>
          <span>•</span>
          <span>In-Store Pickup & Delivery</span>
        </div>
      </div>
    </footer>
  );
};
