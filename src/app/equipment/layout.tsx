import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Espresso Machines & Barista Brewing Equipment | Hiljhil Cafe',
  description:
    'Commercial and home espresso machines, flat burr grinders, and pour-over gear space-verified with CounterCheck™ cabinet height clearance.',
  alternates: {
    canonical: 'https://hiljhil.com/equipment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
