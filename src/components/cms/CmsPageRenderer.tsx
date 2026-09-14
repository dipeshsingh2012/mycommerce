'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Copy, Star, MapPin, Clock, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { CMSPage, CMSPageSection } from '@/lib/contentApi';

interface CmsPageRendererProps {
  page: CMSPage;
}

export function CmsPageRenderer({ page }: CmsPageRendererProps) {
  const activeSections = (page.sections || [])
    .filter((s) => s.is_active !== false)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <div className="space-y-12 sm:space-y-16 py-4 sm:py-8 max-w-6xl mx-auto px-4 sm:px-6">
      {activeSections.map((section) => (
        <section key={section.id} id={section.id} className="w-full">
          <SectionRenderer section={section} />
        </section>
      ))}
    </div>
  );
}

function SectionRenderer({ section }: { section: CMSPageSection }) {
  const { type, config } = section;

  switch (type) {
    case 'hero_banner':
      return <HeroBannerSection config={config} />;
    case 'promo_callout':
      return <PromoCalloutSection config={config} />;
    case 'feature_grid':
      return <FeatureGridSection title={section.title} subtitle={section.subtitle} config={config} />;
    case 'rich_text':
      return <RichTextSection config={config} />;
    case 'testimonials':
      return <TestimonialsSection config={config} />;
    default:
      return null;
  }
}

function HeroBannerSection({ config }: { config: Record<string, any> }) {
  const {
    headline,
    subheadline,
    badge,
    primary_cta_text,
    primary_cta_url,
    secondary_cta_text,
    secondary_cta_url,
    background_image,
    overlay_opacity = 60,
    text_align = 'center',
  } = config;

  if (!background_image) {
    return (
      <div className={`text-${text_align} space-y-4 max-w-3xl mx-auto py-6`}>
        {badge && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-widest border border-amber-200">
            {badge}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[400px] flex items-center shadow-sm">
      <img
        src={background_image}
        alt={headline || 'Hero Banner'}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 bg-stone-950"
        style={{ opacity: (overlay_opacity || 60) / 100 }}
      />
      <div className={`relative z-10 p-8 sm:p-14 max-w-3xl ${text_align === 'center' ? 'mx-auto text-center' : ''} text-white space-y-4`}>
        {badge && (
          <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-400/90 text-stone-950 uppercase tracking-widest">
            {badge}
          </span>
        )}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-50 leading-tight">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
            {subheadline}
          </p>
        )}
        {(primary_cta_text || secondary_cta_text) && (
          <div className={`pt-2 flex flex-wrap gap-3 ${text_align === 'center' ? 'justify-center' : ''}`}>
            {primary_cta_text && (
              <Link
                href={primary_cta_url || '/coffees'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>{primary_cta_text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {secondary_cta_text && (
              <Link
                href={secondary_cta_url || '/'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/20"
              >
                <span>{secondary_cta_text}</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PromoCalloutSection({ config }: { config: Record<string, any> }) {
  const { headline, body, badge, button_text, button_url, image_url, layout = 'image_right' } = config;
  const isImageRight = layout === 'image_right';
  const isCardBanner = layout === 'card_banner';

  if (isCardBanner) {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          {badge && (
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
              {badge}
            </span>
          )}
          <h3 className="text-xl sm:text-2xl font-serif font-bold">{headline}</h3>
          {body && <p className="text-xs text-stone-400 max-w-xl leading-relaxed">{body}</p>}
        </div>
        {button_text && (
          <Link
            href={button_url || '/coffees'}
            className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest transition-colors shrink-0"
          >
            {button_text}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isImageRight ? '' : 'md:[&>*:first-child]:order-2'}`}>
      {image_url && (
        <div className="rounded-3xl overflow-hidden h-72 sm:h-88 bg-stone-100 shadow-xs">
          <img src={image_url} alt={headline || 'Promo'} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="space-y-4 text-stone-700">
        {badge && (
          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900">
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
          {headline}
        </h2>
        {body && <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{body}</p>}
        {button_text && (
          <Link
            href={button_url || '/coffees'}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            <span>{button_text}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

function FeatureGridSection({
  title,
  subtitle,
  config,
}: {
  title?: string;
  subtitle?: string;
  config: Record<string, any>;
}) {
  const { columns = 3, items = [] } = config;
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const colClass =
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : columns === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  const copyCoupon = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div className="space-y-1 text-center sm:text-left">
          {title && <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">{title}</h2>}
          {subtitle && <p className="text-xs text-stone-500">{subtitle}</p>}
        </div>
      )}

      <div className={`grid ${colClass} gap-5`}>
        {items.map((item: any, idx: number) => {
          const isCoupon = item.badge && item.action_text?.includes('Copy');

          return (
            <div
              key={item.id || idx}
              className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors"
            >
              {item.image_url && (
                <div className="rounded-2xl overflow-hidden h-44 -mx-2 -mt-2 mb-2 bg-stone-100">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">{item.title}</h3>
                  {item.badge && !isCoupon && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-amber-100 text-amber-900 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>

                {item.subtitle && (
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">{item.subtitle}</p>
                )}

                <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>

                {item.tags && Array.isArray(item.tags) && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.tags.map((tag: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-100 text-stone-700 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {isCoupon ? (
                <div className="pt-3 border-t border-stone-100 space-y-2">
                  <button
                    type="button"
                    onClick={() => copyCoupon(item.badge)}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-mono font-bold text-xs flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Code: {item.badge}</span>
                    {copiedCode === item.badge ? (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-sans">
                        <Check className="w-3.5 h-3.5" /> Copied!
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] text-amber-800 font-sans">
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </span>
                    )}
                  </button>
                  {item.terms && <span className="text-[10px] text-stone-400 block">{item.terms}</span>}
                </div>
              ) : item.action_text && item.action_url ? (
                <div className="pt-3 border-t border-stone-100">
                  <Link
                    href={item.action_url}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-stone-900 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <span>{item.action_text}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RichTextSection({ config }: { config: Record<string, any> }) {
  const { headline, badge, last_updated, clauses = [] } = config;

  return (
    <div className="py-4 sm:py-6 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2 border-b border-stone-200 pb-6">
        {badge && (
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800 block">
            {badge}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">{headline}</h1>
        {last_updated && (
          <p className="text-xs text-stone-500">
            Last updated: {last_updated} • Hiljhil Specialty Coffee Pvt. Ltd.
          </p>
        )}
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        {clauses.map((clause: any, idx: number) => (
          <section key={idx} className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-stone-900">{clause.title}</h2>
            <p>{clause.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection({ config }: { config: Record<string, any> }) {
  const { testimonials = [] } = config;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {testimonials.map((t: any, idx: number) => (
        <div key={t.id || idx} className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: t.rating || 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xs text-stone-700 italic leading-relaxed">"{t.quote}"</p>
          <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
            {t.avatar_url && (
              <img src={t.avatar_url} alt={t.author} className="w-8 h-8 rounded-full object-cover" />
            )}
            <div>
              <h4 className="text-xs font-bold text-stone-900">{t.author}</h4>
              {t.role && <p className="text-[10px] text-stone-500">{t.role}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CmsPageRenderer;
