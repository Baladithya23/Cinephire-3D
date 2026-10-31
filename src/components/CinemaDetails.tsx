import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Layers, 
  Users, 
  Volume2, 
  Sparkles, 
  Armchair, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Clock, 
  Info,
  Calendar,
  ShieldCheck,
  Building,
  HelpCircle
} from 'lucide-react';
import { Cinema, Movie, ShowtimeSlot } from '../types/cinema';
import { CinemaAmenities } from './CinemaAmenities';
import { ShowTimeList } from './ShowTimeList';
import { DEMO_SHOWTIMES } from '../data/cinemas';

interface CinemaDetailsProps {
  cinema: Cinema | null;
  onClose: () => void;
  onSelectSlot: (slot: ShowtimeSlot, movie: Movie) => void;
}

export const CinemaDetails: React.FC<CinemaDetailsProps> = ({
  cinema,
  onClose,
  onSelectSlot
}) => {
  const [activeTab, setActiveTab] = useState<'showtimes' | 'details' | 'audit'>('showtimes');

  if (!cinema) return null;

  const cinemaShowtimes = DEMO_SHOWTIMES.filter(s => s.cinemaId === cinema.id);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    cinema.googleMapsQuery
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl my-auto bg-[#0C111F] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10 text-white max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-white/80 hover:text-white rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-slate-700 transition"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header */}
        <div className="relative h-56 sm:h-64 w-full shrink-0">
          <img 
            src={cinema.heroImage} 
            alt={cinema.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C111F] via-[#0C111F]/60 to-black/40" />

          <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
                {cinema.brand}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-900/90 border border-slate-700 text-xs text-slate-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {cinema.locality}
              </span>
              {cinema.hasDolbyAtmos && (
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  Dolby Atmos Verified
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              {cinema.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl flex items-center gap-1.5">
              <span>{cinema.address}</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 border-b border-slate-800 bg-slate-900/50 shrink-0">
          <button
            onClick={() => setActiveTab('showtimes')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'showtimes'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Showtimes ({cinemaShowtimes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'details'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Theatre Specs & Amenities</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Data Verification Audit</span>
          </button>
        </div>

        {/* Tab Contents (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'showtimes' && (
            <div className="space-y-4">
              <ShowTimeList 
                cinema={cinema}
                showtimes={cinemaShowtimes}
                onSelectSlot={onSelectSlot}
              />
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Quick Specs Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Audited Technical Specifications
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Screens */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-amber-400" />
                      Screen Count
                    </div>
                    <div className="mt-1.5 text-sm font-bold">
                      {cinema.screenCount !== null ? (
                        <span className="text-white flex items-center gap-1.5">
                          {cinema.screenCount} Screens
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-medium">Verified</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Information unavailable</span>
                      )}
                    </div>
                    {cinema.screenCountNote && (
                      <p className="text-[11px] text-slate-400 mt-1">{cinema.screenCountNote}</p>
                    )}
                  </div>

                  {/* Seating */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-amber-400" />
                      Total Seating Capacity
                    </div>
                    <div className="mt-1.5 text-sm font-bold">
                      {cinema.seatingCapacity !== null ? (
                        <span className="text-white flex items-center gap-1.5">
                          {cinema.seatingCapacity.toLocaleString()} Seats
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-medium">Verified</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Information unavailable</span>
                      )}
                    </div>
                    {cinema.seatingCapacityNote && (
                      <p className="text-[11px] text-slate-400 mt-1">{cinema.seatingCapacityNote}</p>
                    )}
                  </div>

                  {/* Sound System */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      Sound System
                    </div>
                    <div className="mt-1.5 text-sm font-bold">
                      {cinema.soundSystem !== 'Information unavailable' ? (
                        <span className="text-emerald-400 flex items-center gap-1.5">
                          {cinema.soundSystem}
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-medium">Verified</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Information unavailable</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {cinema.hasDolbyAtmos ? 'Official Dolby Atmos certification confirmed' : 'Dolby Atmos unconfirmed in source records'}
                    </p>
                  </div>

                  {/* 2D / 3D & Projection */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Projection & 3D Formats
                    </div>
                    <div className="mt-1.5 text-sm font-bold">
                      {cinema.projectionAnd3D !== 'Information unavailable' ? (
                        <span className="text-cyan-400">{cinema.projectionAnd3D}</span>
                      ) : (
                        <span className="text-slate-500 italic">Information unavailable</span>
                      )}
                    </div>
                  </div>

                  {/* Recliners */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold flex items-center gap-1.5">
                      <Armchair className="w-4 h-4 text-amber-400" />
                      Recliner Availability
                    </div>
                    <div className="mt-1.5 text-sm font-bold">
                      {cinema.recliners.verification === 'verified' ? (
                        <span className="text-amber-400 flex items-center gap-1.5">
                          {cinema.recliners.count ? `${cinema.recliners.count} Luxury Recliners` : 'Recliners Available'}
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-medium">Verified</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Information unavailable</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{cinema.recliners.description}</p>
                  </div>

                  {/* IMAX Confirmation */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      IMAX Status
                    </div>
                    <div className="mt-1.5 text-sm font-bold text-slate-400">
                      No IMAX Screen
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      No operational IMAX screen is confirmed anywhere in Vijayawada.
                    </p>
                  </div>
                </div>
              </div>

              {/* Amenities Section */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Theatre Amenities & Facilities
                </h4>
                <CinemaAmenities amenities={cinema.amenities} />
              </div>

              {/* Background & History */}
              {cinema.backgroundInfo && (
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs leading-relaxed text-slate-300 space-y-1">
                  <div className="font-semibold text-white">About {cinema.name}:</div>
                  <p>{cinema.backgroundInfo}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Reference Document Audit Report: {cinema.name}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Source: <em>"Vijayawada Theatres & Multiplexes Website Content.docx"</em>
                </p>
                <div className="p-3 rounded-lg bg-black/40 border border-slate-700/60 text-slate-300 font-mono text-[11px]">
                  {cinema.auditNotes}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <span className="font-bold text-emerald-400 block mb-1">✓ Verified Source Data:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                      <li>Locality: {cinema.locality}</li>
                      {cinema.screenCount !== null && <li>Screen Count: {cinema.screenCount}</li>}
                      {cinema.seatingCapacity !== null && <li>Seating: {cinema.seatingCapacity} seats</li>}
                      {cinema.hasDolbyAtmos && <li>Dolby Atmos confirmed</li>}
                      {cinema.has3D && <li>3D formats supported</li>}
                      {cinema.recliners.verification === 'verified' && <li>Recliner seating verified</li>}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <span className="font-bold text-amber-400 block mb-1">⚠ Unverified / Missing in Doc:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                      {cinema.screenCount === null && <li>Screen count missing</li>}
                      {cinema.seatingCapacity === null && <li>Total seats missing</li>}
                      {!cinema.hasDolbyAtmos && <li>Dolby Atmos not confirmed</li>}
                      {cinema.recliners.verification === 'missing' && <li>Recliner data not found</li>}
                      {!cinema.coordinates.isVerified && <li>Exact street coordinates not verified</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0C111F] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span className="text-slate-300 font-medium">Demo Pricing Range: </span>
            <span className="text-amber-400 font-bold">{cinema.pricingEstimate.regularRange}</span>
            <span className="text-slate-500 text-[10px] block sm:inline sm:ml-2">
              (Final amount confirmed by active booking provider)
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            <button
              onClick={() => setActiveTab('showtimes')}
              className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-500/20"
            >
              View Showtimes & Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

