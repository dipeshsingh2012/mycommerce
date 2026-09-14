import React from 'react';
import type { Metadata } from 'next';
import { FederatedServerCart } from '@/components/FederatedServerCart';

export const metadata: Metadata = {
  title: 'Shopping Bag | Hiljhil Roasters',
  description: 'Review your selected artisanal coffees, brewing equipment, and checkout.',
};

export default function CartPage() {
  return (
    <div className="py-6 max-w-5xl mx-auto">
      <FederatedServerCart />
    </div>
  );
}
