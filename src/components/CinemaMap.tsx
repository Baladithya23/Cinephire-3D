import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Info, CheckCircle2, AlertTriangle, Layers, Volume2, ArrowRight } from 'lucide-react';
import { Cinema } from '../types/cinema';

interface CinemaMapProps {
  cinemas: Cinema[];
  onSelectCinema: (cinema: Cinema) => void;
}

export const CinemaMap: React.FC<CinemaMapProps> = ({ cinemas, onSelectCinema }) => {
  const [selectedCinema, setSelectedCinema] = useState<Cinema>(cinemas[0]);

  // Coordinates normalized to an interactive SVG schematic canvas representing Vijayawada's geography
  // Krishna River flows to the south/west, MG Road & Bunder Road (Bandar Road) run west to east through Benz Circle
  return (
    <div className="bg-[#0C111F] border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Map Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <MapPin className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                Vijayawada Cinema Discovery Map
              </h3>
              <p className="text-xs text-slate-400">
                Interactive geographic distribution of verified local multiplexes & theatres
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
          <Info className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            Verified addresses are linked to Google Maps for exact navigation.
          </span>
        </div>
      </div>

      {/* Main Map Canvas and Side Preview Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Schematic Map Area */}
        <div className="lg:col-span-2 relative min-h-[420px] rounded-2xl bg-gradient-to-br from-[#06080F] via-[#0A0E1A] to-[#080B14] border border-slate-800 p-4 overflow-hidden flex flex-col justify-between">
          {/* Subtle Grid & Landmark Highlights */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* Krishna River schematic overlay on the south */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-cyan-950/40 via-cyan-950/20 to-transparent border-t border-cyan-500/20 flex items-center justify-center">
            <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400/60 font-display">
              〰 Krishna River Corridor (Prakasam Barrage) 〰
            </span>
          </div>

          {/* Major Road Arteries */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-amber-500/15 -translate-y-4 pointer-events-none" />
          <span className="absolute top-1/2 left-8 -translate-y-9 text-[10px] text-amber-500/40 uppercase tracking-wider font-semibold pointer-events-none">
            MG Road / Bandar Road Corridor (NH 65)
          </span>

          <div className="absolute top-4 left-1/3 bottom-14 w-0.5 bg-slate-800 pointer-events-none" />
          <span className="absolute top-6 left-1/3 ml-2 text-[10px] text-slate-600 uppercase tracking-wider font-semibold pointer-events-none">
            Eluru Road / Gandhi Nagar
          </span>

          {/* Pin Markers for the 9 Theatres */}
          <div className="relative z-10 w-full h-full min-h-[360px] grid grid-cols-3 gap-3 p-2">
            {cinemas.map(cinema => {
              const isSelected = selectedCinema.id === cinema.id;
              const isVerified = cinema.coordinates.isVerified;

              return (
                <button
                  key={cinema.id}
                  onClick={() => setSelectedCinema(cinema)}
                  className={`group relative p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 shadow-xl shadow-amber-500/20 scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        isVerified ? 'bg-slate-800 text-amber-400' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {cinema.locality}
                      </span>
                      {isVerified ? (
                        <span title="Verified Address">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        </span>
                      ) : (
                        <span title="Approximate Location">
                          <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                        </span>
                      )}
                    </div>
                    
                    <h5 className="text-xs font-bold text-white group-hover:text-amber-300 truncate">
                      {cinema.shortName}
                    </h5>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {cinema.address}
                    </p>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">
                      {cinema.screenCount ? `${cinema.screenCount} Screens` : 'N/A'}
                    </span>
                    {cinema.hasDolbyAtmos && (
                      <span className="text-emerald-400 font-bold">Dolby</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Footer Note */}
          <div className="relative z-10 pt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>● Click any theatre marker to inspect details & get external directions</span>
            <span>Vijayawada (AP) Zone</span>
          </div>
        </div>

        {/* Selected Cinema Preview Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative h-32 rounded-xl overflow-hidden">
              <img 
                src={selectedCinema.heroImage} 
                alt={selectedCinema.name}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-2.5 left-3">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                  {selectedCinema.brand}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-white font-display">
                  {selectedCinema.name}
                </h4>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {selectedCinema.address}
              </p>
            </div>

            {/* Address Verification Status Banner */}
            {selectedCinema.coordinates.isVerified ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified physical destination address.</span>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Address not verified in source:</span>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Tara Screens 2K exact street address is missing in the document. Positioned approximately at city center.
                  </p>
                </div>
              </div>
            )}

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase">Screens</span>
                <div className="font-bold text-white mt-0.5">
                  {selectedCinema.screenCount ? `${selectedCinema.screenCount} Screens` : 'Info unavailable'}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase">Sound</span>
                <div className="font-bold text-white mt-0.5 truncate">
                  {selectedCinema.hasDolbyAtmos ? 'Dolby Atmos' : 'Standard Audio'}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 space-y-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedCinema.googleMapsQuery
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition"
            >
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>Get Directions in Google Maps</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            <button
              onClick={() => onSelectCinema(selectedCinema)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-500/20"
            >
              <span>Explore Details & 3D Seats</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
