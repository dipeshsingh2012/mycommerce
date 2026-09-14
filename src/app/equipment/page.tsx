import React from 'react';
import type { Metadata } from 'next';
import { FederatedServerDiscovery } from '@/components/FederatedServerDiscovery';

export const metadata: Metadata = {
  title: 'Espresso Machines & Barista Brewing Equipment | Hiljhil Roasters',
  description:
    'Commercial and home espresso machines, flat burr grinders, and pour-over gear space-verified with CounterCheck™ cabinet height clearance.',
};

export default function EquipmentPage() {
  return (
    <div className="py-6 max-w-6xl mx-auto space-y-6">
      <div className="space-y-2 border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
          Barista Machines & Brewing Equipment
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
          Space-verified espresso machines, precision flat burr grinders, and barista tools engineered for countertop clearance.
        </p>
      </div>
      <FederatedServerDiscovery initialCategory="espresso_machine" />
    </div>
  );
}
