import React from 'react';
import type { Metadata } from 'next';
import { FederatedServerDiscovery } from '@/components/FederatedServerDiscovery';
import { fetchCmsPage } from '@/lib/contentApi';

export async function generateMetadata(): Promise<Metadata> {
  const page = (await fetchCmsPage('equipment')) || (await fetchCmsPage('discovery'));
  return {
    title: page?.title
      ? `${page.title} | Hiljhil Roasters`
      : 'Espresso Machines & Barista Brewing Equipment | Hiljhil Roasters',
    description:
      page?.description ||
      'Commercial and home espresso machines, flat burr grinders, and pour-over gear space-verified with CounterCheck™ cabinet height clearance.',
  };
}

export default async function EquipmentPage() {
  const page = (await fetchCmsPage('equipment')) || (await fetchCmsPage('discovery'));

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
