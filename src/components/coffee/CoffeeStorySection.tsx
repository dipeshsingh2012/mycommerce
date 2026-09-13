import React, { useState } from 'react';
import { Sparkles, Calendar, Info, ChevronDown, ChevronUp } from 'lucide-react';

export interface CoffeeStorySectionProps {
  title?: string;
  story?: string;
  restingDays?: number;
  restingNote?: string;
  isAlcoholFree?: boolean;
  className?: string;
}

export const CoffeeStorySection: React.FC<CoffeeStorySectionProps> = ({
  title = 'The Bean Journey & Craftsmanship',
  story,
  restingDays = 10,
  restingNote = 'Recommended resting period: 10 days from roast date for optimal degassing and peak aromatic expression.',
  isAlcoholFree = true,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!story) return null;

  // Split into short preview and remaining text
  const paragraphs = story.split('\n\n').filter((p) => p.trim().length > 0);
  const firstParagraph = paragraphs[0] || story;
  const remainingParagraphs = paragraphs.slice(1);

  return (
    <div className={`p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          {title}
        </h3>
        {restingDays && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-xs font-bold">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            Resting Window: {restingDays} Days
          </span>
        )}
      </div>

      <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
        <p>{firstParagraph}</p>

        {isExpanded && remainingParagraphs.map((p, idx) => (
          <p key={idx} className="animate-in fade-in">{p}</p>
        ))}
      </div>

      {remainingParagraphs.length > 0 && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          {isExpanded ? (
            <>
              Read Less <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      )}

      {/* Freshness & Compliance Notice Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-2.5">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-600 leading-tight">
            <strong>Roaster Note:</strong> {restingNote}
          </p>
        </div>

        {isAlcoholFree && (
          <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 leading-tight">
              <strong>All-Natural Flavor:</strong> Barrel aging imparts aromatics naturally. 100% non-alcoholic.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

