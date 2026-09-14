import React from 'react';
import path from 'path';
import { FederatedServerComponent } from './FederatedServerComponent';
import { FederatedCart } from './FederatedCart';

interface FederatedServerCartProps {
  cartId?: string;
}

const CLIENT_MFE_URL =
  process.env.NEXT_PUBLIC_MFE_CART_URL ||
  process.env.VITE_MFE_CART_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/cart-ui/assets/remoteEntry.js';

const SSR_MFE_URL =
  process.env.MFE_CART_SSR_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/cart-ui/server/CartFragment.js';

const CSS_MFE_URL =
  process.env.MFE_CART_CSS_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/cart-ui/style-Cw94VWu7.css';

export function FederatedServerCart({
  cartId = 'cart_active_session',
}: FederatedServerCartProps = {}) {
  const localFallbackPath = path.resolve(
    process.cwd(),
    '../cart-ui/dist/server/CartFragment.js'
  );

  return (
    <FederatedServerComponent
      remoteName="cartUi"
      moduleName="./CartFragment"
      componentExportName="CartFragment"
      clientRemoteUrl={CLIENT_MFE_URL}
      ssrBundleUrl={SSR_MFE_URL}
      localFallbackPath={localFallbackPath}
      cssUrl={CSS_MFE_URL}
      props={{
        cartId,
      }}
      fallback={<FederatedCart cartId={cartId} />}
    />
  );
}
