import React from 'react';
import { Sparkles, Clock, Globe, Film, Ticket, ChevronRight } from 'lucide-react';
import { DEMO_MOVIES, VIJAYAWADA_CINEMAS, DEMO_SHOWTIMES } from '../data/cinemas';
import { Movie, Cinema } from '../types/cinema';

interface MoviesViewProps {
  onSelectMovieForBooking: (movie: Movie) => void;
  onExploreCinema: (cinema: Cinema) => void;
}

export const MoviesView: React.FC<MoviesViewProps> = ({
  onSelectMovieForBooking,
  onExploreCinema
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Movies Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0C111F] to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-wider">
            Now Showing in Vijayawada
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-2">
            Trending Blockbusters & 3D Premieres
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Browse movies playing across MG Road, Benz Circle, Patamata, Gandhi Nagar and Bunder Road multiplexes.
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
          <Ticket className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Select any movie to explore showing theatres & 3D seats</span>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEMO_MOVIES.map(movie => {
          // Find cinemas showing this movie
          const showingCinemaIds = Array.from(
            new Set(DEMO_SHOWTIMES.filter(s => s.movieId === movie.id).map(s => s.cinemaId))
          );
          const cinemasShowing = VIJAYAWADA_CINEMAS.filter(c => showingCinemaIds.includes(c.id));

          return (
            <div
              key={movie.id}
              className="bg-[#0C111F] border border-slate-800 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Backdrop & Poster */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                  <img 
                    src={movie.backdrop} 
                    alt={movie.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C111F] via-[#0C111F]/70 to-transparent" />

                  {/* Left Poster Badge */}
                  <div className="absolute bottom-4 left-4 flex gap-3 items-end">
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      className="w-20 h-28 object-cover rounded-xl border-2 border-amber-500 shadow-2xl shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                          {movie.certification}
                        </span>
                        <span className="text-amber-400 font-bold text-xs">
                          ★ {movie.rating} ({movie.votes})
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
                        {movie.title}
                      </h3>
                      {movie.teluguTitle && (
                        <span className="text-xs text-slate-400 font-medium">
                          {movie.teluguTitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {movie.synopsis}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{movie.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-amber-400" />
                      <span>{movie.genre.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-amber-400" />
                      <span>{movie.languages.join(' / ')}</span>
                    </div>
                  </div>

                  {/* Theatres Showing Mini-List */}
                  <div className="pt-3 border-t border-slate-800">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-2">
                      Vijayawada Multiplexes Showing ({cinemasShowing.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cinemasShowing.map(c => (
                        <button
                          key={c.id}
                          onClick={() => onExploreCinema(c)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-[11px] text-slate-300 hover:text-white transition"
                        >
                          {c.shortName} ({c.locality})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectMovieForBooking(movie)}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>View All Vijayawada Showtimes</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

