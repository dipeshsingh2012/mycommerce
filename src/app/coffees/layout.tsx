import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Specialty Coffee Roasts & Single-Origin Beans | Hiljhil Cafe',
  description:
    'Shop fresh batch-roasted Indian specialty coffees: single-estate arabicas, whiskey barrel-aged harvests, dark espresso roasts, and easy-pour filter bags.',
  alternates: {
    canonical: 'https://hiljhil.com/coffees',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
