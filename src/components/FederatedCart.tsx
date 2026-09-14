'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FederatedComponent } from './FederatedComponent';

interface FederatedCartProps {
  cartId?: string;
}

const CLIENT_MFE_URL =
  process.env.NEXT_PUBLIC_MFE_CART_URL ||
  process.env.VITE_MFE_CART_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/cart-ui/assets/remoteEntry.js';

export function FederatedCart({ cartId = 'cart_active_session' }: FederatedCartProps) {
  const router = useRouter();

  return (
    <FederatedComponent
      remoteName="cartUi"
      moduleName="./CartFragment"
      componentExportName="CartFragment"
      remoteUrl={CLIENT_MFE_URL}
      props={{
        cartId,
        onVerifyFitmentClick: (productId: string) => {
          router.push(`/product/${productId}`);
        },
        onProceedToCheckout: () => {
          router.push('/checkout');
        },
      }}
    />
  );
}
