import React from 'react';
import type { Metadata } from 'next';
import { FederatedServerDiscovery } from '@/components/FederatedServerDiscovery';
import { fetchCmsPage } from '@/lib/contentApi';

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchCmsPage('coffees');
  return {
    title: page?.title ? `${page.title} | Hiljhil Roasters` : 'Specialty Single Origin & Blends | Hiljhil Roasters',
    description:
      page?.description ||
      'Freshly roasted single estate coffees, micro-lots, and signature roaster blends from Hiljhil Roasters.',
  };
}

export default async function CoffeesPage() {
  const page = await fetchCmsPage('coffees');

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
      <FederatedServerDiscovery initialCategory="coffee_beans" />
    </div>
  );
}
