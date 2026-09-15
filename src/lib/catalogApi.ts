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

export const FALLBACK_CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'prod_breville_barista_touch',
    name: 'Barista Touch Espresso Machine',
    slug: 'prod_breville_barista_touch',
    brand: 'Breville',
    sku: 'BES880BSS',
    category: 'espresso_machine',
    price: 999.95,
    status: 'active',
    in_stock: true,
    badge: 'BESTSELLER',
    rating: 4.9,
    review_count: 142,
    tax_category: 'standard',
    width_cm: 32.2,
    height_cm: 40.7,
    depth_cm: 32.2,
    top_clearance_cm: 12.0,
    side_clearance_cm: 5.0,
    rear_clearance_cm: 5.0,
    image_url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80',
    description: 'Touchscreen espresso machine with integrated precision conical burr grinder and automated microfoam texturing.',
    taste_notes: ['Espresso', 'Americano', 'Latte', 'Flat White', 'Cappuccino'],
    specs_json: JSON.stringify({
      collar_diameter: '54mm',
      portafilter_type: '54mm Stainless Steel',
      boiler: 'ThermoJet 3-second heat up',
      water_tank_l: 2.0,
      bean_hopper_g: 250,
    }),
  },
  {
    id: 'prod_fellow_ode_gen2',
    name: 'Ode Gen 2 Precision Brew Grinder',
    slug: 'prod_fellow_ode_gen2',
    brand: 'Fellow',
    sku: 'FEL-ODE-G2',
    category: 'grinder',
    price: 345.00,
    status: 'active',
    in_stock: true,
    badge: 'POPULAR',
    rating: 4.8,
    review_count: 89,
    tax_category: 'standard',
    width_cm: 12.0,
    height_cm: 24.1,
    depth_cm: 23.9,
    top_clearance_cm: 4.0,
    side_clearance_cm: 2.0,
    rear_clearance_cm: 2.0,
    image_url: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=600&auto=format&fit=crop&q=80',
    description: 'Low-profile single-dose electric brew grinder with 64mm professional-grade flat burrs engineered for pour-over and cold brew precision.',
  },
  {
    id: 'prod_delonghi_dedica',
    name: 'Dedica Deluxe Slim Espresso Machine',
    slug: 'prod_delonghi_dedica',
    brand: "De'Longhi",
    sku: 'EC680M',
    category: 'espresso_machine',
    price: 299.95,
    status: 'active',
    in_stock: true,
    rating: 4.6,
    review_count: 76,
    tax_category: 'standard',
    width_cm: 14.9,
    height_cm: 30.5,
    depth_cm: 33.0,
    top_clearance_cm: 5.0,
    side_clearance_cm: 3.0,
    rear_clearance_cm: 4.0,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    description: 'Ultra-slim 6-inch wide manual espresso machine engineered for tight kitchen coffee counters.',
  },
  {
    id: 'prod_hiljhil_guji',
    name: 'Ethiopian Guji Single Origin (250g)',
    slug: 'prod_hiljhil_guji',
    brand: 'Hiljhil Roasters',
    sku: 'HJ-GUJI-250',
    category: 'coffee_beans',
    price: 22.00,
    status: 'active',
    in_stock: true,
    badge: 'NANO LOT',
    rating: 5.0,
    review_count: 34,
    tax_category: 'coffee_beans',
    width_cm: 10.0,
    height_cm: 20.0,
    depth_cm: 6.0,
    top_clearance_cm: 0.0,
    side_clearance_cm: 0.0,
    rear_clearance_cm: 0.0,
    roast_level: 'light',
    process_method: 'natural',
    estate_name: 'Guji Highlands',
    region: 'Oromia, Ethiopia',
    elevation_m: 2100,
    varietal: 'Heirloom',
    image_url: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&auto=format&fit=crop&q=80',
    description: 'Heirloom natural process. Crisp floral aromas with sweet nectarine, wild lavender, and honey finish.',
    taste_notes: ['Wild Lavender', 'Peach', 'Jasmine', 'Raw Honey'],
  },
  {
    id: 'prod_hiljhil_espresso_blend',
    name: 'Highland Dark Peak Espresso Blend (500g)',
    slug: 'prod_hiljhil_espresso_blend',
    brand: 'Hiljhil Roasters',
    sku: 'HJ-DPE-500',
    category: 'coffee_beans',
    price: 28.50,
    status: 'active',
    in_stock: true,
    rating: 4.9,
    review_count: 51,
    tax_category: 'coffee_beans',
    width_cm: 12.0,
    height_cm: 24.0,
    depth_cm: 8.0,
    top_clearance_cm: 0.0,
    side_clearance_cm: 0.0,
    rear_clearance_cm: 0.0,
    roast_level: 'medium_dark',
    image_url: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&auto=format&fit=crop&q=80',
    description: 'Signature house espresso blend of Colombia & Sumatra. Dark chocolate, candied walnut, and velvety crema.',
    taste_notes: ['Dark Chocolate', 'Candied Walnut', 'Brown Sugar', 'Velvet Crema'],
  },
  {
    id: 'baarbara-whiskey',
    name: 'BAARBARA ESTATE - WHISKEY BARREL AGED',
    slug: 'baarbara-whiskey',
    brand: 'Hiljhil Roasters',
    sku: 'HJ-BAR-150',
    category: 'coffee_beans',
    price: 15.00,
    status: 'active',
    in_stock: true,
    rating: 5.0,
    review_count: 22,
    tax_category: 'coffee_beans',
    width_cm: 10.0,
    height_cm: 20.0,
    depth_cm: 6.0,
    top_clearance_cm: 0.0,
    side_clearance_cm: 0.0,
    rear_clearance_cm: 0.0,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&h=600&fit=crop&q=80',
    description: 'Ripe banana, Red Plum, Whiskey Oak, and Brown Sugar notes.',
    taste_notes: ['Ripe Banana', 'Red Plum', 'Whiskey Oak', 'Brown Sugar'],
  },
];

