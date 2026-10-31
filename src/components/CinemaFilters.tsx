import React from 'react';
import { Search, Filter, RotateCcw, Volume2, Sparkles, Armchair, Clock, Globe } from 'lucide-react';
import { CinemaLocality } from '../types/cinema';

export const VIJAYAWADA_LOCALITIES: CinemaLocality[] = [
  'MG Road',
  'Labbipet',
  'Kala Nagar',
  'Benz Circle',
  'Punnammathota',
  'Patamata',
  'Gandhi Nagar',
  'Mogalrajapuram',
  'Bunder Road',
];

interface CinemaFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedLocality: string;
  onSelectLocality: (loc: string) => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  selectedShowtimePeriod: string;
  onSelectShowtimePeriod: (period: string) => void;
  onlyDolbyAtmos: boolean;
  onToggleDolbyAtmos: (val: boolean) => void;
  only3D: boolean;
  onToggle3D: (val: boolean) => void;
  onlyRecliners: boolean;
  onToggleRecliners: (val: boolean) => void;
  onResetFilters: () => void;
  activeCount: number;
}

export const CinemaFilters: React.FC<CinemaFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedLocality,
  onSelectLocality,
  selectedLanguage,
  onSelectLanguage,
  selectedShowtimePeriod,
  onSelectShowtimePeriod,
  onlyDolbyAtmos,
  onToggleDolbyAtmos,
  only3D,
  onToggle3D,
  onlyRecliners,
  onToggleRecliners,
  onResetFilters,
  activeCount
}) => {
  return (
    <div className="bg-[#0C111F]/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md space-y-4">
      {/* Top Search & Reset Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search Vijayawada cinemas by name, mall, or landmark..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Reset Filter Button */}
        {activeCount > 0 && (
          <button
            onClick={onResetFilters}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-400 border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters ({activeCount})</span>
          </button>
        )}
      </div>

      {/* Locality Pills Filtering */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            Locality in Vijayawada:
          </span>
          {selectedLocality !== 'All' && (
            <span className="text-xs text-amber-400 font-medium">
              Filtering: {selectedLocality}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => onSelectLocality('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedLocality === 'All'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            All Localities (9)
          </button>
          {VIJAYAWADA_LOCALITIES.map(loc => {
            const isSelected = selectedLocality === loc;
            return (
              <button
                key={loc}
                onClick={() => onSelectLocality(loc)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {loc}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Filters: Language, Showtime Period, and Feature Toggles */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        {/* Language Filter */}
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-xs text-slate-400 font-medium">Language:</span>
          <select
            value={selectedLanguage}
            onChange={e => onSelectLanguage(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Languages</option>
            <option value="Telugu">Telugu</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
          </select>
        </div>

        {/* Available Showtime Period */}
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-xs text-slate-400 font-medium">Showtime:</span>
          <select
            value={selectedShowtimePeriod}
            onChange={e => onSelectShowtimePeriod(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Any Time</option>
            <option value="Morning">Morning (Before 12 PM)</option>
            <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
            <option value="Evening">Evening (5 PM - 9 PM)</option>
            <option value="Night">Night (After 9 PM)</option>
          </select>
        </div>

        {/* Feature Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Dolby Atmos Toggle */}
          <button
            onClick={() => onToggleDolbyAtmos(!onlyDolbyAtmos)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition border ${
              onlyDolbyAtmos
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Volume2 className="w-3 h-3 text-emerald-400" />
            <span>Dolby Atmos Verified</span>
          </button>

          {/* 3D Ready Toggle */}
          <button
            onClick={() => onToggle3D(!only3D)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition border ${
              only3D
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>3D Ready</span>
          </button>

          {/* Recliner Toggle */}
          <button
            onClick={() => onToggleRecliners(!onlyRecliners)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition border ${
              onlyRecliners
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <Armchair className="w-3 h-3 text-amber-400" />
            <span>Luxury Recliners</span>
          </button>
        </div>
      </div>
    </div>
  );
};
