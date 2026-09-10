import React from 'react';
import { MapPin, Clock, Phone, Calendar } from 'lucide-react';

interface CafesPageProps {
  onOrderAhead?: (cafeId: string) => void;
}

export const CafesPage: React.FC<CafesPageProps> = ({ onOrderAhead }) => {
  const cafes = [
    {
      id: 'highland-flagship',
      name: 'Highland District Flagship & Roastery',
      address: '104 Roasters Lane, Highland District',
      city: 'Bangalore, 560038',
      hours: 'Open Daily: 7:00 AM – 9:00 PM',
      phone: '+91 (080) 4122-8901',
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&fit=crop&q=80',
      features: ['Modbar Pour-Over Bar', 'Bakery Kitchen', 'Outdoor Patio', 'Roastery Tours'],
      status: 'Open Now',
    },
    {
      id: 'indiranagar',
      name: 'Indiranagar 12th Main',
      address: '842, 12th Main Rd, HAL 2nd Stage',
      city: 'Bangalore, 560008',
      hours: 'Open Daily: 7:30 AM – 10:30 PM',
      phone: '+91 (080) 4953-2210',
      imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&fit=crop&q=80',
      features: ['Cold Brew Tap', 'Sourdough Toast Bar', 'High-Speed Wi-Fi'],
      status: 'Open Now',
    },
    {
      id: 'bandra-west',
      name: 'Bandra West • Pali Hill',
      address: 'Plot 12, Gasper Enclave, Dr Ambedkar Rd',
      city: 'Mumbai, 400050',
      hours: 'Open Daily: 7:00 AM – 11:00 PM',
      phone: '+91 (022) 6744-1189',
      imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&fit=crop&q=80',
      features: ['Espresso Tasting Flights', 'Pet-Friendly', 'Artisan Pastries'],
      status: 'Open Now',
    },
    {
      id: 'connaught-place',
      name: 'Connaught Place • Inner Circle',
      address: 'M-Block 24, Middle Circle',
      city: 'New Delhi, 110001',
      hours: 'Open Daily: 8:00 AM – 10:00 PM',
      phone: '+91 (011) 4309-8800',
      imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&fit=crop&q=80',
      features: ['Manual Brew Bar', 'Reserve Estate Coffees', 'Heritage Architecture'],
      status: 'Open Now',
    },
  ];

  return (
    <div className="space-y-12 py-4 sm:py-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-widest border border-amber-200">
          The Cafe Experience
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Visit Our Cafes & Espresso Bars
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Step into our spaces designed for the love of coffee. From precision espresso and custom pour-over flights to seasonal single-origin cold brews and freshly baked cruffins.
        </p>
      </div>

      {/* Cafe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cafes.map((cafe) => (
          <div
            key={cafe.id}
            className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="h-56 sm:h-64 relative overflow-hidden bg-stone-100">
              <img
                src={cafe.imageUrl}
                alt={cafe.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {cafe.status}
              </span>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-xl text-stone-900">{cafe.name}</h3>
                
                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <span>{cafe.address}, {cafe.city}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>{cafe.hours}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>{cafe.phone}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {cafe.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-stone-100 text-stone-700 uppercase tracking-wide"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onOrderAhead?.(cafe.id)}
                  className="flex-1 py-3 rounded-full bg-stone-900 hover:bg-amber-900 text-white font-bold text-xs tracking-wider uppercase transition-colors text-center shadow-xs"
                >
                  Order Ahead for Pickup
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sensory Cupping Events Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Weekend Cupping Sessions</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold">
            Join a Live Barista Coffee Tasting
          </h3>
          <p className="text-xs text-stone-400 max-w-xl leading-relaxed">
            Every Saturday at 11:00 AM across all flagships. Taste single-origin micro-lots, learn the SCA flavor wheel, and calibrate your palate with our head roasters.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Cupping RSVP confirmed for next Saturday 11:00 AM!')}
          className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-widest transition-colors shrink-0"
        >
          RSVP for Cupping
        </button>
      </div>
    </div>
  );
};
