import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCmsPage } from '@/lib/contentApi';
import { CmsPageRenderer } from '@/components/cms/CmsPageRenderer';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchCmsPage('terms');
  return {
    title: page ? `${page.title} | Hiljhil Cafe` : 'Terms of Service | Hiljhil Cafe',
    description: page?.description || 'Storefront purchase agreement, warranty details, and customer policies.',
  };
}

export default async function TermsPage() {
  const page = await fetchCmsPage('terms');
  if (!page) {
    notFound();
  }
  return <CmsPageRenderer page={page} />;
}
