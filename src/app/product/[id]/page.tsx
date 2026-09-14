import React from 'react';
import type { Metadata } from 'next';
import { FederatedServerProductPage } from '@/components/FederatedServerProductPage';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Product Details | Hiljhil Cafe`,
    description: 'Specialty coffee roasts and precision barista equipment.',
  };
}

export default function ProductPage({ params }: PageProps) {
  return <FederatedServerProductPage productId={params.id} />;
}
