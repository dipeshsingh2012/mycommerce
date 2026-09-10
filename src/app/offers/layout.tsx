import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Active Coffee Offers & Promo Codes | Hiljhil Cafe',
  description:
    'Explore active promo vouchers (COFFEE10, ROASTCLUB, GEARSHIP), bundle discounts, and free shipping codes for beans and barista equipment.',
  alternates: {
    canonical: 'https://hiljhil.com/offers',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
