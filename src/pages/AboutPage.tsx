import React from 'react';
import { Heart, Globe, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-14 py-4 sm:py-8 max-w-5xl mx-auto">
      {/* Hero */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-widest border border-amber-200">
          Our Heritage & Ethos
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Pioneering Indian Specialty Coffee
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
          From the mist-covered Western Ghats to your morning cup, we bridge coffee growers directly with coffee lovers through transparency, precision roasting, and uncompromising quality.
        </p>
      </div>

      {/* Origin Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="rounded-3xl overflow-hidden h-80 sm:h-96 bg-stone-100 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&fit=crop&q=80"
            alt="Single estate coffee harvest"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <h2 className="text-2xl font-serif font-bold text-stone-900 leading-snug">
            Sourced From India's Most Celebrated Coffee Estates
          </h2>
          <p>
            India is the only country in the world where 100% of coffee is grown under a dense canopy of shade trees alongside wild pepper, cardamom, orange, and silver oak trees.
          </p>
          <p>
            We partner directly with family-run estates across Chikmagalur, Coorg, Shevaroys, and Biligirirangana Hills. By paying sustainable premiums well above fair-trade floor prices, we incentivize regenerative farm practices, selective hand-picking of red ripe cherries, and innovative fermentations like whiskey barrel aging and anaerobic naturals.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-stone-900 uppercase">100% Direct Trade</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Zero middlemen. We work side-by-side with farmers at origin, sharing cupping feedback and funding post-harvest processing experiments.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-stone-900 uppercase">Small-Batch Roasting</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Every estate lot has its own signature roast curve designed to bring out intrinsic terroir notes of fruit, chocolate, and spices.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-stone-900 uppercase">Community & Craft</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            From free home barista masterclasses to sensory cuppings, our mission is to make specialty coffee welcoming, approachable, and fun.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#D7EAF0] text-stone-900 text-center space-y-4">
        <h3 className="text-2xl font-serif font-bold">Ready to Taste the Difference?</h3>
        <p className="text-xs text-stone-700 max-w-md mx-auto">
          Explore our seasonal lineup of estate coffees roasted fresh this week.
        </p>
        <a
          href="#/coffees"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white hover:bg-amber-900 font-bold text-xs uppercase tracking-widest transition-colors shadow-sm"
        >
          <span>Browse All Coffees</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
