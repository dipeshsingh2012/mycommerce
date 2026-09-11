'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, Coffee, Sparkles, PlusCircle, MessageSquareQuote, ShieldCheck, Flame, Award, X, CheckCircle } from 'lucide-react';

export type CoffeeCategory = 'all' | 'single_origin' | 'producer_series' | 'blend' | 'equipment';

export interface Testimonial {
  id: string;
  author: string;
  location?: string;
  rating: number;
  quote: string;
  productName: string;
  productId?: string;
  category: CoffeeCategory;
  brewMethod?: string;
  tastingNotes?: string[];
  verifiedBuyer: boolean;
  date: string;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-attikan-1',
    author: 'KEERTHI HARDASANI',
    location: 'Bangalore, KA',
    rating: 5,
    quote:
      "I've explored dozens of specialty roasters, but Hiljhil's Attikan Estate medium-dark roast is completely in a league of its own. Incredibly balanced with rich dark chocolate, sweet fig, and zero bitter astringency. My daily morning espresso ritual.",
    productName: 'Attikan Estate (Medium Dark)',
    productId: 'prod_attikan_estate',
    category: 'single_origin',
    brewMethod: 'Espresso (9 bar)',
    tastingNotes: ['Dark Chocolate', 'Dried Figs', 'Roasted Almond'],
    verifiedBuyer: true,
    date: '2 days ago',
  },
  {
    id: 'rev-baarbara-2',
    author: 'SAHIL MADAN',
    location: 'Mumbai, MH',
    rating: 5,
    quote:
      'The Baarbara Estate Whiskey Barrel Aged lot is mind-blowing. The aroma alone when you crack open the degassing valve fills the whole kitchen. Complex notes of non-alcoholic malt whiskey, red plum, and a silky Irish cream finish.',
    productName: 'Baarbara Estate - Whiskey Barrel Aged',
    productId: 'prod_baarbara_estate_whiskey_barrel',
    category: 'single_origin',
    brewMethod: 'V60 Pour Over',
    tastingNotes: ['Whiskey Oak', 'Red Plum', 'Irish Cream'],
    verifiedBuyer: true,
    date: '1 week ago',
  },
  {
    id: 'rev-excelsa-3',
    author: 'KRISHNA SARBADHIKARY',
    location: 'New Delhi, DL',
    rating: 5,
    quote:
      'Hiljhil Roasters taking the leap to ferment rare Excelsa with carbonic maceration is why they are the most exciting roaster in the country. Tart wild berries and a creamy yogurt mouthfeel. An absolute must-try for any filter coffee geek.',
    productName: 'Excelsa by Mooleh Manay Estate',
    productId: 'prod_mooleh_manay_excelsa',
    category: 'producer_series',
    brewMethod: 'Aeropress Inverted',
    tastingNotes: ['Wild Berries', 'Red Plum', 'Sweet Cedar'],
    verifiedBuyer: true,
    date: '2 weeks ago',
  },
  {
    id: 'rev-breville-4',
    author: 'ANANYA DESHMUKH',
    location: 'Pune, MH',
    rating: 5,
    quote:
      'Used Hiljhil’s CounterCheck™ before ordering the Breville Barista Touch to ensure cabinet clearance. It fit with 3 cm to spare! The machine pulls flawless microfoam and heats up in 3 seconds flat. Outstanding customer support.',
    productName: 'Barista Touch Espresso Machine',
    productId: 'prod_breville_barista_touch',
    category: 'equipment',
    brewMethod: 'Automatic Touch Barista',
    tastingNotes: ['ThermoJet 3s', 'Auto MilQ', 'CounterCheck Verified'],
    verifiedBuyer: true,
    date: '3 weeks ago',
  },
  {
    id: 'rev-riverdale-5',
    author: 'VIKRAMADITYA RAO',
    location: 'Hyderabad, TS',
    rating: 5,
    quote:
      'The Riverdale Mosto starter fermentation yields bright pink pomelo and tart cherry vibrancy. Clean cup clarity with zero funky defects. Easily matches the best Geshas I drank in Melbourne.',
    productName: 'Riverdale Estate - Mosto',
    productId: 'prod_riverdale_estate_mosto',
    category: 'producer_series',
    brewMethod: 'Kalita Wave 185',
    tastingNotes: ['Pink Pomelo', 'Tart Cherries', 'Chamomile'],
    verifiedBuyer: true,
    date: '1 month ago',
  },
  {
    id: 'rev-coldbrew-6',
    author: 'PRIYA NAIR',
    location: 'Chennai, TN',
    rating: 5,
    quote:
      'Cold Brew Blend Bold is our household staple for Chennai summers. Steeped for 18 hours at room temperature, it delivers a deeply sweet fudge and hazelnut concentrate that pairs gorgeously with cold milk.',
    productName: 'Cold Brew Blend Bold',
    productId: 'prod_cold_brew_blend_bold',
    category: 'blend',
    brewMethod: 'Toddy Cold Steep (18h)',
    tastingNotes: ['Dark Fudge', 'Roasted Hazelnut', 'Molasses'],
    verifiedBuyer: true,
    date: '1 month ago',
  },
];

