import type { NavLinkItem, FooterSection, FooterSocialLink } from '@dipesh.singh/commerce-ui';

export interface ThemeConfig {
  id: string;
  name: string;
  preset: 'alpine' | 'amber' | 'espresso' | 'emerald' | 'crimson' | 'slate' | string;
  mode: 'light' | 'dark' | 'system' | string;
  primary_color: string;
  accent_color: string;
  surface_color: string;
  background_color: string;
  text_color: string;
  font_family: 'sans' | 'serif' | 'mono';
  border_radius: string;
  badge_text?: string;
  is_active: boolean;
  updated_at?: string;
}

export interface NavNode {
  id: string;
  label: string;
  url: string;
  badge?: string | null;
  is_external?: boolean;
  children?: NavNode[] | null;
}

export interface HeaderConfig {
  brand_name: string;
  brand_tagline?: string | null;
  brand_badge?: string | null;
  logo_url?: string | null;
  nodes: NavNode[];
  show_search?: boolean;
  show_cart?: boolean;
  show_spatial_finder?: boolean;
  sticky?: boolean;
}

export interface PromoBarConfig {
  enabled: boolean;
  text: string;
  cta_text?: string | null;
  cta_url?: string | null;
  theme: string;
  badge?: string | null;
  dismissible?: boolean;
}

export interface FooterLink {
  label: string;
  url: string;
  is_external?: boolean;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface FooterConfig {
  brand_name: string;
  brand_description?: string;
  columns: FooterColumn[];
  show_newsletter?: boolean;
  newsletter_title?: string | null;
  newsletter_placeholder?: string | null;
  social_links: SocialLink[];
  copyright: string;
}

export interface GlobalShellConfig {
  id?: string;
  promo_bar: PromoBarConfig;
  header: HeaderConfig;
  footer: FooterConfig;
  theme?: ThemeConfig;
}

export interface CMSPageSection {
  id: string;
  type: 'hero_banner' | 'promo_callout' | 'feature_grid' | 'rich_text' | 'testimonials' | 'category_lane' | 'product_lane' | string;
  title: string;
  subtitle?: string;
  is_active: boolean;
  sort_order: number;
  config: Record<string, any>;
}

export interface CMSPage {
  id: string;
  page_type: string;
  title: string;
  slug: string;
  description?: string;
  is_published: boolean;
  sections: CMSPageSection[];
  updated_at?: string;
}

export const DEFAULT_STORE_THEME: ThemeConfig = {
  id: 'theme_hill_jhil_alpine',
  name: 'Hill Jhil Alpine Tarn',
  preset: 'alpine',
  mode: 'light',
  primary_color: '#085454',
  accent_color: '#0d9488',
  surface_color: '#ffffff',
  background_color: '#f0fdfa',
  text_color: '#042f2e',
  font_family: 'serif',
  border_radius: 'rounded-2xl',
  badge_text: 'ALPINE ESTATE HARVEST',
  is_active: true,
};

export const DEFAULT_GLOBAL_SHELL: GlobalShellConfig = {
  promo_bar: {
    enabled: true,
    text: 'Complimentary express delivery on whole bean harvest orders over $50 · Small-batch roasted daily',
    cta_text: 'Explore Fresh Roasts',
    cta_url: '/coffees',
    theme: 'amber',
    badge: 'FRESH HARVEST',
    dismissible: true,
  },
  header: {
    brand_name: 'Hiljhil Roasters',
    brand_tagline: 'Specialty Sourced & Micro-Lot Roasted',
    brand_badge: 'FLAGSHIP ROASTERY',
    logo_url: '/logo.jpg',
    show_search: true,
    show_cart: true,
    show_spatial_finder: true,
    sticky: true,
    nodes: [
      {
        id: 'nav_coffees',
        label: 'Whole Bean Coffees',
        url: '/coffees',
        badge: 'FRESH',
        children: [
          { id: 'nav_single_origin', label: 'Single Origin Lots', url: '/coffees?category=single_origin' },
          { id: 'nav_producer_series', label: 'Producer Series Nano-Lots', url: '/coffees?category=producer_series', badge: 'EXCLUSIVE' },
          { id: 'nav_espresso_blends', label: 'House & Espresso Blends', url: '/coffees?category=espresso_blend' },
          { id: 'nav_decaf', label: 'Mountain Water Decaf', url: '/coffees?category=decaf' },
        ],
      },
      {
        id: 'nav_equipment',
        label: 'Espresso & Brewing Gear',
        url: '/equipment',
        children: [
          { id: 'nav_machines', label: 'Espresso Machines', url: '/equipment?category=espresso_machine' },
          { id: 'nav_grinders', label: 'Precision Burr Grinders', url: '/equipment?category=grinder' },
          { id: 'nav_accessories', label: 'Barista Tools & Drinkware', url: '/equipment?category=accessories' },
        ],
      },
      { id: 'nav_discovery', label: 'Discovery (CounterCheck™)', url: '/equipment', badge: 'SPATIAL 3D' },
      { id: 'nav_subscriptions', label: 'Roast Subscriptions', url: '/subscriptions', badge: 'SAVE 15%' },
      { id: 'nav_cafes', label: 'Roasteries & Cafes', url: '/cafes' },
      { id: 'nav_about', label: 'Our Story', url: '/about' },
    ],
  },
  footer: {
    brand_name: 'HILJHIL ROASTERS',
    brand_description: 'Artisan specialty coffee roasters dedicated to direct trade sourcing, anaerobic fermentation nano-lots, and precision-engineered brewing equipment.',
    show_newsletter: true,
    newsletter_title: 'Join the Roasters Circle',
    newsletter_placeholder: 'Enter your email for private lot access & brew recipes...',
    columns: [
      {
        id: 'col_shop',
        title: 'Shop Experience',
        links: [
          { label: 'Whole Bean Coffees', url: '/coffees' },
          { label: 'Espresso Machines', url: '/equipment?category=espresso_machine' },
          { label: 'Precision Grinders', url: '/equipment?category=grinder' },
          { label: 'Roast Subscriptions', url: '/subscriptions' },
          { label: 'Barista Drinkware', url: '/equipment' },
        ],
      },
      {
        id: 'col_roastery',
        title: 'Roastery & Craft',
        links: [
          { label: 'Sourcing Philosophy', url: '/about' },
          { label: 'Direct Trade Transparency', url: '/about' },
          { label: 'CounterCheck™ Clearance Guarantee', url: '/equipment' },
        ],
      },
      {
        id: 'col_guides',
        title: 'Learn & Brew',
        links: [
          { label: 'Espresso Extraction Guide', url: '/about' },
          { label: 'V60 & Chemex Ratio Calculator', url: '/about' },
          { label: 'Water Mineralization Science', url: '/about' },
          { label: 'Roast Schedule & Freshness', url: '/coffees' },
        ],
      },
      {
        id: 'col_support',
        title: 'Customer Care & Legal',
        links: [
          { label: 'Orders & Express Shipping', url: '/about' },
          { label: '3-Year Equipment Warranty', url: '/about' },
          { label: 'Privacy Policy', url: '/privacy' },
          { label: 'Terms of Service', url: '/terms' },
        ],
      },
    ],
    social_links: [
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'youtube', url: 'https://youtube.com' },
      { platform: 'x', url: 'https://x.com' },
    ],
    copyright: '© 2026 Hiljhil Roasters Co. All rights reserved. Precision-crafted for specialty coffee devotees.',
  },
  theme: DEFAULT_STORE_THEME,
};

