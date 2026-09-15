import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '../components/AppShell';
import { fetchGlobalShell } from '../lib/contentApi';

export async function generateMetadata(): Promise<Metadata> {
  const shell = await fetchGlobalShell();
  const brandName = shell?.header?.brand_name || 'Hiljhil Roasters';
  const tagline = shell?.header?.brand_tagline || 'Specialty Coffees & Roastery';
  const description =
    shell?.footer?.brand_description ||
    `${brandName} - Specialty coffees & precision brewing equipment.`;

  return {
    title: `${brandName} | ${tagline}`,
    description,
    openGraph: {
      title: `${brandName} | ${tagline}`,
      description,
      url: 'https://hilljhil.cafe',
      siteName: brandName,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
          width: 1200,
          height: 630,
          alt: `${brandName} Flagship Roastery`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shell = await fetchGlobalShell();

  return (
    <html lang="en">
      <body>
        <AppShell initialShell={shell}>{children}</AppShell>
      </body>
    </html>
  );
}
