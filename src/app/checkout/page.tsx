import React from 'react';
import type { Metadata } from 'next';
import { FederatedServerCheckout } from '@/components/FederatedServerCheckout';

export const metadata: Metadata = {
  title: 'Secure Checkout | Hiljhil Roasters',
  description: 'Complete your order with white-glove delivery and secure payment.',
};

export default function CheckoutPage() {
  return (
    <div className="py-6 max-w-5xl mx-auto">
      <FederatedServerCheckout />
    </div>
  );
}
