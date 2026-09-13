import React, { useState } from 'react';
import { HelpCircle, Coffee, Check } from 'lucide-react';
import { GrindGuideModal } from './GrindGuideModal';

export interface GrindSelectorProps {
  selectedGrind: string;
  onSelectGrind: (grind: string) => void;
  grindOptions?: string[];
  className?: string;
}

const DEFAULT_GRINDS = [
  'Whole Bean',
  'AeroPress',
  'Pour Over (V60)',
  'Moka Pot',
  'Espresso Grind',
  'French Press',
  'South Indian Filter',
  'Cold Brew',
];

export const GrindSelector: React.FC<GrindSelectorProps> = ({
  selectedGrind,
  onSelectGrind,
  grindOptions = DEFAULT_GRINDS,
  className = '',
}) => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Coffee className="w-3.5 h-3.5 text-amber-700" />
          Select Grind Size:
        </span>
        <button
          type="button"
          onClick={() => setIsGuideOpen(true)}
          className="text-xs font-bold text-amber-800 hover:text-amber-900 underline flex items-center gap-1 cursor-pointer transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Grind Guide
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {grindOptions.map((grind) => {
          const isSelected = selectedGrind === grind;
          return (
            <button
              key={grind}
              type="button"
              onClick={() => onSelectGrind(grind)}
              className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                isSelected
                  ? 'border-amber-800 bg-amber-50 text-amber-950 ring-1 ring-amber-800/30 shadow-2xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <span className="truncate">{grind}</span>
              {isSelected && <Check className="w-3.5 h-3.5 text-amber-800 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Grind Guide Modal */}
      <GrindGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
};

