import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchCmsPage } from '@/lib/contentApi';
import { CmsPageRenderer } from '@/components/cms/CmsPageRenderer';

export const dynamic = 'force-dynamic';

export default async function NotFound() {
  const page = await fetchCmsPage('not-found');

  if (page) {
    return <CmsPageRenderer page={page} />;
  }

  // Fallback 404 UI if content service is offline
  return (
    <div className="py-20 text-center space-y-6 max-w-xl mx-auto px-4">
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-widest">
        404 Not Found
      </span>
      <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">
        Bean There, Lost That
      </h1>
      <p className="text-sm text-stone-600 leading-relaxed">
        We couldn't find the page or brew you were looking for. The roast might have sold out or moved to a new shelf.
      </p>
      <div className="pt-4 flex items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-stone-900 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
        >
          <span>Back to Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/coffees"
          className="px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Browse Coffees
        </Link>
      </div>
    </div>
  );
}
