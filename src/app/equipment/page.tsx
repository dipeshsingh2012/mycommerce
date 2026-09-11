import { fetchEquipment } from '@/lib/catalogApi';
import EquipmentClient from './EquipmentClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Espresso Machines & Barista Brewing Equipment | Hiljhil Roasters',
  description: 'Commercial and home espresso machines, flat burr grinders, and pour-over gear space-verified with CounterCheck™ cabinet height clearance.',
};

export default async function EquipmentPage() {
  const equipment = await fetchEquipment();
  return <EquipmentClient initialEquipment={equipment} />;
}
