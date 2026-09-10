import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Heritage & Direct-Trade Roasting Philosophy | Hiljhil Cafe',
  description:
    'Discover how Hiljhil Cafe champions Indian estate coffees, direct-trade farmer partnerships, and precision drum roasting craft.',
  alternates: {
    canonical: 'https://hiljhil.com/about',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
