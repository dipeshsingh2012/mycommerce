import { fetchProducts } from '@/lib/catalogApi';
import { SliderProduct } from '@dipesh.singh/commerce-ui';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const allProducts = await fetchProducts({ limit: 50 });
  const coffees = allProducts.filter((p) => p.category !== 'equipment');
  const sliderItems: SliderProduct[] = coffees.map((p) => ({
    id: p.id,
    title: p.name.toUpperCase(),
    subtitle: p.tasteNotes && p.tasteNotes.length > 0 ? p.tasteNotes.join(', ') : p.description,
    price: `₹ ${(p.priceCents / 100).toLocaleString('en-IN')}`,
    imageUrl: p.image,
    badge: p.badge,
    productUrl: `/product/${p.id}`,
  }));

  return <HomeClient initialBestsellers={sliderItems} />;
}
