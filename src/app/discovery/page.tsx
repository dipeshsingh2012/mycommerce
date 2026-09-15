import React from 'react';
import type { Metadata } from 'next';
import { FederatedServerDiscovery } from '@/components/FederatedServerDiscovery';
import { fetchCmsPage } from '@/lib/contentApi';

export async function generateMetadata(): Promise<Metadata> {
  const page = (await fetchCmsPage('discovery')) || (await fetchCmsPage('equipment'));
  return {
    title: page?.title
      ? `${page.title} | Hiljhil Roasters`
      : 'CounterCheck™ Spatial Discovery | Hiljhil Roasters',
    description:
      page?.description ||
      'Verify 3D equipment height, overhead clearance, and countertop fitment with CounterCheck™ clearance guarantee.',
  };
}

export default async function DiscoveryPage() {
  const page = (await fetchCmsPage('discovery')) || (await fetchCmsPage('equipment'));

  return (
    <div className="py-6 max-w-6xl mx-auto space-y-6">
      {page && (
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            {page.title}
          </h1>
          {page.description && (
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
              {page.description}
            </p>
          )}
        </div>
      )}
      <FederatedServerDiscovery initialCategory="espresso_machine" />
    </div>
  );
}

