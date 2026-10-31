import React from 'react';
import { 
  Car, 
  UtensilsCrossed, 
  CreditCard, 
  Smartphone, 
  RotateCcw, 
  AirVent, 
  Wifi, 
  Accessibility, 
  Baby, 
  Armchair, 
  Sparkles, 
  Tv 
} from 'lucide-react';
import { CinemaAmenity } from '../types/cinema';

interface CinemaAmenitiesProps {
  amenities: CinemaAmenity[];
  compact?: boolean;
}

export const AMENITY_ICONS: Record<CinemaAmenity, { icon: React.ElementType; label: string }> = {
  'Parking': { icon: Car, label: 'Car & Bike Parking' },
  'Food & Beverages': { icon: UtensilsCrossed, label: 'Food & Beverages' },
  'Digital Payments': { icon: CreditCard, label: 'Digital Payments' },
  'Mobile Tickets': { icon: Smartphone, label: 'Mobile M-Ticket' },
  'Ticket Cancellation': { icon: RotateCcw, label: 'Cancellation Available' },
  'Full AC': { icon: AirVent, label: 'Air Conditioned' },
  'Free Wi-Fi': { icon: Wifi, label: 'High-speed Wi-Fi' },
  'Wheelchair Friendly': { icon: Accessibility, label: 'Wheelchair Friendly' },
  'Kids Playhouse': { icon: Baby, label: 'Kids Playhouse' },
  'Push-back Seats': { icon: Armchair, label: 'Push-back Seating' },
  'Luxury Recliners': { icon: Armchair, label: 'Luxury Recliners' },
  'Laser Projection': { icon: Tv, label: 'Laser Projection' },
};

export const CinemaAmenities: React.FC<CinemaAmenitiesProps> = ({ amenities, compact = false }) => {
  if (!amenities || amenities.length === 0) {
    return <span className="text-xs text-slate-500 italic">Information unavailable</span>;
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {amenities.map(amenity => {
          const config = AMENITY_ICONS[amenity] || { icon: Sparkles, label: amenity };
          const Icon = config.icon;
          return (
            <span
              key={amenity}
              title={config.label}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 font-medium"
            >
              <Icon className="w-3 h-3 text-amber-400" />
              <span>{amenity}</span>
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {amenities.map(amenity => {
        const config = AMENITY_ICONS[amenity] || { icon: Sparkles, label: amenity };
        const Icon = config.icon;
        return (
          <div
            key={amenity}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 hover:border-amber-500/30 transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium">{config.label}</span>
          </div>
        );
      })}
    </div>
  );
};
