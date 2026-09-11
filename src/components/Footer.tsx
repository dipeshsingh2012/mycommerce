'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FooterProps {
  brandName?: string;
  onNewsletterSubmit?: (email: string) => Promise<void> | void;
}

export const Footer: React.FC<FooterProps> = ({
  brandName = 'HILJHIL ROASTERS',
  onNewsletterSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      setStatus('loading');
      setErrorMessage('');
      if (onNewsletterSubmit) {
        await onNewsletterSubmit(trimmed);
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMessage('Subscription failed. Please try again later.');
    }
  };

  return (
    <footer className="relative w-full bg-[#181614] text-stone-200 overflow-hidden font-sans border-t border-stone-800">
      {/* Subtle warm roastery ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* Column 1: Brand, Legal, Socials (~24% / 3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-700/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-serif font-black shadow-xs group-hover:bg-amber-600/30 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg tracking-tight text-white uppercase leading-tight">
                    {brandName}
                  </h3>
                  <span className="text-[10px] tracking-widest text-amber-400/90 uppercase font-medium">
                    Specialty Coffee Roasters
                  </span>
                </div>
              </div>
            </Link>

            <div className="text-xs text-stone-400 space-y-1 font-medium leading-relaxed">
              <p>
                <Link href="/privacy" className="hover:underline hover:text-white transition-colors">
                  PRIVACY POLICY
                </Link>
              </p>
              <p>COPYRIGHT © {new Date().getFullYear()}</p>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-300">
                FOLLOW US
              </p>
              <div className="flex items-center gap-3">
                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on X"
                  className="w-8 h-8 rounded-full bg-stone-800/80 hover:bg-amber-700 hover:text-white text-stone-300 flex items-center justify-center transition-all shadow-xs border border-stone-700/50"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="w-8 h-8 rounded-full bg-stone-800/80 hover:bg-amber-700 hover:text-white text-stone-300 flex items-center justify-center transition-all shadow-xs border border-stone-700/50"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="w-8 h-8 rounded-full bg-stone-800/80 hover:bg-amber-700 hover:text-white text-stone-300 flex items-center justify-center transition-all shadow-xs border border-stone-700/50"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Newsletter Signup (~32% / 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <form onSubmit={handleNewsletterSubmit} className="space-y-3 max-w-sm">
              <div>
                <label htmlFor="newsletter-footer-email" className="sr-only">
                  Enter your email
                </label>
                <input
                  id="newsletter-footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'loading'}
                  placeholder="Sign up for our newsletter!"
                  className={`w-full bg-stone-900 border px-4 py-3 text-sm text-white placeholder-stone-400 text-center shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    status === 'error' ? 'border-rose-500 ring-1 ring-rose-500' : 'border-stone-700'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white font-bold text-xs sm:text-sm tracking-[0.18em] uppercase py-3.5 px-4 transition-all text-center shadow-xs disabled:opacity-50 select-none cursor-pointer"
              >
                {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE NOW'}
              </button>

              {status === 'success' && (
                <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 p-2.5 border border-emerald-800 text-center">
                  Thank you for subscribing! Check your inbox for special offers.
                </div>
              )}

              {status === 'error' && (
                <div className="text-xs font-semibold text-rose-400 bg-rose-950/60 p-2.5 border border-rose-800 text-center">
                  {errorMessage}
                </div>
              )}

              <p className="text-[11px] text-stone-400 leading-relaxed text-center sm:text-left pt-1 font-normal">
                Special offers, brewing tips &amp; recipes! <br />
                Get an insider access to new launches, events &amp; more - straight to your inbox! <br />
                <span className="text-stone-500">(We promise not to spam!)</span>
              </p>
            </form>
          </div>

          {/* Column 3: Shop Online (~18% / 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-white uppercase font-sans">
              Shop Online
            </h4>
            <ul className="space-y-2 text-xs font-medium text-stone-400">
              <li>
                <Link href="/coffees" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Coffee
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Equipment
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Merchandise
                </Link>
              </li>
              <li>
                <Link href="/subscriptions" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/cafes" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Offers T&amp;C
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: About Us (~14% / 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-white uppercase font-sans">
              About Us
            </h4>
            <ul className="space-y-2 text-xs font-medium text-stone-400">
              <li>
                <Link href="/cafes" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Our Roasteries
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Our Beliefs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Our Farms
                </Link>
              </li>
              <li>
                <Link href="/cafes" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Play Bar Project
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Packaging
                </Link>
              </li>
              <li>
                <Link href="/cafes" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Explore / Visit (~12% / 1 col) */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-white uppercase font-sans">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-medium text-stone-400">
              <li>
                <Link href="/about" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/cafes" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Visit Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Our Farms
                </Link>
              </li>
              <li>
                <Link href="/coffees" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 hover:underline transition-colors block py-0.5">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p className="font-medium text-stone-400">
            © {new Date().getFullYear()} Hiljhil Roasters. Direct-Trade Specialty Coffee Roasters.
          </p>

          <p className="text-[11px] text-stone-400">
            Freshly Roasted &amp; Dispatched Weekly Across India
          </p>
        </div>
      </div>
    </footer>
  );
};
