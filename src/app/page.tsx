import React from 'react';
import type { Metadata } from 'next';
import { FederatedServerHomepage } from '@/components/FederatedServerHomepage';
import { fetchCmsPage, fetchGlobalShell } from '@/lib/contentApi';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const page = (await fetchCmsPage('home')) || (await fetchCmsPage(''));
  if (page) {
    return {
      title: page.title ? `${page.title} | Hiljhil Roasters` : undefined,
      description: page.description || undefined,
    };
  }

  const shell = await fetchGlobalShell();
  const brandName = shell?.header?.brand_name || 'Hiljhil Roasters';
  const tagline = shell?.header?.brand_tagline || 'Specialty Coffees & Roastery';
  return {
    title: `${brandName} | ${tagline}`,
    description:
      shell?.footer?.brand_description ||
      'Artisanal batch-roasted single-origin coffees, handcrafted pastries, and space-verified home espresso bars.',
  };
}

export default function HomePage() {
  return <FederatedServerHomepage />;
}
