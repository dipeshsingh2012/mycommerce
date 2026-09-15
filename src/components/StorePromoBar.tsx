'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Coffee, Tag, Copy, Check, X, ArrowRight } from 'lucide-react';
import type { ThemeConfig } from '../lib/contentApi';

export interface StorePromoBarProps {
  message?: string;
  badge?: string;
  ctaText?: string;
  ctaUrl?: string;
  promoCode?: string;
  dismissible?: boolean;
  storageKey?: string;
  theme?: ThemeConfig;
  className?: string;
}

export const StorePromoBar: React.FC<StorePromoBarProps> = ({
  message,
  badge,
  ctaText,
  ctaUrl,
  promoCode,
  dismissible = true,
  storageKey = 'hilljhil_promo_dismissed_v1',
  theme,
  className = '',
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && storageKey) {
      try {
        return localStorage.getItem(storageKey) !== 'dismissed';
      } catch {
        return true;
      }
    }
    return true;
  });

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined' && storageKey) {
      try {
        localStorage.setItem(storageKey, 'dismissed');
      } catch {
        // Safe fallback
      }
    }
  };

  const handleCopyCode = useCallback(
    async (codeToCopy: string, e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(codeToCopy);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = codeToCopy;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.warn('Could not copy code:', err);
      }
    },
    []
  );

  if (!isVisible || !message) {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label="Storefront Announcements"
      className={`relative z-40 w-full py-2 px-3 sm:px-6 transition-all text-xs select-none shadow-xs bg-gradient-to-r from-[#042f2e] via-[#085454] to-[#042f2e] text-teal-100 border-b border-teal-800/40 ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Central Announcement Body */}
        <div className="flex-1 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center min-w-0">
          {/* Eyebrow / Tag Badge */}
          {badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider shrink-0 bg-teal-400/20 text-teal-200 border border-teal-400/30">
              {badge}
            </span>
          )}

          {/* Icon + Message Text */}
          <div className="inline-flex items-center gap-1.5 font-medium leading-tight">
            <Coffee className="w-3.5 h-3.5 shrink-0 text-teal-300" />
            <span className="truncate max-w-xs sm:max-w-md md:max-w-xl lg:max-w-none text-teal-50">
              {message}
            </span>
          </div>

          {/* Clickable Coupon Code Pill */}
          {promoCode && (
            <button
              type="button"
              onClick={(e) => handleCopyCode(promoCode, e)}
              title={`Click to copy code "${promoCode}"`}
              className={`group inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold transition-all active:scale-95 shrink-0 ${
                isCopied
                  ? 'bg-emerald-800 border border-emerald-400 text-white'
                  : 'bg-teal-900/90 hover:bg-teal-800 border border-teal-600/40 text-teal-100'
              }`}
            >
              <span className="font-extrabold tracking-wider">{promoCode}</span>
              {isCopied ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold">
                  <Check className="w-3 h-3 text-emerald-300" /> Copied!
                </span>
              ) : (
                <Copy className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          )}

          {/* CTA Link */}
          {ctaText && ctaUrl && (
            <div className="inline-flex items-center gap-1 shrink-0 ml-1">
              <Link
                href={ctaUrl}
                className="inline-flex items-center gap-1 underline underline-offset-2 font-bold text-teal-200 hover:text-white transition-colors"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            className="p-1 rounded-full text-teal-300/60 hover:text-teal-100 hover:bg-teal-800/40 transition-colors shrink-0 ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </aside>
  );
};

export default StorePromoBar;

