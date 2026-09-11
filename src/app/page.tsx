'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Ruler, MapPin, Clock, Coffee, ShieldCheck } from 'lucide-react';
import { ProtonButton } from '@dipesh.singh/proton/react';
import {
  HeroBanner,
  CategoryLane,
  ProductSlider,
  TestimonialsSection,
  CategoryTileItem,
  SliderProduct,
  TestimonialItem,
} from '@dipesh.singh/commerce-ui';

const CATEGORY_TILES: CategoryTileItem[] = [
  {
    id: 'roasted-coffee',
    title: 'Roasted & Ground Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop&q=80',
    href: '/coffees',
  },
  {
    id: 'espresso-machines',
    title: 'Espresso Machines',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop&q=80',
    href: '/equipment',
    badge: 'Popular',
  },
  {
    id: 'brewing-gear',
    title: 'Brewing Equipment',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop&q=80',
    href: '/equipment',
  },
  {
    id: 'grinders',
    title: 'Burr Grinders',
    imageUrl: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=300&h=300&fit=crop&q=80',
    href: '/equipment',
  },
  {
    id: 'drinkware',
    title: 'Barista Drinkware',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop&q=80',
    href: '/equipment',
  },
  {
    id: 'subscriptions',
    title: 'Roast Subscriptions',
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=300&fit=crop&q=80',
    href: '/subscriptions',
    badge: 'Save 15%',
  },
];

import { fetchProducts } from '@/lib/catalogApi';

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'review-1',
    quote:
      'The roast consistency is unmatched. You can truly taste the subtle whiskey and red plum notes in the Baarbara estate. Easily the finest roastery in India.',
    rating: 5,
    author: 'KEERTHI HARDASANI',
  },
  {
    id: 'review-2',
    quote:
      'Love the packaging, the coffee selection, the community cupping events. The general love for specialty coffee you share with the world is amazing to experience.',
    rating: 5,
    author: 'SAHIL MADAN',
  },
  {
    id: 'review-3',
    quote:
      'Hiljhil Cafe is hands down the best coffee brand out there! I have enjoyed each cup at their cafes and whenever I brew at home with my V60.',
    rating: 5,
    author: 'KRISHNA SARBADHIKARY',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [clearanceInput, setClearanceInput] = useState<string>('45');
  const [bestsellerProducts, setBestsellerProducts] = useState<SliderProduct[]>([]);

  React.useEffect(() => {
    async function loadBestsellers() {
      try {
        const items = await fetchProducts({ limit: 8 });
        const sliderItems: SliderProduct[] = items.map((p) => ({
          id: p.id,
          title: p.name.toUpperCase(),
          subtitle: p.tasteNotes && p.tasteNotes.length > 0 ? p.tasteNotes.join(', ') : p.description,
          price: `₹ ${(p.priceCents / 100).toLocaleString('en-IN')}`,
          imageUrl: p.image,
          badge: p.badge,
          productUrl: `/product/${p.id}`,
        }));
        setBestsellerProducts(sliderItems);
      } catch (err) {
        console.error('Failed to load bestsellers from catalog service:', err);
      }
    }
    loadBestsellers();
  }, []);

  return (
    <>
      {/* Google Rich Snippet Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Hiljhil Cafe & Roastery',
            url: 'https://hiljhil.com',
            logo: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300',
            description: 'Artisanal batch-roasted specialty coffees, single-estate roasts, and precision barista equipment.',
          }),
        }}
      />

      <div className="space-y-16 py-4">
        {/* Hero Section */}
        <HeroBanner
          layout="single"
          eyebrow="Hiljhil Cafe & Specialty Roasters • hiljhil.cafe"
          headline="Artisanal Coffees & Precision Espresso Bars"
          description="Direct-trade single estates, seasonal batch roasts, and countertop-verified espresso gear crafted for discerning palates."
          backgroundImage="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&auto=format&fit=crop&q=80"
          ctas={[
            {
              label: 'Shop Specialty Coffees',
              url: '/coffees',
              variant: 'primary',
            },
            {
              label: 'Explore Brewing Gear',
              url: '/equipment',
              variant: 'secondary',
            },
          ]}
        >
          {/* Spatial Cabinet Clearance Qualifier */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-lg space-y-3">
            <div className="flex items-center justify-between text-xs font-medium text-slate-200">
              <span className="flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-amber-400" />
                Home Coffee Bar Clearance Filter
              </span>
              <span className="text-[11px] text-amber-300 font-semibold">CounterCheck™ Verified</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-2 rounded-xl border border-white/10 text-white text-xs">
                <span>Height:</span>
                <input
                  type="number"
                  value={clearanceInput}
                  onChange={(e) => setClearanceInput(e.target.value)}
                  className="w-12 bg-transparent text-amber-400 font-bold focus:outline-none text-right"
                  min="30"
                  max="70"
                />
                <span className="text-slate-400">cm</span>
              </div>

              <div className="flex-1">
                <ProtonButton
                  fullWidth
                  size="sm"
                  endIcon={<ArrowRight style={{ width: 14, height: 14 }} />}
                  onClick={() => router.push('/equipment')}
                >
                  Filter Matching Gear
                </ProtonButton>
              </div>
            </div>
          </div>
        </HeroBanner>

        {/* Circular Category Navigation */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <CategoryLane
            title="Explore by Category"
            subtitle="Single origin estate roasts, espresso machines, and precision barista gear"
            categories={CATEGORY_TILES}
            onSelectCategory={(cat) => {
              if (cat.href) router.push(cat.href);
            }}
          />
        </section>

        {/* Bestseller Coffees Product Slider Carousel */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <ProductSlider
            title="Bestseller Coffees"
            subtitle="Freshly roasted specialty coffee beans and cold brew drops from India's premier estates"
            products={bestsellerProducts}
            onBuyNow={(prod) => {
              router.push(prod.productUrl || `/product/${prod.id}`);
            }}
            onQuickAdd={(prod) => {
              router.push('/cart');
            }}
            onProductClick={(prod) => {
              router.push(prod.productUrl || `/product/${prod.id}`);
            }}
          />
        </section>

        {/* Physical Cafe Flagship & In-Store Experience */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                <Coffee className="w-4 h-4" />
                Physical Flagship Roastery
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
                Experience Hiljhil Cafe In Person
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Freshly pulled ristrettos, pour-over flights, housemade sourdough pastries, and live cupping sessions with our head roasters.
              </p>
            </div>
            <Link
              href="/cafes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all shadow-xs"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              View All Cafe Locations & Cupping Schedule
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
              <div className="text-amber-800 font-bold text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                Operating Hours
              </div>
              <p className="text-xs text-slate-600">Daily: 7:30 AM – 10:30 PM</p>
              <p className="text-[11px] text-amber-700 font-medium">Bakery & Espresso Bar opens at 7:30 AM</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-2">
              <div className="text-emerald-800 font-bold text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Space-Verified Tryout Bar
              </div>
              <p className="text-xs text-slate-600">Bring your kitchen specs or try CounterCheck AR live at our hardware bar.</p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200/60 space-y-2">
              <div className="text-indigo-800 font-bold text-sm flex items-center gap-2">
                <Coffee className="w-4 h-4 text-indigo-600" />
                Weekend Cupping Sessions
              </div>
              <p className="text-xs text-slate-600">Taste 6 single-origins guided by our Q-graders every Saturday 11 AM.</p>
            </div>
          </div>
        </section>

        {/* Customer Testimonials Section */}
        <TestimonialsSection
          title="Happy Customers"
          testimonials={TESTIMONIALS}
        />
      </div>
    </>
  );
}
