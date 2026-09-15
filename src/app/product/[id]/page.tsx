import React from 'react';
import type { Metadata } from 'next';
import { FederatedServerProductPage } from '@/components/FederatedServerProductPage';
import { fetchProductByIdOrSlug } from '@/lib/catalogApi';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await fetchProductByIdOrSlug(params.id);
  return {
    title: product ? `${product.name} | Hiljhil Cafe` : 'Product Details | Hiljhil Cafe',
    description: product?.description || 'Specialty coffee roasts and precision barista equipment.',
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await fetchProductByIdOrSlug(params.id);

  return (
    <div className="pb-16">
      <FederatedServerProductPage productId={params.id} initialProduct={product} />
    </div>
  );
}

