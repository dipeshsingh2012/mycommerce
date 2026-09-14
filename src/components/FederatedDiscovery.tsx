'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FederatedComponent } from './FederatedComponent';

interface FederatedDiscoveryProps {
  initialCategory?: string;
  initialMaxHeight?: number | null;
}

const CLIENT_MFE_URL =
  process.env.NEXT_PUBLIC_MFE_DISCOVERY_URL ||
  process.env.VITE_MFE_DISCOVERY_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/discovery-ui/assets/remoteEntry.js';

export function FederatedDiscovery({
  initialCategory = 'all',
  initialMaxHeight = null,
}: FederatedDiscoveryProps) {
  const router = useRouter();

  return (
    <FederatedComponent
      remoteName="discoveryUi"
      moduleName="./DiscoveryFragment"
      componentExportName="DiscoveryFragment"
      remoteUrl={CLIENT_MFE_URL}
      props={{
        initialCategory,
        initialMaxHeight,
        onProductSelect: (product: any) => {
          if (product?.id) {
            router.push(`/product/${product.id}`);
          }
        },
      }}
    />
  );
}
