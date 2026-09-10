'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { OffersPage } from '../../views/OffersPage';

export default function Page() {
  const router = useRouter();
  return (
    <OffersPage
      onApplyPromoCode={() => {
        router.push('/coffees');
      }}
    />
  );
}
