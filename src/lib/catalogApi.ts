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
  '';

export const FALLBACK_CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'prod_hiljhil_guji',
    name: 'Ethiopian Guji Single Origin (250g)',
    brand: 'Hiljhil Roasters',
    sku: 'HJ-GUJI-250',
    category: 'coffee_beans',
    price: 950.0,
    compare_at_price: 1100.0,
    status: 'active',
    tax_category: 'standard',
    badge: 'Direct Trade',
    in_stock: true,
    rating: 4.9,
    review_count: 142,
    roast_level: 'Light-Medium',
    estate_name: 'Shakiso Farm',
    elevation_m: 2150,
    process_method: 'Heirloom Natural',
    region: 'Guji Zone, Oromia',
    varietal: 'Indigenous Heirloom',
    taste_notes: ['Wild Lavender', 'Ripe Nectarine', 'Bergamot Tea'],
    width_cm: 10.0,
    height_cm: 20.0,
    depth_cm: 6.0,
    top_clearance_cm: 0.0,
    side_clearance_cm: 0.0,
    rear_clearance_cm: 0.0,
    image_url: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&auto=format&fit=crop&q=80',
    description: 'Direct-trade heirloom lot from Shakiso in Guji. Crisp floral aromatics giving way to ripe nectarine sweetness and a lingering honey-bergamot finish.',
    slug: 'ethiopian-guji-single-origin',
  },
  {
    id: 'prod_hiljhil_espresso_blend',
    name: 'Highland Dark Peak Espresso Blend (500g)',
    brand: 'Hiljhil Roasters',
    sku: 'HJ-DPE-500',
    category: 'coffee_beans',
    price: 850.0,
    compare_at_price: 950.0,
    status: 'active',
    tax_category: 'standard',
    badge: 'Signature Blend',
    in_stock: true,
    rating: 5.0,
    review_count: 289,
    roast_level: 'Medium-Dark',
    estate_name: 'Hiljhil Blend (Colombia / Sumatra)',
    elevation_m: 1800,
    process_method: 'Washed & Wet-Hulled',
    region: 'Huila & Mandheling',
    varietal: 'Castillo, Typica',
    taste_notes: ['Dark Chocolate', 'Candied Walnut', 'Velvety Crema'],
    width_cm: 12.0,
    height_cm: 24.0,
    depth_cm: 8.0,
    top_clearance_cm: 0.0,
    side_clearance_cm: 0.0,
    rear_clearance_cm: 0.0,
    image_url: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&auto=format&fit=crop&q=80',
    description: 'Our signature cafe bar espresso blend. Formulated to cut through textured oat and whole milk with dense bittersweet chocolate fudge and spiced hazelnut.',
    slug: 'highland-dark-peak-espresso-blend',
  },
  {
    id: 'prod_baarbara_whiskey',
    name: 'Baarbara Estate - Whiskey Barrel Aged (250g)',
    brand: 'Hiljhil Roasters',
    sku: 'HJ-BB-250',
    category: 'coffee_beans',
    price: 1250.0,
    compare_at_price: 1400.0,
    status: 'active',
    tax_category: 'standard',
    badge: 'Limited Reserve',
    in_stock: true,
    rating: 4.95,
    review_count: 67,
    roast_level: 'Medium',
    estate_name: 'Baarbara Estate',
    elevation_m: 1550,
    process_method: 'Oak Barrel Aged Natural',
    region: 'Chikmagalur, Western Ghats',
    varietal: 'SLN 795',
    taste_notes: ['Vanilla Oak', 'Peated Malt', 'Dried Plum'],
    width_cm: 10.0,
    height_cm: 20.0,
    depth_cm: 6.0,
    top_clearance_cm: 0.0,
    side_clearance_cm: 0.0,
    rear_clearance_cm: 0.0,
    image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80',
    description: 'Conditioned in charred oak single-malt whiskey barrels for 45 days prior to drum roasting. Ultra-rich aromatics without alcoholic content.',
    slug: 'baarbara-estate-whiskey-barrel-aged',
  },
  {
    id: 'prod_attikan_estate',
    name: 'Attikan Estate - Dark Roast (250g)',
    brand: 'Hiljhil Roasters',
    sku: 'HJ-ATK-250',
    category: 'coffee_beans',
    price: 550.0,
    compare_at_price: 600.0,
    status: 'active',
    tax_category: 'standard',
    badge: 'Bestseller',
    in_stock: true,
    rating: 4.85,
    review_count: 310,
    roast_level: 'Dark',
    estate_name: 'Attikan Estate, BR Hills',
    elevation_m: 1650,
    process_method: 'Washed',
    region: 'Biligirirangana Hills',
    varietal: 'S.795 & Kent',
    taste_notes: ['Smoked Cocoa', 'Fig', 'Brown Sugar'],
    width_cm: 10.0,
    height_cm: 20.0,
    depth_cm: 6.0,
    top_clearance_cm: 0.0,
    side_clearance_cm: 0.0,
    rear_clearance_cm: 0.0,
    image_url: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=800&auto=format&fit=crop&q=80',
    description: 'Deep high-elevation shade-grown dark roast from the evergreen BR Hills. Heavy body with molasses sweetness, perfect for South Indian filter or Moka Pot.',
    slug: 'attikan-estate-dark-roast',
  },
  {
    id: 'prod_silver_oak_blend',
    name: 'Silver Oak Blend - Medium Roast (250g)',
    brand: 'Hiljhil Roasters',
    sku: 'HJ-SOB-250',
    category: 'coffee_beans',
    price: 520.0,
    status: 'active',
    tax_category: 'standard',
    badge: 'Classic',
    in_stock: true,
    rating: 4.8,
    review_count: 95,
    roast_level: 'Medium',
    estate_name: 'Western Ghats Single Estates',
    elevation_m: 1400,
    process_method: 'Washed & Natural Blend',
    region: 'Chikmagalur',
    varietal: 'SLN 795 & Arabica',
    taste_notes: ['Hazelnut', 'Mild Citrus', 'Wild Honey'],
    width_cm: 10.0,
    height_cm: 20.0,
    depth_cm: 6.0,
    top_clearance_cm: 0.0,
    side_clearance_cm: 0.0,
    rear_clearance_cm: 0.0,
    image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80',
    description: 'Our house morning blend pairing Chikmagalur washed arabica with sweet natural lots. Smooth, comforting, and sweet.',
    slug: 'silver-oak-blend-medium-roast',
  },
  {
    id: 'prod_vienna_roast',
    name: 'Vienna Roast - Deep & Smoky (250g)',
    brand: 'Hiljhil Roasters',
    sku: 'HJ-VR-250',
    category: 'coffee_beans',
    price: 530.0,
    status: 'active',
    tax_category: 'standard',
    badge: 'Popular',
    in_stock: true,
    rating: 4.7,
    review_count: 88,
    roast_level: 'Vienna Dark',
    estate_name: 'Shevaroys & Nilgiris Blend',
    elevation_m: 1350,
    process_method: 'Double Washed',
    region: 'Nilgiri Hills',
    varietal: 'Arabica & Selection 9',
    taste_notes: ['Cocoa Nibs', 'Burnt Caramel', 'Toasted Walnut'],
    width_cm: 10.0,
    height_cm: 20.0,
    depth_cm: 6.0,
    top_clearance_cm: 0.0,
    side_clearance_cm: 0.0,
    rear_clearance_cm: 0.0,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    description: 'An intense, full-bodied dark roast developed for bold morning cups with rich milk sweetness and lingering toasted dark cacao notes.',
    slug: 'vienna-roast-deep-smoky',
  },
  {
    id: 'prod_cold_brew_blend',
    name: 'Summer Cold Brew Blend - Coarse (250g)',
    brand: 'Hiljhil Roasters',
    sku: 'HJ-CBB-250',
    category: 'coffee_beans',
    price: 580.0,
    status: 'active',
    tax_category: 'standard',
    badge: 'Summer Special',
    in_stock: true,
    rating: 4.9,
    review_count: 114,
    roast_level: 'Medium Dark',
    estate_name: 'Karnataka High Elevation Lot',
    elevation_m: 1200,
    process_method: 'Pulp Natural',
    region: 'Coorg & Chikmagalur',
    varietal: 'Specialty Arabica & Robusta',
    taste_notes: ['Sweet Citrus', 'Milk Chocolate', 'Stone Fruits'],
    width_cm: 10.0,
    height_cm: 20.0,
    depth_cm: 6.0,
    top_clearance_cm: 0.0,
    side_clearance_cm: 0.0,
    rear_clearance_cm: 0.0,
    image_url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    description: 'Coarsely ground specialty lot designed for 18-hour cold immersion brewing. Silky, refreshing, naturally sweet, with near-zero bitterness.',
    slug: 'summer-cold-brew-blend',
  },
  {
    id: 'prod_easy_pour_box',
    name: 'Easy Pour Drip Bags - 10 Pack',
    brand: 'Hiljhil Roasters',
    sku: 'HJ-EPB-10',
    category: 'coffee_beans',
    price: 450.0,
    status: 'active',
    tax_category: 'standard',
    badge: 'Easy Brew',
    in_stock: true,
    rating: 4.8,
    review_count: 210,
    roast_level: 'Medium Dark',
    estate_name: 'Single Estate Lot',
    elevation_m: 1400,
    process_method: 'Washed',
    region: 'Chikmagalur',
    varietal: 'SLN 795',
    taste_notes: ['Caramel', 'Roasted Almond', 'Milk Chocolate'],
    width_cm: 12.0,
    height_cm: 15.0,
    depth_cm: 8.0,
    top_clearance_cm: 0.0,
    side_clearance_cm: 0.0,
    rear_clearance_cm: 0.0,
    image_url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    description: 'Individually nitrogen-flushed filter drip bags containing fresh roasted specialty grounds. Pour hot water directly anywhere, anytime without equipment.',
    slug: 'easy-pour-drip-bags-10-pack',
  },
  {
    id: 'prod_breville_barista_touch',
    name: 'Barista Touch Espresso Machine',
    brand: 'Breville',
    sku: 'BES880BSS',
    category: 'equipment',
    price: 89900.0,
    compare_at_price: 95000.0,
    status: 'active',
    tax_category: 'standard',
    badge: 'CounterCheck Verified',
    in_stock: true,
    rating: 4.9,
    review_count: 840,
    width_cm: 32.2,
    height_cm: 40.7,
    depth_cm: 32.2,
    top_clearance_cm: 12.0,
    side_clearance_cm: 5.0,
    rear_clearance_cm: 5.0,
    image_url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&auto=format&fit=crop&q=80',
    description: 'Automated touchscreen espresso machine with integrated precision conical burr grinder and automated microfoam texturing.',
    slug: 'breville-barista-touch-espresso-machine',
  },
  {
    id: 'prod_delonghi_dedica',
    name: 'Dedica Deluxe Slim Espresso Machine',
    brand: "De'Longhi",
    sku: 'EC680M',
    category: 'equipment',
    price: 29995.0,
    status: 'active',
    tax_category: 'standard',
    badge: 'Compact Fit',
    in_stock: true,
    rating: 4.7,
    review_count: 512,
    width_cm: 14.9,
    height_cm: 30.5,
    depth_cm: 33.0,
    top_clearance_cm: 5.0,
    side_clearance_cm: 3.0,
    rear_clearance_cm: 4.0,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    description: 'Ultra-slim 6-inch wide manual espresso machine engineered for tight kitchen coffee bars and apartment countertops.',
    slug: 'delonghi-dedica-deluxe-slim',
  },
  {
    id: 'prod_breville_bambino',
    name: 'Bambino Plus Compact Espresso Machine',
    brand: 'Breville',
    sku: 'BES500BSS',
    category: 'equipment',
    price: 49995.0,
    status: 'active',
    tax_category: 'standard',
    badge: 'Rapid Heatup',
    in_stock: true,
    rating: 4.8,
    review_count: 420,
    width_cm: 19.5,
    height_cm: 31.0,
    depth_cm: 32.0,
    top_clearance_cm: 5.0,
    side_clearance_cm: 3.0,
    rear_clearance_cm: 4.0,
    image_url: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=800&auto=format&fit=crop&q=80',
    description: 'Compact espresso machine delivering cafe-quality third wave specialty coffee with 3-second ThermoJet heatup system.',
    slug: 'breville-bambino-plus-compact',
  },
  {
    id: 'prod_fellow_ode_gen2',
    name: 'Ode Gen 2 Precision Brew Grinder',
    brand: 'Fellow',
    sku: 'FEL-ODE-G2',
    category: 'equipment',
    price: 28500.0,
    status: 'active',
    tax_category: 'standard',
    badge: 'Barista Choice',
    in_stock: true,
    rating: 4.9,
    review_count: 365,
    width_cm: 12.0,
    height_cm: 24.1,
    depth_cm: 23.9,
    top_clearance_cm: 4.0,
    side_clearance_cm: 2.0,
    rear_clearance_cm: 2.0,
    image_url: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=800&auto=format&fit=crop&q=80',
    description: 'Low-profile single dose grinder with 64mm professional flat burrs designed specifically for pour-overs, French press, and cold brews.',
    slug: 'fellow-ode-gen-2-grinder',
  },
];

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
        signal: AbortSignal.timeout(3000),
      });

      if (res.ok) {
        const data = await res.json();
        const items: CatalogProduct[] = data.items || [];
        return items.map(transformCatalogProduct);
      }
    } catch {
      // Fallback seamlessly to offline static products
    }
  }

  // Resilient offline fallback
  let items = [...FALLBACK_CATALOG_PRODUCTS];
  if (filters.category && filters.category !== 'all') {
    items = items.filter((p) => p.category === filters.category);
  }
  if (filters.brand) {
    items = items.filter((p) => p.brand?.toLowerCase() === filters.brand!.toLowerCase());
  }
  if (filters.q) {
    const qLower = filters.q.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(qLower) ||
        p.description?.toLowerCase().includes(qLower) ||
        (p.taste_notes && p.taste_notes.some((t) => t.toLowerCase().includes(qLower)))
    );
  }
  if (filters.limit) {
    items = items.slice(0, filters.limit);
  }

  return items.map(transformCatalogProduct);
}

