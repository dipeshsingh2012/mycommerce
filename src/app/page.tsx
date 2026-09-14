import React from 'react';
import type { Metadata } from 'next';
import { FederatedServerHomepage } from '@/components/FederatedServerHomepage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hiljhil Cafe | Specialty Coffees & Roastery',
  description:
    'Artisanal batch-roasted single-origin coffees, handcrafted pastries, and space-verified home espresso bars. Visit our cafe bar or shop whole beans & gear online.',
};

export default function HomePage() {
  return <FederatedServerHomepage />;
}
