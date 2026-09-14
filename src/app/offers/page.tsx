import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCmsPage } from '@/lib/contentApi';
import { CmsPageRenderer } from '@/components/cms/CmsPageRenderer';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchCmsPage('offers');
  return {
    title: page ? `${page.title} | Hiljhil Cafe` : 'Offers & Bundles | Hiljhil Cafe',
    description: page?.description || 'Exclusive roastery discounts and tasting explorer bundles.',
  };
}

export default async function OffersPage() {
  const page = await fetchCmsPage('offers');
  if (!page) {
    notFound();
  }
  return <CmsPageRenderer page={page} />;
}