const CONTENT_API_URL =
  process.env.CONTENT_API_URL ||
  process.env.NEXT_PUBLIC_CONTENT_API_URL ||
  'https://content-service-fzdcrf2fxq-uc.a.run.app/api/v1';

export function normalizeCmsUrl(url?: string | null): string {
  if (!url) return '/';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const clean = url.replace(/^#\/?/, '/');
  return clean.startsWith('/') ? clean : `/${clean}`;
}

export function transformHeaderToNavLinks(header?: HeaderConfig | null): NavLinkItem[] {
  if (!header?.nodes || !Array.isArray(header.nodes)) {
    return transformHeaderToNavLinks(DEFAULT_GLOBAL_SHELL.header);
  }
  return header.nodes.map((node) => ({
    id: node.id,
    label: node.label,
    href: normalizeCmsUrl(node.url),
    isHighlight: Boolean(node.badge),
    highlightBadge: node.badge || undefined,
    subItems:
      node.children && node.children.length > 0
        ? node.children.map((child) => ({
            id: child.id,
            label: child.label,
            href: normalizeCmsUrl(child.url),
            badge: child.badge || undefined,
          }))
        : undefined,
  }));
}

export function transformFooterToSections(footer?: FooterConfig | null): FooterSection[] {
  if (!footer?.columns || !Array.isArray(footer.columns)) {
    return transformFooterToSections(DEFAULT_GLOBAL_SHELL.footer);
  }
  return footer.columns.map((col) => ({
    title: col.title,
    links: (col.links || []).map((link) => ({
      label: link.label,
      href: normalizeCmsUrl(link.url),
      isExternal: link.is_external,
    })),
  }));
}

export function transformFooterSocialLinks(footer?: FooterConfig | null): FooterSocialLink[] {
  if (!footer?.social_links || !Array.isArray(footer.social_links)) {
    return (DEFAULT_GLOBAL_SHELL.footer.social_links || []).map((s) => ({
      platform: s.platform.toLowerCase(),
      href: s.url,
    }));
  }
  return footer.social_links.map((s) => ({
    platform: s.platform.toLowerCase(),
    href: s.url,
  }));
}

export async function fetchGlobalShell(): Promise<GlobalShellConfig> {
  if (CONTENT_API_URL) {
    try {
      const res = await fetch(`${CONTENT_API_URL}/cms/shell`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok) {
        const shell: GlobalShellConfig = await res.json();
        return {
          ...shell,
          promo_bar: shell.promo_bar || DEFAULT_GLOBAL_SHELL.promo_bar,
          header: shell.header || DEFAULT_GLOBAL_SHELL.header,
          footer: shell.footer || DEFAULT_GLOBAL_SHELL.footer,
          theme: shell.theme || DEFAULT_STORE_THEME,
        };
      }
    } catch (err) {
      console.warn(`[contentApi] Failed to fetch global shell from ${CONTENT_API_URL}:`, err);
    }
  }

  return DEFAULT_GLOBAL_SHELL;
}

export async function fetchActiveTheme(): Promise<ThemeConfig> {
  if (CONTENT_API_URL) {
    try {
      const res = await fetch(`${CONTENT_API_URL}/cms/shell/theme`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok) {
        const theme: ThemeConfig = await res.json();
        return theme;
      }
    } catch {
      // Fallback gracefully to default theme
    }
  }

  return DEFAULT_STORE_THEME;
}

export async function fetchCmsPage(slug: string): Promise<CMSPage | null> {
  if (CONTENT_API_URL) {
    try {
      const cleanSlug = slug.replace(/^\/+/, '');
      const res = await fetch(`${CONTENT_API_URL}/cms/pages/${cleanSlug}`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok) {
        const page: CMSPage = await res.json();
        return page;
      }
    } catch (err) {
      console.warn(`[contentApi] Failed to fetch CMS page "${slug}" from ${CONTENT_API_URL}:`, err);
    }
  }

  return null;
}
