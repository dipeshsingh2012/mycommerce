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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Hiljhil Roasters & Cafe',
            url: 'https://hiljhil.com',
            logo: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300',
            description:
              'Artisanal batch-roasted specialty coffees, single-estate roasts, and precision barista equipment.',
          }),
        }}
      />
      <FederatedServerHomepage />
    </>
  );
}

