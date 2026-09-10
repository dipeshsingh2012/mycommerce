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
}

export const CATALOG_DATA: Record<string, ProductItem> = {
  prod_baarbara_whiskey: {
    id: 'prod_baarbara_whiskey',
    name: 'Baarbara Estate - Whiskey Barrel Aged',
    category: 'coffee',
    priceCents: 125000,
    compareAtCents: 140000,
    badge: 'EXCLUSIVE HARVEST',
    rating: 4.9,
    reviewCount: 128,
    tasteNotes: ['Ripe Banana', 'Red Plum', 'Whiskey Oak', 'Caramelized Honey'],
    description:
      'Aged in authentic charred oak whiskey barrels for 60 days before drum roasting. Yields an intoxicating aroma with rich fruit notes and zero alcohol.',
    specs: {
      'Estate': 'Baarbara Estate, Chikmagalur',
      'Altitude': '1,450 MASL',
      'Roast Level': 'Medium Light',
      'Process': 'Whiskey Barrel Washed',
    },
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
  prod_attikan_estate: {
    id: 'prod_attikan_estate',
    name: 'Attikan Estate - Dark Roast',
    category: 'coffee',
    priceCents: 55000,
    badge: 'BESTSELLER',
    rating: 5.0,
    reviewCount: 342,
    tasteNotes: ['Dark Chocolate', 'Roasted Almonds', 'Dried Figs', 'Heavy Crema'],
    description:
      'Grown in the Biligiriranga Hills. A rich, low-acidity classic tailored for milk-based espresso drinks, mokapots, and French press brews.',
    specs: {
      'Estate': 'Attikan Estate, BR Hills',
      'Altitude': '1,600 MASL',
      'Roast Level': 'Dark Espresso',
      'Process': 'Pulp Sun-Dried',
    },
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
  prod_silver_oak_blend: {
    id: 'prod_silver_oak_blend',
    name: 'Silver Oak Blend - Medium Roast',
    category: 'coffee',
    priceCents: 52000,
    rating: 4.8,
    reviewCount: 95,
    tasteNotes: ['Hazelnut', 'Mild Citrus', 'Wild Honey'],
    description:
      'Our house morning blend pairing Chikmagalur washed arabica with sweet natural lots. Smooth, comforting, and sweet.',
    specs: {
      'Origin': 'Western Ghats Single Estates',
      'Roast Level': 'Medium',
      'Process': 'Washed & Natural Blend',
    },
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
  prod_vienna_roast: {
    id: 'prod_vienna_roast',
    name: 'Vienna Roast - Deep & Smoky',
    category: 'coffee',
    priceCents: 53000,
    badge: 'POPULAR',
    rating: 4.7,
    reviewCount: 88,
    tasteNotes: ['Cocoa Nibs', 'Burnt Caramel', 'Toasted Walnut', 'Heavy Crema'],
    description:
      'An intense, full-bodied dark roast developed for bold morning cups with rich milk sweetness and lingering toasted dark cacao notes.',
    specs: {
      'Estate': 'Shevaroys & Nilgiris Blend',
      'Altitude': '1,350 MASL',
      'Roast Level': 'Vienna Dark',
      'Process': 'Double Washed',
    },
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
  prod_cold_brew_blend: {
    id: 'prod_cold_brew_blend',
    name: 'Summer Cold Brew Blend - Coarse',
    category: 'coffee',
    priceCents: 58000,
    rating: 4.9,
    reviewCount: 114,
    tasteNotes: ['Sweet Citrus', 'Milk Chocolate', 'Stone Fruits', 'Low Acidity'],
    description:
      'Coarsely ground specialty lot designed for 18-hour cold immersion brewing. Silky, refreshing, naturally sweet, with near-zero bitterness.',
    specs: {
      'Origin': 'Karnatake Arabica & Robusta',
      'Altitude': '1,200 MASL',
      'Roast Level': 'Medium Dark',
      'Brew Method': '18hr Cold Immersion',
    },
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
  prod_easy_pour_box: {
    id: 'prod_easy_pour_box',
    name: 'Easy Pour Drip Bags - 10 Pack',
    category: 'coffee',
    priceCents: 45000,
    badge: 'EASY BREW',
    rating: 4.8,
    reviewCount: 210,
    tasteNotes: ['Caramel', 'Roasted Almond', 'Milk Chocolate'],
    description:
      'Individually nitrogen-flushed filter drip bags containing fresh roasted specialty grounds. Pour hot water directly anywhere, anytime without equipment.',
    specs: {
      'Pack Size': '10 Single Serve Sachets',
      'Shelf Life': '6 Months Nitrogen Sealed',
      'Roast Level': 'Medium Dark',
    },
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
  prod_breville_barista_touch: {
    id: 'prod_breville_barista_touch',
    name: 'Breville Barista Touch Impress Espresso Machine',
    category: 'equipment',
    priceCents: 8990000,
    compareAtCents: 9500000,
    badge: 'FLAGSHIP GEAR',
    heightCm: 41.0,
    rating: 5.0,
    reviewCount: 47,
    description:
      'Automated touchscreen espresso system featuring assisted tamping, automated precision dosing, and intelligent microfoam texturing with real-time barista feedback.',
    specs: {
      'Dimensions': '32.2 x 40.7 x 32.2 cm',
      'Counter Clearance': 'Requires 45 cm standard cabinet clearance',
      'Boiler': 'ThermoJet 3-second rapid heating',
      'Hopper Capacity': '340g bean capacity with airtight lock',
    },
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
  prod_fellow_ode_gen2: {
    id: 'prod_fellow_ode_gen2',
    name: 'Fellow Ode Brew Grinder Gen 2',
    category: 'equipment',
    priceCents: 2850000,
    badge: 'PRECISION BURR',
    heightCm: 24.1,
    rating: 4.9,
    reviewCount: 84,
    description:
      'Engineered for pour-over and drip brewing with commercial-grade 64mm flat burrs, anti-static technology, and single-dose zero-retention loading.',
    specs: {
      'Dimensions': '24.1 x 12.0 x 23.9 cm',
      'Burrs': '64mm stainless steel flat burrs',
      'Capacity': '100g single-dose load',
      'Clearance': 'Fits under any cabinet (24.1 cm height)',
    },
    image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=800&auto=format&fit=crop&q=80',
    inStock: true,
  },
};

export const ALL_PRODUCTS = Object.values(CATALOG_DATA);
