import React from 'react';
import type { Metadata } from 'next';
import { FederatedServerDiscovery } from '@/components/FederatedServerDiscovery';

export const metadata: Metadata = {
  title: 'Specialty Single Origin & Blends | Hiljhil Roasters',
  description:
    'Freshly roasted single estate coffees, micro-lots, and signature roaster blends from Hiljhil Roasters.',
};

export default function CoffeesPage() {
  return (
    <div className="py-6 max-w-6xl mx-auto space-y-6">
      <div className="space-y-2 border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
          Specialty Coffee Collection
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
          Single origin estate harvests, producer nano-lots, and signature roaster blends freshly roasted weekly at Hiljhil Roasters.
        </p>
      </div>
      <FederatedServerDiscovery initialCategory="coffee_beans" />
    </div>
  );
}
