import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCmsPage } from '@/lib/contentApi';
import { CmsPageRenderer } from '@/components/cms/CmsPageRenderer';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchCmsPage('subscriptions');
  return {
    title: page ? `${page.title} | Hiljhil Cafe` : 'Coffee Subscriptions | Hiljhil Cafe',
    description: page?.description || 'Never run out of freshly roasted estate coffee.',
  };
}

export default async function SubscriptionsPage() {
  const page = await fetchCmsPage('subscriptions');
  if (!page) {
    notFound();
  }
  return <CmsPageRenderer page={page} />;
}
