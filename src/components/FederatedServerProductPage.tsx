import React from 'react';
import path from 'path';
import { FederatedServerComponent } from './FederatedServerComponent';
import { ProductItem, CatalogProduct } from '@/lib/catalogApi';

interface FederatedServerProductPageProps {
  productId: string;
  initialProduct?: ProductItem | CatalogProduct | null;
}

const CLIENT_MFE_URL =
  process.env.NEXT_PUBLIC_MFE_PRODUCT_PAGE_URL ||
  process.env.VITE_MFE_PRODUCT_PAGE_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/product-page-ui/assets/remoteEntry.js';

const SSR_MFE_URL =
  process.env.MFE_PRODUCT_PAGE_SSR_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/product-page-ui/server/ProductPageFragment.js';

const CSS_MFE_URL =
  process.env.MFE_PRODUCT_PAGE_CSS_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/product-page-ui/style-BOVOXW2g.css';

/**
 * Transforms host ProductItem / CatalogProduct to match the remote MFE's ProductDetail interface.
 */
function toMfeProductDetail(product: any): any {
  if (!product) return null;

  return {
    id: product.id,
    name: product.name,
    brand: product.brand || 'Hiljhil Roasters',
    sku: product.sku || product.id,
    category: product.category,
    price: product.price ?? (product.priceCents ? product.priceCents / 100 : 0),
    image_url: product.image_url || product.image,
    description: product.description || '',
    slug: product.slug || product.id,
    badge: product.badge,
    rating: product.rating || 5,
    review_count: product.reviewCount || product.review_count || 0,
    taste_notes: product.tasteNotes || product.taste_notes || [],
    specs_json: product.specs_json,
    width_cm: product.width_cm || 0,
    height_cm: product.height_cm || product.heightCm || 0,
    depth_cm: product.depth_cm || 0,
    top_clearance_cm: product.top_clearance_cm || 0,
    side_clearance_cm: product.side_clearance_cm || 0,
    rear_clearance_cm: product.rear_clearance_cm || 0,
    in_stock: product.inStock !== false && product.in_stock !== false,
    ...product,
  };
}

export function FederatedServerProductPage({
  productId,
  initialProduct,
}: FederatedServerProductPageProps) {
  const mfeProduct = initialProduct ? toMfeProductDetail(initialProduct) : null;
  const localFallbackPath = path.resolve(
    process.cwd(),
    '../product-page-ui/dist/server/ProductPageFragment.js'
  );

  return (
    <FederatedServerComponent
      remoteName="productPageUi"
      moduleName="./ProductPageFragment"
      componentExportName="ProductPageFragment"
      clientRemoteUrl={CLIENT_MFE_URL}
      ssrBundleUrl={SSR_MFE_URL}
      localFallbackPath={localFallbackPath}
      cssUrl={CSS_MFE_URL}
      props={{
        productId,
        initialProduct: mfeProduct,
      }}
    />
  );
}

