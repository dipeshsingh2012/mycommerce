import { fetchProducts } from '@/lib/catalogApi';
import CoffeesClient from './CoffeesClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Specialty Single Origin & Blends | Hiljhil Roasters',
  description: 'Freshly roasted single estate coffees, micro-lots, and signature roaster blends from Hiljhil Roasters.',
};

export default async function CoffeesPage() {
  const data = await fetchProducts({ limit: 50 });
  const coffees = data.filter((p) => p.category !== 'equipment');
  return <CoffeesClient initialProducts={coffees} />;
}