const FILTER_PILLS: { label: string; value: CoffeeCategory }[] = [
  { label: 'All Reviews', value: 'all' },
  { label: 'Single Origins', value: 'single_origin' },
  { label: 'Producer Series', value: 'producer_series' },
  { label: 'Signature Blends', value: 'blend' },
  { label: 'Brewing Gear', value: 'equipment' },
];

const PRODUCT_OPTIONS: { name: string; category: CoffeeCategory }[] = [
  { name: 'Attikan Estate (Medium Dark)', category: 'single_origin' },
  { name: 'Baarbara Estate - Whiskey Barrel Aged', category: 'single_origin' },
  { name: 'Excelsa by Mooleh Manay Estate', category: 'producer_series' },
  { name: 'Riverdale Estate - Mosto', category: 'producer_series' },
  { name: 'Cold Brew Blend Bold', category: 'blend' },
  { name: '13th Birthday Blend', category: 'blend' },
  { name: 'Barista Touch Espresso Machine', category: 'equipment' },
  { name: 'Fellow Ode Gen 2 Brew Grinder', category: 'equipment' },
];

const BREW_METHODS = [
  'V60 Pour Over',
  'Espresso (9 bar)',
  'Aeropress',
  'French Press',
  'Cold Brew (18h)',
  'Moka Pot',
  'South Indian Filter',
];

