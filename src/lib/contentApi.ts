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

const CONTENT_API_URL =
  process.env.CONTENT_API_URL ||
  process.env.NEXT_PUBLIC_CONTENT_API_URL ||
  'https://content-service-fzdcrf2fxq-uc.a.run.app/api/v1';

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
