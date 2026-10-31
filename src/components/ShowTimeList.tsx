import React, { useState } from 'react';
import { Clock, Info, Sparkles, Volume2, Box, Armchair, ChevronRight, AlertCircle } from 'lucide-react';
import { ShowtimeSlot, Cinema, Movie } from '../types/cinema';
import { DEMO_MOVIES } from '../data/cinemas';

interface ShowTimeListProps {
  cinema: Cinema;
  showtimes: ShowtimeSlot[];
  onSelectSlot: (slot: ShowtimeSlot, movie: Movie) => void;
}

export const ShowTimeList: React.FC<ShowTimeListProps> = ({
  cinema,
  showtimes,
  onSelectSlot
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  // Group showtimes by movie
  const movieGroups = DEMO_MOVIES.map(movie => {
    const slots = showtimes.filter(s => s.movieId === movie.id);
    return {
      movie,
      slots
    };
  }).filter(group => group.slots.length > 0);

  const availableLanguages = Array.from(new Set(showtimes.map(s => s.language)));

  return (
    <div className="space-y-6">
      {/* Demo Showtimes Transparency Banner */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-[10px]">
              Demo Showtimes
            </span>
            <span className="font-semibold text-white">Placeholder Schedule</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            The timings and prices below are sample placeholders extracted from local listings for demonstration. 
            Official live timings and real-time seat status are dynamically fetched when connected to the active ticketing provider.
          </p>
        </div>
      </div>

      {/* Language Filter */}
      {availableLanguages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Filter Language:</span>
          <button
            onClick={() => setSelectedLanguage('All')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              selectedLanguage === 'All'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Languages
          </button>
          {availableLanguages.map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedLanguage === lang
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}

      {/* Movies & Slots List */}
      {movieGroups.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
          <AlertCircle className="w-8 h-8 mx-auto text-slate-500 mb-2" />
          <h4 className="text-base font-semibold text-slate-300">No Demo Showtimes Available</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            This cinema does not currently have sample slots in the reference document. 
            Live schedules will appear once the external booking aggregator is connected.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {movieGroups.map(({ movie, slots }) => {
            const filteredSlots = selectedLanguage === 'All'
              ? slots
              : slots.filter(s => s.language === selectedLanguage);

            if (filteredSlots.length === 0) return null;

            return (
              <div 
                key={movie.id} 
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      className="w-12 h-16 object-cover rounded-lg shadow-md border border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-bold text-white font-display">
                          {movie.title}
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded border border-slate-700 text-slate-400 font-bold">
                          {movie.certification}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                        <span>{movie.duration}</span>
                        <span>•</span>
                        <span>{movie.genre.join(', ')}</span>
                        <span>•</span>
                        <span className="text-amber-400 font-semibold">★ {movie.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] text-slate-400 block">Sample Demo Price:</span>
                    <span className="text-sm font-bold text-amber-400">
                      ₹{filteredSlots[0]?.basePrice} – ₹{filteredSlots[0]?.reclinerPrice || Math.round(filteredSlots[0]?.basePrice * 1.9)}
                    </span>
                  </div>
                </div>

                {/* Showtimes Grid */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {filteredSlots.map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => onSelectSlot(slot, movie)}
                      className="group relative flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/60 hover:bg-amber-500/10 border border-slate-700 hover:border-amber-500/60 transition-all text-center"
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold text-white group-hover:text-amber-300">
                          {slot.time}
                        </span>
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-[11px]">
                        <span className="text-slate-400 font-medium">{slot.language}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-cyan-400 font-semibold">{slot.format}</span>
                      </div>

                      <div className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-amber-400 font-bold group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        Book 3D Seat ₹{slot.basePrice}
                      </div>

                      <span className="mt-1 text-[9px] text-slate-500">
                        {slot.screenName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

