import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCmsPage } from '@/lib/contentApi';
import { CmsPageRenderer } from '@/components/cms/CmsPageRenderer';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchCmsPage('about');
  return {
    title: page ? `${page.title} | Hiljhil Cafe` : 'About Us | Hiljhil Cafe',
    description: page?.description || 'Our sourcing transparency, roasting manifesto, and engineering standards.',
  };
}

export default async function AboutPage() {
  const page = await fetchCmsPage('about');
  if (!page) {
    notFound();
  }
  return <CmsPageRenderer page={page} />;
}
