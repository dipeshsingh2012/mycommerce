import React from 'react';
import type { Metadata } from 'next';
import { FederatedServerProductPage } from '@/components/FederatedServerProductPage';
import { CompatibleAccessoriesSection } from '@/components/CompatibleAccessoriesSection';
import { fetchProductByIdOrSlug, fetchCompatibleAccessories } from '@/lib/catalogApi';

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
  const accessories = product ? await fetchCompatibleAccessories(product) : [];

  let collarDiameter = '54mm';
  if (product?.specs_json) {
    try {
      const sp = JSON.parse(product.specs_json);
      if (sp.collar_diameter) collarDiameter = sp.collar_diameter;
    } catch {}
  }

  return (
    <div className="pb-16">
      <FederatedServerProductPage productId={params.id} initialProduct={product} />
      {product && accessories.length > 0 && (
        <CompatibleAccessoriesSection
          machineName={product.name}
          collarDiameter={collarDiameter}
          accessories={accessories}
        />
      )}
    </div>
  );
}

