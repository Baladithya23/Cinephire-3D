import React from 'react';
import { MapPin, Check, ChevronDown, Sparkles, X } from 'lucide-react';
import { CityOption } from '../types/cinema';
import { SUPPORTED_CITIES } from '../data/cinemas';

interface LocationSelectorProps {
  currentCity: CityOption;
  onSelectCity: (city: CityOption) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  currentCity,
  onSelectCity,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#0C111F] border border-amber-500/30 rounded-2xl p-6 shadow-2xl shadow-amber-500/10 text-white"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-white">Select Location</h3>
            <p className="text-xs text-slate-400">Choose your city to browse theatres & showtimes</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2.5 text-xs text-amber-300">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>
            <strong>Vijayawada, Andhra Pradesh</strong> is the primary launch city with verified local theatres.
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {SUPPORTED_CITIES.map(city => {
            const isSelected = city.id === currentCity.id;
            const isActive = city.status === 'active';

            return (
              <button
                key={city.id}
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className={`flex items-start justify-between p-3.5 rounded-xl border transition-all text-left group ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{city.name}</span>
                    {city.isDefault && (
                      <span className="text-[10px] uppercase font-bold bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded">
                        Launch
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{city.state}</div>
                  <div className="text-[11px] mt-1.5 flex items-center gap-1.5">
                    {isActive ? (
                      <span className="text-emerald-400 font-medium">
                        ● {city.theatresCount} Theatres Live
                      </span>
                    ) : (
                      <span className="text-slate-500">
                        ○ {city.theatresCount} Theatres (Coming Soon)
                      </span>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <div className="p-1 rounded-full bg-amber-500 text-slate-950 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Current: <strong className="text-white">{currentCity.name}, {currentCity.state}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

