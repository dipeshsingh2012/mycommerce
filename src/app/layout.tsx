import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { StoreNavigation } from '../components/StoreNavigation';

export const metadata: Metadata = {
  title: 'Hiljhil Cafe | Specialty Coffees & Roastery',
  description:
    'Artisanal batch-roasted single-origin coffees, handcrafted pastries, and space-verified home espresso bars. Visit our cafe bar or shop whole beans & gear online.',
  openGraph: {
    title: 'Hiljhil Cafe | Specialty Coffees & Roastery',
    description: 'Artisanal batch-roasted single-origin coffees and barista equipment.',
    url: 'https://hiljhil.com',
    siteName: 'Hiljhil Cafe',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'Hiljhil Cafe Flagship Roastery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreNavigation>{children}</StoreNavigation>
      </body>
    </html>
  );
}
