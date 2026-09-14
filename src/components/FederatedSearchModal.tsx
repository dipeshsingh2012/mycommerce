'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FederatedComponent } from './FederatedComponent';

interface FederatedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLIENT_MFE_URL =
  process.env.NEXT_PUBLIC_MFE_SEARCH_URL ||
  process.env.VITE_MFE_SEARCH_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/search-ui/assets/remoteEntry.js';

export function FederatedSearchModal({ isOpen, onClose }: FederatedSearchModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <FederatedComponent
      remoteName="searchUi"
      moduleName="./SearchModal"
      componentExportName="SearchModal"
      remoteUrl={CLIENT_MFE_URL}
      props={{
        isOpen,
        onClose,
        onSelectProduct: (product: any) => {
          onClose();
          if (product?.id) {
            router.push(`/product/${product.id}`);
          }
        },
        onFullSearch: (query: string) => {
          onClose();
          if (query) {
            router.push(`/coffees?q=${encodeURIComponent(query)}`);
          }
        },
      }}
    />
  );
}
