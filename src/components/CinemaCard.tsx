import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Volume2, 
  Layers, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Armchair, 
  Eye, 
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Cinema } from '../types/cinema';
import { CinemaAmenities } from './CinemaAmenities';

interface CinemaCardProps {
  cinema: Cinema;
  onViewDetails: (cinema: Cinema) => void;
  onViewShowtimes: (cinema: Cinema) => void;
}

export const CinemaCard: React.FC<CinemaCardProps> = ({
  cinema,
  onViewDetails,
  onViewShowtimes
}) => {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    cinema.googleMapsQuery
  )}`;

  return (
    <div className="group relative bg-[#0C111F] border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between">
      {/* Top Banner & Badges */}
      <div>
        <div className="relative h-44 w-full overflow-hidden">
          <img 
            src={cinema.heroImage} 
            alt={cinema.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C111F] via-[#0C111F]/50 to-transparent" />
          
          {/* Brand Tag & Locality Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-400 tracking-wide uppercase">
              {cinema.brand}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-slate-700 text-[11px] font-medium text-slate-200 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              {cinema.locality}
            </span>
          </div>

          {/* Premium Formats Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
            {cinema.hasDolbyAtmos && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-slate-950 text-[10px] font-extrabold flex items-center gap-1 shadow-lg shadow-emerald-500/20">
                <Volume2 className="w-3 h-3" />
                DOLBY ATMOS
              </span>
            )}
            {cinema.has3D && (
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/90 text-slate-950 text-[10px] font-extrabold shadow-lg shadow-cyan-500/20">
                3D READY
              </span>
            )}
          </div>

          {/* Verification Pill on Card */}
          <div className="absolute bottom-2.5 left-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Vijayawada Verified Theatre
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-amber-400 transition-colors">
              {cinema.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {cinema.address}
            </p>
          </div>

          {/* Verified Technical Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Screen Count */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                <Layers className="w-3 h-3 text-amber-400" />
                Screens
              </div>
              <div className="mt-1 font-semibold text-slate-200">
                {cinema.screenCount !== null ? (
                  <span className="text-white font-bold">{cinema.screenCount} Screens</span>
                ) : (
                  <span className="text-slate-500 italic">Information unavailable</span>
                )}
              </div>
            </div>

            {/* Seating Capacity */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                <Users className="w-3 h-3 text-amber-400" />
                Total Seats
              </div>
              <div className="mt-1 font-semibold text-slate-200">
                {cinema.seatingCapacity !== null ? (
                  <span className="text-white font-bold">{cinema.seatingCapacity.toLocaleString()} Seats</span>
                ) : (
                  <span className="text-slate-500 italic">Information unavailable</span>
                )}
              </div>
            </div>

            {/* Sound Configuration */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-amber-400" />
                Sound System
              </div>
              <div className="mt-1 font-semibold truncate" title={cinema.soundSystem}>
                {cinema.soundSystem !== 'Information unavailable' ? (
                  <span className="text-emerald-400">{cinema.soundSystem}</span>
                ) : (
                  <span className="text-slate-500 italic">Information unavailable</span>
                )}
              </div>
            </div>

            {/* Recliners */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1">
                <Armchair className="w-3 h-3 text-amber-400" />
                Recliners
              </div>
              <div className="mt-1 font-semibold truncate">
                {cinema.recliners.verification === 'verified' ? (
                  <span className="text-amber-400 font-semibold">
                    {cinema.recliners.count ? `${cinema.recliners.count} Recliners` : 'Available'}
                  </span>
                ) : (
                  <span className="text-slate-500 italic">Information unavailable</span>
                )}
              </div>
            </div>
          </div>

          {/* Languages Supported */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Languages:</span>
            <div className="flex flex-wrap gap-1.5">
              {cinema.languages.map(lang => (
                <span 
                  key={lang}
                  className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Sample Pricing Disclaimer Box */}
          <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px]">
            <div className="flex justify-between items-center text-amber-300 font-semibold">
              <span>Demo Sample Pricing:</span>
              <span className="font-bold text-white">{cinema.pricingEstimate.regularRange}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              *Sample estimate for demo; final booking price is confirmed at checkout.
            </p>
          </div>

          {/* Amenities Mini-Row */}
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1.5">
              Key Amenities
            </div>
            <CinemaAmenities amenities={cinema.amenities.slice(0, 4)} compact />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2 mt-4">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition"
          title="Get verified directions on Google Maps"
        >
          <Navigation className="w-3.5 h-3.5 text-amber-400" />
          <span>Directions</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </a>

        <button
          onClick={() => onViewDetails(cinema)}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-500/20"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