export async function fetchProductByIdOrSlug(idOrSlug: string): Promise<ProductItem | null> {
  if (CATALOG_API_URL) {
    try {
      const res = await fetch(`${CATALOG_API_URL}/products/${idOrSlug}`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(3000),
      });

      if (res.status === 404) {
        return null;
      }

      if (res.ok) {
        const prod: CatalogProduct = await res.json();
        return transformCatalogProduct(prod);
      }
    } catch {
      // Fallback seamlessly
    }
  }

  const found = FALLBACK_CATALOG_PRODUCTS.find(
    (p) => p.id === idOrSlug || p.slug === idOrSlug
  );

  return found ? transformCatalogProduct(found) : null;
}

export async function fetchEquipment(maxHeightCm?: number): Promise<ProductItem[]> {
  if (CATALOG_API_URL) {
    try {
      const url = maxHeightCm !== undefined
        ? `${CATALOG_API_URL}/products/search/by-dimensions?max_height_cm=${maxHeightCm}&category=equipment`
        : `${CATALOG_API_URL}/products?category=equipment&limit=50`;

      const res = await fetch(url, {
        cache: 'no-store',
        signal: AbortSignal.timeout(3000),
      });

      if (res.ok) {
        const data = await res.json();
        const items: CatalogProduct[] = Array.isArray(data) ? data : data.items || [];
        return items.map(transformCatalogProduct);
      }
    } catch {
      // Fallback seamlessly
    }
  }

  let equipment = FALLBACK_CATALOG_PRODUCTS.filter((p) => p.category === 'equipment');
  if (maxHeightCm !== undefined) {
    equipment = equipment.filter((p) => (p.height_cm || 0) <= maxHeightCm);
  }
  return equipment.map(transformCatalogProduct);
}

