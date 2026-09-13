import React from 'react';
import { Award, Eye } from 'lucide-react';

export interface SensoryScales {
  acidity?: number;
  sweetness?: number;
  body?: number;
  bitterness?: number;
  roast_level?: number;
}

export interface SensoryMetersProps {
  sensoryScales?: SensoryScales;
  tasteNotes?: string[];
  className?: string;
}

export const SensoryMeters: React.FC<SensoryMetersProps> = ({
  sensoryScales = { acidity: 2.5, sweetness: 4.5, body: 4.0, bitterness: 2.0 },
  tasteNotes = ['Ripe Banana', 'Red Plum', 'Whiskey Oak', 'Cocoa', 'Sweet Cardamom', 'Irish Cream'],
  className = '',
}) => {
  const meters = [
    {
      label: 'Acidity',
      score: sensoryScales.acidity ?? 3,
      descriptor: (score: number) => (score > 3.5 ? 'Bright & Winey' : score > 2 ? 'Gentle Citrus' : 'Mellow & Low'),
      color: 'bg-amber-500',
    },
    {
      label: 'Sweetness',
      score: sensoryScales.sweetness ?? 4,
      descriptor: (score: number) => (score > 4 ? 'Honey & Caramel' : score > 2.5 ? 'Cane Sugar' : 'Subtle'),
      color: 'bg-orange-500',
    },
    {
      label: 'Body',
      score: sensoryScales.body ?? 4,
      descriptor: (score: number) => (score > 3.8 ? 'Silky & Syrupy' : score > 2.5 ? 'Medium Creamy' : 'Light Tea-Like'),
      color: 'bg-amber-800',
    },
    {
      label: 'Bitterness',
      score: sensoryScales.bitterness ?? 2,
      descriptor: (score: number) => (score > 3.5 ? 'Dark Cacao & Roast' : score > 2 ? 'Mild Cocoa Nibs' : 'Near Zero'),
      color: 'bg-stone-700',
    },
  ];

  return (
    <div className={`p-6 rounded-3xl bg-amber-50/50 border border-amber-200/80 shadow-2xs space-y-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            Sensory Evaluation & Cup Profile
          </span>
          <h3 className="text-lg font-serif font-bold text-slate-900 mt-0.5">
            Flavor Architecture & Palate Balance
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          Certified Q-Grader Cupped
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tasting Notes Cloud */}
        <div className="md:col-span-6 space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Aromatics & Cupping Notes
          </span>
          <div className="flex flex-wrap gap-2">
            {tasteNotes.map((note, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 bg-white text-slate-800 border border-amber-300/80 rounded-full text-xs font-extrabold shadow-2xs hover:bg-amber-100/60 transition-colors"
              >
                {note}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed pt-1">
            Cupped at 12 minutes off brew. Complex bouquet layered with gentle oak fermentation sweetness, tropical fruit esters, and clean cocoa finish.
          </p>
        </div>

        {/* Right Column: 4 Sensory Rating Bars */}
        <div className="md:col-span-6 space-y-3.5 bg-white p-4 rounded-2xl border border-amber-100 shadow-2xs">
          {meters.map((m, idx) => {
            const rawScore = m.score;
            const fullDots = Math.floor(rawScore);
            const hasHalf = rawScore - fullDots >= 0.3;

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">{m.label}</span>
                  <span className="text-slate-500 text-[11px] font-medium">{m.descriptor(rawScore)}</span>
                </div>
                {/* 5-segment meter */}
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((seg) => {
                    const isFilled = seg <= fullDots;
                    const isPartial = !isFilled && seg === fullDots + 1 && hasHalf;
                    return (
                      <div
                        key={seg}
                        className={`h-2 flex-1 rounded-full transition-all ${
                          isFilled
                            ? m.color
                            : isPartial
                            ? 'bg-amber-300'
                            : 'bg-slate-200'
                        }`}
                      />
                    );
                  })}
                  <span className="text-[11px] font-black text-slate-700 w-6 text-right">
                    {rawScore.toFixed(1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

