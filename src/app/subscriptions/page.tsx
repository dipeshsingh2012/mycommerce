'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SubscriptionsPage } from '../../views/SubscriptionsPage';

export default function Page() {
  const router = useRouter();
  return (
    <SubscriptionsPage
      onStartSubscription={() => {
        router.push('/cart');
      }}
    />
  );
}
