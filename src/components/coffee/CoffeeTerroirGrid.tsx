import React from 'react';
import { Flame, Coffee, Mountain, GitBranch, MapPin, Sparkles } from 'lucide-react';

export interface CoffeeTerroirGridProps {
  roastLevel?: string;
  bestEnjoyed?: 'black' | 'with_milk' | 'both' | string;
  elevationM?: number | string;
  processMethod?: string;
  region?: string;
  varietal?: string;
  className?: string;
}

export const CoffeeTerroirGrid: React.FC<CoffeeTerroirGridProps> = ({
  roastLevel = 'Medium',
  bestEnjoyed = 'black',
  elevationM = '1,450 MASL',
  processMethod = 'Washed',
  region = 'Western Ghats, Karnataka',
  varietal = 'Arabica S795',
  className = '',
}) => {
  const formatEnjoyment = (val: string) => {
    const lower = val.toLowerCase();
    if (lower.includes('milk') && lower.includes('black')) return 'Milk or Black';
    if (lower.includes('milk')) return 'With Milk';
    return 'Have it Black';
  };

  const formatAltitude = (val: number | string) => {
    if (typeof val === 'number') return `${val.toLocaleString()} MASL`;
    return val.toUpperCase().includes('MASL') ? val : `${val} MASL`;
  };

  const getRoastColor = (roast: string) => {
    const r = roast.toLowerCase();
    if (r.includes('light')) return 'text-amber-700 bg-amber-50 border-amber-200';
    if (r.includes('dark')) return 'text-stone-900 bg-stone-100 border-stone-300';
    return 'text-amber-900 bg-amber-50/80 border-amber-200/80';
  };

  const tiles = [
    {
      label: 'ROAST LEVEL',
      value: roastLevel,
      icon: <Flame className="w-4 h-4 text-amber-600" />,
      tag: 'Drum Roasted',
    },
    {
      label: 'BEST ENJOYED',
      value: formatEnjoyment(bestEnjoyed),
      icon: <Coffee className="w-4 h-4 text-amber-700" />,
      tag: 'Versatility',
    },
    {
      label: 'ALTITUDE',
      value: formatAltitude(elevationM),
      icon: <Mountain className="w-4 h-4 text-emerald-700" />,
      tag: 'High Grown',
    },
    {
      label: 'PROCESSING',
      value: processMethod,
      icon: <Sparkles className="w-4 h-4 text-purple-700" />,
      tag: 'Artisan Lot',
    },
    {
      label: 'TERROIR LOCATION',
      value: region,
      icon: <MapPin className="w-4 h-4 text-red-600" />,
      tag: 'Single Origin',
    },
    {
      label: 'BOTANICAL VARIETAL',
      value: varietal,
      icon: <GitBranch className="w-4 h-4 text-teal-700" />,
      tag: 'Cultivar',
    },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Terroir & Roasting Matrix
        </h3>
        <span className="text-[11px] font-bold text-slate-400">Single Origin Provenance</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {tiles.map((tile, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-amber-400/80 hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">{tile.icon}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{tile.tag}</span>
            </div>
            <div>
              <p className="text-[10px] font-black tracking-wider text-slate-400 uppercase">{tile.label}</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug mt-0.5 line-clamp-2">
                {tile.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