export async function fetchProductByIdOrSlug(idOrSlug: string): Promise<ProductItem | null> {
  if (CATALOG_API_URL) {
    try {
      const res = await fetch(`${CATALOG_API_URL}/products/${idOrSlug}`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(3500),
      });

      if (res.status === 404) {
        // Check fallback before bailing out
        const fallback = FALLBACK_CATALOG_PRODUCTS.find(
          (p) => p.id === idOrSlug || p.slug === idOrSlug
        );
        return fallback ? transformCatalogProduct(fallback) : null;
      }

      if (res.ok) {
        const prod: CatalogProduct = await res.json();
        return transformCatalogProduct(prod);
      }
    } catch {
      // Remote service temporarily unavailable, proceed to fallback
    }
  }

  // Fallback for offline / local development
  const fallback = FALLBACK_CATALOG_PRODUCTS.find(
    (p) => p.id === idOrSlug || p.slug === idOrSlug
  );
  if (fallback) {
    return transformCatalogProduct(fallback);
  }

  return null;
}

export async function fetchEquipment(maxHeightCm?: number): Promise<ProductItem[]> {
  if (CATALOG_API_URL) {
    try {
      const url = maxHeightCm !== undefined
        ? `${CATALOG_API_URL}/products/search/by-dimensions?max_height_cm=${maxHeightCm}&category=equipment`
        : `${CATALOG_API_URL}/products?category=equipment&limit=50`;

      const res = await fetch(url, {
        cache: 'no-store',
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok) {
        const data = await res.json();
        const items: CatalogProduct[] = Array.isArray(data) ? data : data.items || [];
        return items.map(transformCatalogProduct);
      }
    } catch {
      // Remote service temporarily unavailable
    }
  }

  return [];
}

export interface SpatialFitment {
  adds_height_cm: number;
  total_height_cm: number;
  requires_overhead_clearance: boolean;
}

export interface CompatibleAccessory {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  priceCents: number;
  margin_rate?: number;
  fits: Record<string, string>;
  description: string;
  image_url?: string;
  semantic_similarity?: number;
  composite_score?: number;
  spatial?: SpatialFitment | null;
}

const SPECLOCK_API_URL =
  process.env.SPECLOCK_API_URL ||
  process.env.NEXT_PUBLIC_SPECLOCK_API_URL ||
  'https://speclock-api-idizg25sza-uc.a.run.app/api/v1';

export async function fetchCompatibleAccessories(
  product: ProductItem | CatalogProduct
): Promise<CompatibleAccessory[]> {
  // Coffee items do not have machine accessories
  if (product.category === 'coffee' || product.category === 'coffee_beans') {
    return [];
  }

  const sku = (product as any).sku || (product as any).specs?.SKU || product.id;
  const candidateIds = [
    `M_${sku.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`,
    sku,
    product.id,
  ];

  // 1. Attempt fetching from specLock API
  for (const machineId of candidateIds) {
    try {
      const res = await fetch(
        `${SPECLOCK_API_URL}/recommend/compatible?machine_id=${encodeURIComponent(machineId)}&stage2=true`,
        {
          cache: 'no-store',
          signal: AbortSignal.timeout(3500),
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.items) && data.items.length > 0) {
          return data.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            sku: item.sku,
            category: item.category,
            price: item.price,
            priceCents: Math.round(item.price * 100),
            margin_rate: item.margin_rate,
            fits: item.fits || {},
            description: item.description,
            image_url: item.image_url,
            semantic_similarity: item.semantic_similarity,
            composite_score: item.composite_score,
            spatial: item.spatial || null,
          }));
        }
      }
    } catch {
      // Continue to next candidate or fallback
    }
  }

  // 2. Fallback: Query product-catalog-service directly
  try {
    const res = await fetch(`${CATALOG_API_URL}/products?limit=100`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(3500),
    });

    if (res.ok) {
      const raw = await res.json();
      const allProducts: CatalogProduct[] = Array.isArray(raw) ? raw : raw.items || [];
      const accessories = allProducts.filter(
        (p) =>
          p.category !== 'coffee_beans' &&
          p.category !== 'espresso_machine' &&
          p.category !== 'equipment' &&
          p.category !== 'producer_series' &&
          p.category !== 'sampler'
      );

      // Determine machine specs
      let machineCollar = '54mm';
      let machineHeight = (product as any).height_cm || (product as any).heightCm || 40.0;
      let machineClearance = (product as any).top_clearance_cm || 0.0;
      if (product.specs_json) {
        try {
          const sp = JSON.parse(product.specs_json);
          if (sp.collar_diameter) machineCollar = sp.collar_diameter;
          if (sp.height_cm) machineHeight = Number(sp.height_cm);
          if (sp.top_clearance_cm) machineClearance = Number(sp.top_clearance_cm);
        } catch {}
      }

      const matching = accessories.filter((acc) => {
        if (!acc.specs_json) return true; // universal
        try {
          const sp = JSON.parse(acc.specs_json);
          const fits = sp.fits || {};
          const collar = fits.collar_diameter;
          if (!collar || collar === 'universal') return true;
          return collar === machineCollar;
        } catch {
          return true;
        }
      });

      return matching.map((acc) => {
        let fits: Record<string, string> = {};
        let addsHeight = 0.0;
        let marginRate = 0.55;
        if (acc.specs_json) {
          try {
            const sp = JSON.parse(acc.specs_json);
            fits = sp.fits || {};
            addsHeight = Number(sp.adds_height_cm || 0);
            marginRate = Number(sp.margin_rate || 0.55);
          } catch {}
        }

        let spatial: SpatialFitment | null = null;
        if (addsHeight > 0) {
          const totalHeight = machineHeight + addsHeight;
          const reqClearance =
            machineClearance > 0 && totalHeight > machineHeight + machineClearance;
          spatial = {
            adds_height_cm: addsHeight,
            total_height_cm: Number(totalHeight.toFixed(1)),
            requires_overhead_clearance: reqClearance,
          };
        }

        return {
          id: acc.id,
          name: acc.name,
          sku: acc.sku,
          category: acc.category,
          price: acc.price,
          priceCents: Math.round(acc.price * 100),
          margin_rate: marginRate,
          fits,
          description: acc.description || '',
          image_url: acc.image_url || undefined,
          spatial,
        };
      });
    }
  } catch {
    // Return empty on failure
  }

  return [];
}

