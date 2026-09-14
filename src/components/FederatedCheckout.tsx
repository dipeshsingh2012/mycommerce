'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FederatedComponent } from './FederatedComponent';

interface FederatedCheckoutProps {
  cartId?: string;
}

const CLIENT_MFE_URL =
  process.env.NEXT_PUBLIC_MFE_CHECKOUT_URL ||
  process.env.VITE_MFE_CHECKOUT_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/checkout-ui/assets/remoteEntry.js';

export function FederatedCheckout({ cartId = 'cart_active_session' }: FederatedCheckoutProps) {
  const router = useRouter();

  return (
    <FederatedComponent
      remoteName="checkoutUi"
      moduleName="./CheckoutFragment"
      componentExportName="CheckoutFragment"
      remoteUrl={CLIENT_MFE_URL}
      props={{
        cartId,
        onOrderComplete: (receipt: any) => {
          console.log('[FederatedCheckout] Order completed:', receipt);
        },
        onReturnToShopping: () => {
          router.push('/coffees');
        },
      }}
    />
  );
}

