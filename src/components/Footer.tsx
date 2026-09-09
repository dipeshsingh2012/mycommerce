import React from 'react';
import { Ruler, ShieldCheck, Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      {/* Value props bar */}
      <div className="border-b border-slate-100 py-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-800">Zero-Error Fitment Guarantee</h5>
              <p className="text-[11px] text-slate-500">Free returns if verified appliance does not fit.</p>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-800">White-Glove Inside Delivery</h5>
              <p className="text-[11px] text-slate-500">Room-of-choice placement and package unboxing.</p>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-800">Official Brand Warranties</h5>
              <p className="text-[11px] text-slate-500">Direct factory warranty on every machine.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">mycommerce</span>
          <span>•</span>
          <span>Composable MACH Architecture</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Contentful GraphQL</span>
          <span>•</span>
          <span>commercetools Cart & Orders</span>
          <span>•</span>
          <span>Spatial AI Clearance</span>
        </div>
      </div>
    </footer>
  );
};
