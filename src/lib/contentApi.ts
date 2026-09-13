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
  'https://content-service-518971663061.us-central1.run.app/api/v1';

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
