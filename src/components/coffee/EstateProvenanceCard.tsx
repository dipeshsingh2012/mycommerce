import React from 'react';
import { MapPin, Compass, ShieldCheck, TreePine, Award } from 'lucide-react';

export interface EstateProvenanceProps {
  estateName?: string;
  location?: string;
  coordinates?: { lat: string; lng: string };
  heritage?: string;
  certifications?: string[];
  className?: string;
}

export const EstateProvenanceCard: React.FC<EstateProvenanceProps> = ({
  estateName = 'Baarbara Estate',
  location = 'Chikmagalur, Karnataka',
  coordinates = { lat: '13.4062° N', lng: '75.7686° E' },
  heritage = 'Run by the 3rd generation of seasoned Chikmagalur coffee cultivators from the Indavara family (MG Plantations) with 120+ years of coffee cultivation heritage under dense indigenous forest canopy.',
  certifications = ['UTZ Certified', 'Rainforest Alliance', 'Shade Grown Canopy', '100% Single Origin'],
  className = '',
}) => {
  return (
    <div className={`p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-5 ${className}`}>
      {/* Header with GPS badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 flex items-center gap-1.5">
            <TreePine className="w-4 h-4 text-emerald-600" />
            Estate Provenance & Farmer Heritage
          </span>
          <h3 className="text-xl font-serif font-bold text-slate-900 mt-0.5">
            {estateName}
          </h3>
          <p className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            {location}
          </p>
        </div>

        {/* GPS Coordinates Badge */}
        {coordinates && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-600">
            <Compass className="w-3.5 h-3.5 text-slate-400" />
            <span>{coordinates.lat}, {coordinates.lng}</span>
          </div>
        )}
      </div>

      {/* Narrative & History */}
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
        {heritage}
      </p>

      {/* Certifications and Badges */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Agricultural & Sustainable Certifications
        </span>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200/80"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

