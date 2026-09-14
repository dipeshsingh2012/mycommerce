'use client';

import React from 'react';
import { FederatedComponent } from './FederatedComponent';

interface FederatedProductPageProps {
  productId: string;
  initialProduct?: any;
}

const PRODUCT_PAGE_MFE_URL =
  process.env.NEXT_PUBLIC_MFE_PRODUCT_PAGE_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/product-page-ui/assets/remoteEntry.js';

export function FederatedProductPage({ productId, initialProduct }: FederatedProductPageProps) {
  const handleAddToCart = (product: any) => {
    console.log('[FederatedProductPage] Product added to cart:', product);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('commerce:cart:add', {
          detail: { product },
        })
      );
    }
  };

  return (
    <FederatedComponent
      remoteName="productPageUi"
      moduleName="./ProductPageFragment"
      componentExportName="ProductPageFragment"
      remoteUrl={PRODUCT_PAGE_MFE_URL}
      props={{
        productId,
        initialProduct,
        onAddToCart: handleAddToCart,
      }}
    />
  );
}
