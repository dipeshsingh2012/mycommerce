'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  Search,
  User,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  Coffee,
} from 'lucide-react';
import type { NavLinkItem, NavSubItem } from '@dipesh.singh/commerce-ui';
import type { ThemeConfig } from '../lib/contentApi';

export interface StoreHeaderProps {
  logo?: {
    imageUrl?: string;
    alt?: string;
    text?: string;
    tagline?: string;
    badge?: string;
    href?: string;
  };
  links: NavLinkItem[];
  ctaPill?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  cartCount?: number;
  onSearchClick?: () => void;
  onAccountClick?: () => void;
  onCartClick?: () => void;
  sticky?: boolean;
  theme?: ThemeConfig;
  className?: string;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({
  logo,
  links,
  ctaPill,
  cartCount = 0,
  onSearchClick,
  onAccountClick,
  onCartClick,
  sticky = true,
  theme,
  className = '',
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | number | null>(null);
  const [expandedMobileAccordions, setExpandedMobileAccordions] = useState<Record<string | number, boolean>>({});

  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const primaryColor = theme?.primary_color || '#085454';
  const accentColor = theme?.accent_color || '#0d9488';
  const brandTitle = logo?.text || 'HILL JHIL';
  const brandTagline = logo?.tagline || 'Specialty Sourced & Micro-Lot Roasted';
  const brandBadge = logo?.badge || 'FLAGSHIP ROASTERY';

  // Detect scroll position to add elevated shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDrawerOpen]);

  // Handle escape key to close dropdowns / mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (linkId: string | number) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(linkId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileAccordion = (linkId: string | number) => {
    setExpandedMobileAccordions((prev) => ({
      ...prev,
      [linkId]: !prev[linkId],
    }));
  };

  // Helper to check if a link is currently active
  const isLinkActive = (href: string): boolean => {
    if (!pathname) return false;
    const cleanHref = href.split('?')[0];
    if (cleanHref === '/') {
      return pathname === '/';
    }
    return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
  };

  return (
    <header
      className={`w-full z-40 bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-teal-900/10 ${
        sticky ? 'sticky top-0' : 'relative'
      } ${isScrolled ? 'shadow-xs border-teal-900/15' : ''} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* ========================================================
            LEFT ZONE: Mobile Hamburger + Brand Identity
           ======================================================== */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Trigger (< md) */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden p-2 -ml-2 rounded-xl text-stone-700 hover:text-teal-950 hover:bg-teal-50 transition-colors"
            aria-label="Open navigation menu"
            aria-expanded={mobileDrawerOpen}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo & Monogram Emblem */}
          <Link
            href={logo?.href || '/'}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden"
          >
            {/* Circular Framed Crest Badge */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full ring-2 ring-[#085454]/25 p-0.5 bg-white shadow-xs group-hover:ring-[#085454]/60 transition-all duration-200 overflow-hidden shrink-0 flex items-center justify-center">
              {logo?.imageUrl ? (
                <img
                  src={logo.imageUrl}
                  alt={logo.alt || brandTitle}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Coffee className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Brand Title, Tagline, & Micro-Badge */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span
                  className="font-serif font-bold text-base sm:text-lg tracking-tight uppercase leading-tight transition-colors"
                  style={{ color: primaryColor }}
                >
                  {brandTitle}
                </span>
                {brandBadge && (
                  <span className="hidden xl:inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-widest uppercase bg-teal-50 text-teal-800 border border-teal-200/70">
                    {brandBadge}
                  </span>
                )}
              </div>
              {brandTagline && (
                <span className="text-[9px] sm:text-[10px] tracking-widest text-teal-900/60 uppercase font-sans font-medium">
                  {brandTagline}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* ========================================================
            CENTER ZONE: Desktop Navigation Links + Dropdowns (>= md)
           ======================================================== */}
        <nav
          className="hidden md:flex items-center gap-5 lg:gap-7 h-full"
          aria-label="Main Navigation"
        >
          {links.map((link: NavLinkItem) => {
            const hasSub = Boolean(link.subItems && link.subItems.length > 0);
            const isOpen = activeDropdown === link.id;
            const active = isLinkActive(link.href);

            return (
              <div
                key={link.id}
                className="relative h-full flex items-center"
                onMouseEnter={() => hasSub && handleMouseEnter(link.id)}
                onMouseLeave={() => hasSub && handleMouseLeave()}
              >
                {hasSub ? (
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isOpen ? null : link.id)}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    className={`relative flex items-center gap-1.5 py-2 font-bold text-xs lg:text-[13px] tracking-[0.14em] uppercase transition-colors select-none ${
                      active
                        ? 'font-extrabold text-teal-950'
                        : 'text-stone-700 hover:text-[#085454]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.highlightBadge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-teal-100 text-teal-900 uppercase border border-teal-200/60">
                        {link.highlightBadge}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#085454]' : 'text-stone-400'
                      }`}
                    />
                    {/* Active route bottom line indicator */}
                    {active && (
                      <span
                        className="absolute -bottom-4 sm:-bottom-6 left-0 right-0 h-[2.5px] rounded-full shadow-xs"
                        style={{ backgroundColor: primaryColor }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-1.5 py-2 font-bold text-xs lg:text-[13px] tracking-[0.14em] uppercase transition-colors ${
                      active
                        ? 'font-extrabold text-teal-950'
                        : 'text-stone-700 hover:text-[#085454]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.isHighlight && !link.highlightBadge && (
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: accentColor }}
                      />
                    )}
                    {link.highlightBadge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-teal-100 text-teal-900 uppercase border border-teal-200/60">
                        {link.highlightBadge}
                      </span>
                    )}
                    {/* Active route bottom line indicator */}
                    {active && (
                      <span
                        className="absolute -bottom-4 sm:-bottom-6 left-0 right-0 h-[2.5px] rounded-full shadow-xs"
                        style={{ backgroundColor: primaryColor }}
                      />
                    )}
                  </Link>
                )}

                {/* Flyout Dropdown Menu */}
                {hasSub && isOpen && (
                  <div
                    className="absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in-0 slide-in-from-top-1 duration-150"
                    role="menu"
                  >
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200/90 p-2 min-w-[250px] max-w-sm space-y-1">
                      {link.subItems?.map((sub: NavSubItem) => {
                        const isSubActive = isLinkActive(sub.href);
                        return (
                          <Link
                            key={sub.id || sub.label}
                            href={sub.href}
                            role="menuitem"
                            className={`group/sub flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                              isSubActive
                                ? 'bg-teal-50 text-teal-950 font-bold'
                                : 'text-stone-700 hover:text-teal-950 hover:bg-teal-50/70'
                            }`}
                          >
                            <div>
                              <div className="font-bold tracking-wide">
                                {sub.label}
                              </div>
                              {sub.description && (
                                <div className="text-[11px] text-stone-400 font-normal mt-0.5">
                                  {sub.description}
                                </div>
                              )}
                            </div>
                            {sub.badge && (
                              <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-teal-100 text-teal-900 uppercase border border-teal-200/60">
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ========================================================
            RIGHT ZONE: CTA Button + Action Utilities
           ======================================================== */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Optional CTA Pill Button (Desktop) */}
          {ctaPill && (
            <button
              type="button"
              onClick={() => {
                if (ctaPill.onClick) {
                  ctaPill.onClick();
                } else if (ctaPill.href) {
                  router.push(ctaPill.href);
                }
              }}
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-white hover:opacity-95 active:scale-95 transition-all shadow-xs select-none"
              style={{ backgroundColor: primaryColor }}
            >
              {ctaPill.label}
            </button>
          )}

          {/* Search Icon Button with ⌘K Badge */}
          <button
            type="button"
            onClick={onSearchClick}
            className="flex items-center gap-1.5 p-2 rounded-xl text-stone-700 hover:text-teal-950 hover:bg-teal-50 transition-colors active:scale-95"
            aria-label="Search catalog (Press ⌘K)"
            title="Search catalog (Press ⌘K)"
          >
            <Search className="w-5 h-5" />
            <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-bold text-stone-500 bg-stone-100 rounded border border-stone-200 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* User Account / Profile */}
          <button
            type="button"
            onClick={onAccountClick}
            className="p-2 rounded-xl text-stone-700 hover:text-teal-950 hover:bg-teal-50 transition-colors active:scale-95"
            aria-label="Account Profile"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Shopping Bag / Cart Button */}
          <button
            type="button"
            onClick={onCartClick}
            className="relative p-2 rounded-xl text-stone-700 hover:text-teal-950 hover:bg-teal-50 transition-colors active:scale-95"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span
                className="absolute top-0.5 right-0.5 text-white text-[10px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 border-2 border-white shadow-xs animate-in zoom-in-75 duration-200"
                style={{ backgroundColor: accentColor }}
              >
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================
          MOBILE & TABLET SLIDE-OVER DRAWER (< md)
         ======================================================== */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Slide Panel */}
          <div className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col justify-between z-50 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-teal-900/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full ring-2 ring-[#085454]/25 p-0.5 bg-white shadow-xs overflow-hidden shrink-0 flex items-center justify-center">
                  {logo?.imageUrl ? (
                    <img
                      src={logo.imageUrl}
                      alt={brandTitle}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Coffee className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span
                    className="font-serif font-bold text-base uppercase leading-tight"
                    style={{ color: primaryColor }}
                  >
                    {brandTitle}
                  </span>
                  {brandTagline && (
                    <span className="text-[9px] text-teal-900/60 uppercase font-sans font-medium">
                      {brandTagline}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-2 divide-y divide-stone-100">
              <div className="space-y-1 pb-4">
                {links.map((link) => {
                  const hasSub = Boolean(link.subItems && link.subItems.length > 0);
                  const isExpanded = Boolean(expandedMobileAccordions[link.id]);
                  const active = isLinkActive(link.href);

                  return (
                    <div key={link.id} className="py-1">
                      {hasSub ? (
                        <div>
                          <button
                            type="button"
                            onClick={() => toggleMobileAccordion(link.id)}
                            className={`w-full flex items-center justify-between py-2.5 px-2 rounded-lg text-left font-bold text-sm tracking-wider uppercase transition-colors ${
                              active
                                ? 'bg-teal-50/80 text-teal-950 font-extrabold'
                                : 'text-stone-800 hover:text-teal-950'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{link.label}</span>
                              {link.highlightBadge && (
                                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-teal-100 text-teal-900 border border-teal-200/60">
                                  {link.highlightBadge}
                                </span>
                              )}
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 text-stone-400 ${
                                isExpanded ? 'rotate-180 text-teal-950' : ''
                              }`}
                            />
                          </button>

                          {/* Accordion Submenu Items */}
                          {isExpanded && (
                            <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-teal-200/80 ml-2 mt-1">
                              {link.subItems?.map((sub: NavSubItem) => {
                                const subActive = isLinkActive(sub.href);
                                return (
                                  <Link
                                    key={sub.id || sub.label}
                                    href={sub.href}
                                    onClick={() => setMobileDrawerOpen(false)}
                                    className={`flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-semibold transition-colors ${
                                      subActive
                                        ? 'bg-teal-50 text-teal-950 font-bold border-l-2 border-teal-600'
                                        : 'text-stone-600 hover:text-teal-950 hover:bg-stone-50'
                                    }`}
                                  >
                                    <span>{sub.label}</span>
                                    {sub.badge && (
                                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-teal-100 text-teal-900 border border-teal-200/60">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMobileDrawerOpen(false)}
                          className={`flex items-center justify-between py-2.5 px-2 rounded-lg font-bold text-sm tracking-wider uppercase transition-colors ${
                            active
                              ? 'bg-teal-50 text-teal-950 font-extrabold border-l-4 border-teal-700 pl-3'
                              : 'text-stone-800 hover:text-teal-950'
                          }`}
                        >
                          <span>{link.label}</span>
                          {link.highlightBadge ? (
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-teal-100 text-teal-900 uppercase border border-teal-200/60">
                              {link.highlightBadge}
                            </span>
                          ) : (
                            <ArrowRight className="w-4 h-4 text-stone-300" />
                          )}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quick Utility Actions in Mobile Drawer */}
              <div className="pt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    onAccountClick?.();
                  }}
                  className="w-full flex items-center gap-3 py-2.5 px-2 rounded-lg text-xs font-bold text-stone-700 uppercase tracking-wider hover:text-teal-950 hover:bg-teal-50 transition-colors"
                >
                  <User className="w-4 h-4 text-teal-700" />
                  <span>My Account / Club Profile</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    onSearchClick?.();
                  }}
                  className="w-full flex items-center justify-between py-2.5 px-2 rounded-lg text-xs font-bold text-stone-700 uppercase tracking-wider hover:text-teal-950 hover:bg-teal-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-teal-700" />
                    <span>Search Catalog</span>
                  </div>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-stone-500 bg-stone-100 rounded border border-stone-200">
                    ⌘K
                  </kbd>
                </button>
              </div>
            </div>

            {/* Drawer Footer CTA */}
            {ctaPill && (
              <div className="p-5 border-t border-teal-900/10 bg-teal-50/50">
                <button
                  type="button"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    if (ctaPill.onClick) {
                      ctaPill.onClick();
                    } else if (ctaPill.href) {
                      router.push(ctaPill.href);
                    }
                  }}
                  className="w-full inline-flex items-center justify-center py-3 rounded-full text-xs font-bold tracking-widest uppercase text-white hover:opacity-95 transition-all shadow-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  {ctaPill.label}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default StoreHeader;

