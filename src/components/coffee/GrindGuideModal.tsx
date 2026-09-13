import React from 'react';
import { X, HelpCircle, Coffee, CheckCircle2 } from 'lucide-react';

export interface GrindGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GRIND_DATA = [
  {
    name: 'Whole Bean',
    tag: 'Longest Freshness',
    description: 'Unbroken roasted coffee beans. Best if you own a burr grinder and grind immediately prior to brewing for maximum aromatic preservation.',
    brewingMethods: 'All brew methods (grind fresh at home)',
  },
  {
    name: 'Cold Brew / Channi',
    tag: 'Extra Coarse',
    description: 'Large, rough particles like sea salt. Prevents over-extraction and sludge during 16-24 hour slow immersion.',
    brewingMethods: 'Cold Brew pitchers, French Press, Cloth Channi',
  },
  {
    name: 'French Press',
    tag: 'Coarse',
    description: 'Distinct granular particles. Permits complete water saturation without clogging standard metal mesh filters.',
    brewingMethods: 'French Press / Bodum Cafetière',
  },
  {
    name: 'Pour Over (V60)',
    tag: 'Medium',
    description: 'Resembles coarse sand. Calibrated for paper cone filters to achieve balanced flow rate and sweet acidity.',
    brewingMethods: 'Hario V60, Kalita Wave, Chemex, Drip Coffee Makers',
  },
  {
    name: 'AeroPress',
    tag: 'Medium-Fine',
    description: 'Slightly finer than table salt. Optimized for short 1-2 minute immersion and pneumatic plunger extraction.',
    brewingMethods: 'AeroPress (Standard & Inverted), Siphon',
  },
  {
    name: 'Moka Pot',
    tag: 'Fine-Medium',
    description: 'Fine consistency tailored to create ideal steam resistance in stovetop moka pots without channeling.',
    brewingMethods: 'Bialetti Moka Pot, Stovetop Espresso',
  },
  {
    name: 'Espresso Grind',
    tag: 'Fine',
    description: 'Very fine, flour-like texture with slight grit. Formulated to resist 9 bars of machine pressure for velvety crema.',
    brewingMethods: 'Home & Commercial Pump Espresso Machines',
  },
  {
    name: 'South Indian Filter',
    tag: 'Very Fine',
    description: 'Traditional micro-fine grind that allows boiling water to percolate through the pierced brass or stainless steel chamber for rich decoction.',
    brewingMethods: 'Traditional South Indian Brass/Steel Filter',
  },
];

export const GrindGuideModal: React.FC<GrindGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-amber-50/50">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              Barista Grind Guide
            </span>
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Which Grind Size Should You Choose?
            </h2>
            <p className="text-xs text-slate-500">
              Grind size controls how fast water extracts flavor from coffee. Match your brewing equipment below:
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Grind List */}
        <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-100">
          {GRIND_DATA.map((item, idx) => (
            <div key={idx} className={idx > 0 ? 'pt-4 space-y-1.5' : 'space-y-1.5'}>
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-700" />
                  {item.name}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tight bg-amber-100 text-amber-800">
                  {item.tag}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              <p className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Ideal for: <span className="text-slate-700">{item.brewingMethods}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Got It, Back to Product
          </button>
        </div>
      </div>
    </div>
  );
};

