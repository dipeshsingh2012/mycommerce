import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visit Our Cafes & Flagship Roasteries | Hiljhil Cafe',
  description:
    'Explore our artisanal brew bars, single-origin espresso tasting flights, and weekend cupping sessions in Bangalore, Mumbai, and Delhi.',
  alternates: {
    canonical: 'https://hiljhil.com/cafes',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
