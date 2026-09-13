import React, { useState } from 'react';
import { Clock, Scale, Droplets, Thermometer, Gauge, ChevronRight, BookOpen } from 'lucide-react';
import type { BrewGuideItem } from '@/lib/catalogApi';

export interface BaristaBrewGuideProps {
  guides?: BrewGuideItem[];
  className?: string;
}

const DEFAULT_GUIDES: BrewGuideItem[] = [
  {
    method: 'AeroPress',
    time: '2:30 MINS',
    dose: '18G',
    water: '230ML',
    temp: '92°C',
    grind: 'Medium-Fine',
    ratio: '1:12.8',
    steps: [
      'Rinse paper filter and preheat AeroPress cylinder with hot water.',
      'Add 18g medium-fine coffee grounds into the chamber in standard position.',
      'Pour 60ml of 92°C water and stir gently for 30 seconds to bloom.',
      'Fill to 230ml, attach plunger, and press steadily for 45 seconds.',
    ],
  },
  {
    method: 'Pour Over',
    time: '3:15 MINS',
    dose: '15G',
    water: '250ML',
    temp: '93°C',
    grind: 'Medium',
    ratio: '1:16.7',
    steps: [
      'Rinse V60 paper filter with boiling water to discard paper taste.',
      'Add 15g medium grounds, leveling the bed.',
      'Pour 50ml bloom water and pause 45 seconds for degassing.',
      'Pour remaining 200ml in steady spiral concentric circles, finishing drawdown by 3:15.',
    ],
  },
  {
    method: 'Moka Pot',
    time: '2:45 MINS',
    dose: '18G',
    water: '120ML',
    temp: '50°C (Preheated)',
    grind: 'Fine-Medium',
    ratio: '1:6.7',
    steps: [
      'Fill lower chamber with preheated water up to the safety valve level.',
      'Fill funnel basket with 18g coffee without tamping or compacting.',
      'Brew on low-medium flame; remove immediately when golden hazel flow foams.',
      'Cool base under cold tap water to stop extraction.',
    ],
  },
  {
    method: 'Cold Brew',
    time: '16:00 HRS',
    dose: '50G',
    water: '450ML',
    temp: 'Chilled Water',
    grind: 'Coarse',
    ratio: '1:9.0',
    steps: [
      'Combine 50g coarse grounds with 450ml cold filtered water in an airtight jar.',
      'Gently stir to ensure even saturation.',
      'Steep in refrigerator for 16-18 hours.',
      'Strain through cloth/paper filter and serve over ice with an orange twist.',
    ],
  },
];

export const BaristaBrewGuide: React.FC<BaristaBrewGuideProps> = ({
  guides = DEFAULT_GUIDES,
  className = '',
}) => {
  const [activeMethodIndex, setActiveMethodIndex] = useState(0);

  if (!guides || guides.length === 0) return null;

  const currentGuide = guides[activeMethodIndex] || guides[0];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-700 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Barista Brew Guides & Extraction
          </span>
          <h3 className="text-xl font-serif font-bold text-slate-900 mt-0.5">
            How to Brew Like a Roaster
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-medium">Tested & Calibrated for this Harvest</span>
      </div>

      {/* Brew Method Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {guides.map((g, idx) => {
          const isActive = idx === activeMethodIndex;
          return (
            <button
              key={g.method}
              type="button"
              onClick={() => setActiveMethodIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {g.method}
            </button>
          );
        })}
      </div>

      {/* Parameters Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-2xs text-amber-700">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500">Brew Time</span>
            <p className="text-xs sm:text-sm font-black text-slate-900">{currentGuide.time}</p>
          </div>
        </div>

        <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-2xs text-amber-700">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500">Coffee Amount</span>
            <p className="text-xs sm:text-sm font-black text-slate-900">{currentGuide.dose}</p>
          </div>
        </div>

        <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-2xs text-amber-700">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500">Water Volume</span>
            <p className="text-xs sm:text-sm font-black text-slate-900">{currentGuide.water}</p>
          </div>
        </div>

        <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-2xs text-amber-700">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500">Water Temp</span>
            <p className="text-xs sm:text-sm font-black text-slate-900">{currentGuide.temp}</p>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-2xs text-amber-700">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500">Grind Size</span>
            <p className="text-xs sm:text-sm font-black text-slate-900">{currentGuide.grind}</p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold uppercase text-slate-700">
            {currentGuide.method} Step-by-Step Recipe
          </span>
          {currentGuide.ratio && (
            <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
              Ratio {currentGuide.ratio}
            </span>
          )}
        </div>

        <ol className="space-y-2.5">
          {currentGuide.steps.map((step, sIdx) => (
            <li key={sIdx} className="flex items-start gap-3 text-xs leading-relaxed text-slate-700">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                {sIdx + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

