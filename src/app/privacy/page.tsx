import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCmsPage } from '@/lib/contentApi';
import { CmsPageRenderer } from '@/components/cms/CmsPageRenderer';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchCmsPage('privacy');
  return {
    title: page ? `${page.title} | Hiljhil Cafe` : 'Privacy Policy | Hiljhil Cafe',
    description: page?.description || 'Customer privacy policy and data governance practices.',
  };
}

export default async function PrivacyPage() {
  const page = await fetchCmsPage('privacy');
  if (!page) {
    notFound();
  }
  return <CmsPageRenderer page={page} />;
}
