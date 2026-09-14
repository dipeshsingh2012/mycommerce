import React from 'react';
import path from 'path';
import { FederatedServerComponent } from './FederatedServerComponent';
import { FederatedCheckout } from './FederatedCheckout';

interface FederatedServerCheckoutProps {
  cartId?: string;
}

const CLIENT_MFE_URL =
  process.env.NEXT_PUBLIC_MFE_CHECKOUT_URL ||
  process.env.VITE_MFE_CHECKOUT_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/checkout-ui/assets/remoteEntry.js';

const SSR_MFE_URL =
  process.env.MFE_CHECKOUT_SSR_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/checkout-ui/server/CheckoutFragment.js';

const CSS_MFE_URL =
  process.env.MFE_CHECKOUT_CSS_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/checkout-ui/style-BlJ0dWaw.css';

export function FederatedServerCheckout({
  cartId = 'cart_active_session',
}: FederatedServerCheckoutProps = {}) {
  const localFallbackPath = path.resolve(
    process.cwd(),
    '../checkout-ui/dist/server/CheckoutFragment.js'
  );

  return (
    <FederatedServerComponent
      remoteName="checkoutUi"
      moduleName="./CheckoutFragment"
      componentExportName="CheckoutFragment"
      clientRemoteUrl={CLIENT_MFE_URL}
      ssrBundleUrl={SSR_MFE_URL}
      localFallbackPath={localFallbackPath}
      cssUrl={CSS_MFE_URL}
      props={{
        cartId,
      }}
      fallback={<FederatedCheckout cartId={cartId} />}
    />
  );
}
