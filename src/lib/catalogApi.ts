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
  inStock?: boolean;
  roastLevel?: string;
  estateName?: string;
  processMethod?: string;
  slug?: string;
}

const CATALOG_API_URL =
  process.env.CATALOG_API_URL ||
  process.env.NEXT_PUBLIC_CATALOG_API_URL ||
  'http://localhost:8001/api/v1';

export function transformCatalogProduct(prod: CatalogProduct): ProductItem {
  const isEquipment = prod.category === 'equipment';
  const specs: Record<string, string> = {};

  if (isEquipment) {
    if (prod.width_cm && prod.height_cm && prod.depth_cm) {
      specs['Dimensions'] = `${prod.width_cm} × ${prod.height_cm} × ${prod.depth_cm} cm`;
    }
    if (prod.top_clearance_cm > 0) {
      specs['Clearance'] = `Requires ${prod.height_cm + prod.top_clearance_cm} cm vertical headroom`;
    }
    if (prod.brand) specs['Brand'] = prod.brand;
  } else {
    if (prod.estate_name) specs['Estate'] = prod.estate_name;
    if (prod.elevation_m) specs['Altitude'] = `${prod.elevation_m} MASL`;
    if (prod.roast_level) specs['Roast Level'] = prod.roast_level;
    if (prod.process_method) specs['Process'] = prod.process_method;
    if (prod.region) specs['Region'] = prod.region;
    if (prod.varietal) specs['Varietal'] = prod.varietal;
  }

  return {
    id: prod.id,
    name: prod.name,
    category: isEquipment ? 'equipment' : 'coffee',
    priceCents: Math.round((prod.price || 0) * 100),
    compareAtCents: prod.compare_at_price ? Math.round(prod.compare_at_price * 100) : undefined,
    badge: prod.badge || undefined,
    heightCm: prod.height_cm || undefined,
    rating: prod.rating || 5.0,
    reviewCount: prod.review_count || 0,
    tasteNotes: Array.isArray(prod.taste_notes) ? prod.taste_notes : [],
    specs,
    description: prod.description || '',
    image: prod.image_url || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800',
    inStock: prod.in_stock,
    roastLevel: prod.roast_level || undefined,
    estateName: prod.estate_name || undefined,
    processMethod: prod.process_method || undefined,
    slug: prod.slug,
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
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.status) params.set('status', filters.status);
  if (filters.brand) params.set('brand', filters.brand);
  if (filters.q) params.set('q', filters.q);
  params.set('limit', String(filters.limit || 50));
  if (filters.offset) params.set('offset', String(filters.offset));

  const res = await fetch(`${CATALOG_API_URL}/products?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products from catalog service: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const items: CatalogProduct[] = data.items || [];
  return items.map(transformCatalogProduct);
}

export async function fetchProductByIdOrSlug(idOrSlug: string): Promise<ProductItem | null> {
  const res = await fetch(`${CATALOG_API_URL}/products/${idOrSlug}`, {
    cache: 'no-store',
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${idOrSlug}: ${res.status} ${res.statusText}`);
  }

  const prod: CatalogProduct = await res.json();
  return transformCatalogProduct(prod);
}

export async function fetchEquipment(maxHeightCm?: number): Promise<ProductItem[]> {
  if (maxHeightCm !== undefined) {
    const res = await fetch(`${CATALOG_API_URL}/products/search/by-dimensions?max_height_cm=${maxHeightCm}&category=equipment`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const items: CatalogProduct[] = await res.json();
      return items.map(transformCatalogProduct);
    }
  }

  return fetchProducts({ category: 'equipment', limit: 50 });
}
