import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCmsPage } from '@/lib/contentApi';
import { CmsPageRenderer } from '@/components/cms/CmsPageRenderer';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchCmsPage('cafes');
  return {
    title: page ? `${page.title} | Hiljhil Cafe` : 'Our Cafes | Hiljhil Cafe',
    description: page?.description || 'Visit our flagships and espresso bars across India.',
  };
}

export default async function CafesPage() {
  const page = await fetchCmsPage('cafes');
  if (!page) {
    notFound();
  }
  return <CmsPageRenderer page={page} />;
}