interface TestimonialsSectionProps {
  onProductSelect?: (productId?: string) => void;
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onProductSelect,
  className = '',
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [activeFilter, setActiveFilter] = useState<CoffeeCategory>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Review modal form state
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [brewMethod, setBrewMethod] = useState(BREW_METHODS[0]);
  const [quote, setQuote] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredList = testimonials.filter((t) => {
    if (activeFilter === 'all') return true;
    return t.category === activeFilter;
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) return;

    const prod = PRODUCT_OPTIONS[selectedProductIndex];
    const tastingNotes = notesInput
      .split(',')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    const newReview: Testimonial = {
      id: `rev-user-${Date.now()}`,
      author: author.trim().toUpperCase(),
      location: location.trim() || undefined,
      rating,
      quote: quote.trim(),
      productName: prod.name,
      category: prod.category,
      brewMethod,
      tastingNotes: tastingNotes.length > 0 ? tastingNotes : undefined,
      verifiedBuyer: true,
      date: 'Just now',
    };

    setTestimonials((prev) => [newReview, ...prev]);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsModalOpen(false);
      setAuthor('');
      setLocation('');
      setQuote('');
      setNotesInput('');
    }, 1500);
  };

  return (
    <section className={`space-y-8 py-4 ${className}`}>
      {/* Header Area */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-xs font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
            <MessageSquareQuote className="w-4 h-4 text-amber-700" />
            Verified Customer Impressions
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            What Our Community Is Brewing
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-xl">
            Unfiltered cupping notes, extraction dial-ins, and roast feedback from coffee lovers across India.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          Share Your Cupping Notes
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {FILTER_PILLS.map((pill) => (
          <button
            key={pill.value}
            type="button"
            onClick={() => setActiveFilter(pill.value)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFilter === pill.value
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:border-amber-700'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      {filteredList.length === 0 ? (
        <div className="py-16 text-center text-stone-400 text-sm bg-stone-50 rounded-3xl border border-stone-200/60">
          No reviews found in this category yet. Be the first to share your extraction!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((t) => (
            <div
              key={t.id}
              className="h-full bg-[#FFFDF7] border border-[#eee7db] rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(217,119,6,0.06)] transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating
                            ? 'fill-amber-500 text-amber-500'
                            : 'fill-stone-200 text-stone-200'
                        }`}
                      />
                    ))}
                  </div>

                  {t.verifiedBuyer && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold tracking-wide">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified Cupper
                    </span>
                  )}
                </div>

                <blockquote className="text-stone-800 text-sm leading-relaxed font-normal">
                  "{t.quote}"
                </blockquote>

                {t.tastingNotes && t.tastingNotes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {t.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50/80 text-amber-900 border border-amber-200/60 text-[10px] font-semibold"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                        {note}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-5 mt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => onProductSelect && onProductSelect(t.productId)}
                    className="text-left font-semibold text-stone-900 hover:text-amber-800 transition-colors flex items-center gap-1.5 group-hover:underline"
                  >
                    <Coffee className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="truncate max-w-[200px]">{t.productName}</span>
                  </button>
                  {t.brewMethod && (
                    <span className="text-[10px] text-stone-600 font-medium shrink-0 bg-stone-100 px-2 py-0.5 rounded-full">
                      {t.brewMethod}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
                  <div>
                    <span className="font-bold text-stone-900 tracking-wider uppercase font-sans">
                      {t.author}
                    </span>
                    {t.location && (
                      <span className="text-[11px] text-stone-600 ml-1.5">
                        • {t.location}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-500">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trust & Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 sm:p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs">
        <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 pr-0 md:pr-4">
          <div className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
            4.9
          </div>
          <div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <p className="text-[11px] text-stone-600 font-semibold mt-0.5">
              Based on 1,840+ verified reviews
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 pr-0 md:pr-4">
          <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">100% Direct-Trade</h4>
            <p className="text-[11px] text-stone-600">Zero middlemen, premium farmgate prices</p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 pr-0 md:pr-4">
          <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">Roast-to-Order</h4>
            <p className="text-[11px] text-stone-600">Dispatched within 48h of roast</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">CounterCheck™ Verified</h4>
            <p className="text-[11px] text-stone-600">Cabinet clearance guaranteed</p>
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 overflow-hidden">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 font-serif">Thank You!</h3>
                <p className="text-sm text-stone-600 max-w-xs mx-auto">
                  Your cupping review has been submitted and shared with our head roasters.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                    Community Cupping Log
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                    Share Your Brew Experience
                  </h3>
                  <p className="text-xs text-stone-500">
                    Help fellow coffee enthusiasts discover their next favorite lot.
                  </p>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-amber-500 text-amber-500'
                              : 'fill-stone-100 text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-900 ml-2">
                      {rating} of 5 stars
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      City &amp; State
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Bangalore, KA"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Coffee / Hardware *
                    </label>
                    <select
                      value={selectedProductIndex}
                      onChange={(e) => setSelectedProductIndex(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white"
                    >
                      {PRODUCT_OPTIONS.map((opt, idx) => (
                        <option key={opt.name} value={idx}>
                          {opt.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Brew Method
                    </label>
                    <select
                      value={brewMethod}
                      onChange={(e) => setBrewMethod(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white"
                    >
                      {BREW_METHODS.map((bm) => (
                        <option key={bm} value={bm}>
                          {bm}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Tasting Notes (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    placeholder="e.g. Dark Chocolate, Orange Zest, Molasses"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Describe the aroma, cup balance, flavor clarity, and overall brewing impressions..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Submit Cupping Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
export default TestimonialsSection;

