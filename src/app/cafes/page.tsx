'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CafesPage } from '../../views/CafesPage';

export default function Page() {
  const router = useRouter();
  return (
    <CafesPage
      onOrderAhead={() => {
        router.push('/coffees');
      }}
    />
  );
}
