export interface CatalogVariant {
  id?: string;
  size: string;
  weight_grams?: number;
  price: number;
  compare_at_price?: number | null;
  sku?: string;
  available?: boolean;
}

export interface CatalogProduct {
  id: string;
  name: string;
  slug?: string;
  brand: string;
  sku: string;
  category: string;
  price: number;
  compare_at_price?: number | null;
  status: 'active' | 'draft' | 'archived';
  in_stock: boolean;
  badge?: string | null;
  rating: number;
  review_count: number;
  tax_category: string;
  width_cm: number;
  height_cm: number;
  depth_cm: number;
  weight_kg?: number | null;
  top_clearance_cm: number;
  side_clearance_cm: number;
  rear_clearance_cm: number;
  roast_level?: string | null;
  process_method?: string | null;
  estate_name?: string | null;
  region?: string | null;
  elevation_m?: number | null;
  varietal?: string | null;
  resting_period_days?: number | null;
  acidity?: string | null;
  bitterness?: string | null;
  body?: string | null;
  best_enjoyed?: string | null;
  image_url?: string | null;
  cutout_url?: string | null;
  description?: string | null;
  taste_notes?: string[] | null;
  recommended_brew_methods?: string[] | null;
  variants?: CatalogVariant[] | null;
  images?: Array<{ position: number; src: string }> | null;
  specs_json?: string | null;
}

export interface CoffeeSpecsData {
  coordinates?: { lat: string; lng: string };
  sensory_scales?: { acidity: number; sweetness: number; body: number; bitterness: number; roast_level: number };
  estate_details?: {
    name: string;
    location: string;
    heritage: string;
    certifications?: string[];
  };
  origin_story?: string;
  resting_note?: string;
  brew_guides?: Array<{
    method: string;
    time: string;
    dose: string;
    water: string;
    temp: string;
    grind: string;
    ratio?: string;
    steps: string[];
  }>;
  [key: string]: any;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'coffee' | 'equipment';
  priceCents: number;
  compareAtCents?: number;
  badge?: string;
  heightCm?: number;
  rating: number;
  reviewCount: number;
  tasteNotes?: string[];
  specs?: Record<string, string>;
  description: string;
  image: string;
  images?: Array<{ position: number; src: string }>;
  inStock?: boolean;
  roastLevel?: string;
  estateName?: string;
  processMethod?: string;
  slug?: string;
  elevationM?: number;
  varietal?: string;
  region?: string;
  restingPeriodDays?: number;
  acidity?: string;
  bitterness?: string;
  body?: string;
  bestEnjoyed?: string;
  variants?: CatalogVariant[];
  specsData?: CoffeeSpecsData;
  sku?: string;
  specs_json?: string | null;
}

const CATALOG_API_URL =
  process.env.CATALOG_API_URL ||
  process.env.NEXT_PUBLIC_CATALOG_API_URL ||
  'https://product-catalog-service-fzdcrf2fxq-uc.a.run.app/api/v1';

export function transformCatalogProduct(p: CatalogProduct): ProductItem {
  let parsedSpecsData: CoffeeSpecsData | undefined;
  if (p.specs_json) {
    try {
      parsedSpecsData = JSON.parse(p.specs_json);
    } catch {}
  }

  return {
    id: p.id,
    name: p.name,
    category: p.category === 'coffee_beans' ? 'coffee' : 'equipment',
    priceCents: Math.round(p.price * 100),
    compareAtCents: p.compare_at_price ? Math.round(p.compare_at_price * 100) : undefined,
    badge: p.badge || undefined,
    heightCm: p.height_cm || 0,
    rating: p.rating || 5,
    reviewCount: p.review_count || 0,
    tasteNotes: p.taste_notes || [],
    specs: {
      Dimensions: `${p.width_cm || 0}W × ${p.height_cm || 0}H × ${p.depth_cm || 0}D cm`,
      Brand: p.brand,
      SKU: p.sku,
    },
    description: p.description || '',
    image: p.image_url || '',
    images: p.images || (p.image_url ? [{ position: 1, src: p.image_url }] : []),
    inStock: p.in_stock,
    roastLevel: p.roast_level || undefined,
    estateName: p.estate_name || undefined,
    processMethod: p.process_method || undefined,
    slug: p.slug || undefined,
    elevationM: p.elevation_m || undefined,
    varietal: p.varietal || undefined,
    region: p.region || undefined,
    restingPeriodDays: p.resting_period_days || undefined,
    acidity: p.acidity || undefined,
    bitterness: p.bitterness || undefined,
    body: p.body || undefined,
    bestEnjoyed: p.best_enjoyed || undefined,
    variants: p.variants || [],
    specsData: parsedSpecsData,
    sku: p.sku,
    specs_json: p.specs_json,
  };
}

export async function fetchProducts(filters: {
  category?: string;
  status?: string;
  brand?: string;
  q?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<ProductItem[]> {
  if (CATALOG_API_URL) {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.set('category', filters.category);
      if (filters.status) params.set('status', filters.status);
      if (filters.brand) params.set('brand', filters.brand);
      if (filters.q) params.set('q', filters.q);
      params.set('limit', String(filters.limit || 50));
      if (filters.offset) params.set('offset', String(filters.offset));

      const res = await fetch(`${CATALOG_API_URL}/products?${params.toString()}`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok) {
        const data = await res.json();
        const items: CatalogProduct[] = data.items || (Array.isArray(data) ? data : []);
        return items.map(transformCatalogProduct);
      }
    } catch {
      // Remote service temporarily unavailable
    }
  }

  return [];
}

export async function fetchProductByIdOrSlug(idOrSlug: string): Promise<ProductItem | null> {
  if (CATALOG_API_URL) {
    try {
      const res = await fetch(`${CATALOG_API_URL}/products/${idOrSlug}`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(3500),
      });

      if (res.status === 404) {
        return null;
      }

      if (res.ok) {
        const prod: CatalogProduct = await res.json();
        return transformCatalogProduct(prod);
      }
    } catch {
      // Remote service temporarily unavailable
    }
  }

  return null;
}

