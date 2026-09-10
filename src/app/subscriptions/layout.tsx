import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Specialty Coffee Subscription | Save 15% Forever | Hiljhil Cafe',
  description:
    'Customize your roast profile, grind size, and delivery schedule. Freshly roasted single-estate beans delivered to your door with 15% savings.',
  alternates: {
    canonical: 'https://hiljhil.com/subscriptions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
