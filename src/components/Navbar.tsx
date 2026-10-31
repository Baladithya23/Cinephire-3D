import React, { useState } from 'react';
import { 
  MapPin, 
  ChevronDown, 
  Sparkles, 
  Film, 
  Map, 
  ShieldCheck, 
  User, 
  Menu, 
  X,
  Volume2
} from 'lucide-react';
import { CityOption, UserProfile } from '../types/cinema';

interface NavbarProps {
  currentCity: CityOption;
  onOpenLocationModal: () => void;
  activeView: 'cinemas' | 'movies' | 'map' | 'audit';
  onChangeView: (view: 'cinemas' | 'movies' | 'map' | 'audit') => void;
  currentUser: UserProfile;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCity,
  onOpenLocationModal,
  activeView,
  onChangeView,
  currentUser,
  onOpenAuthModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#06080F]/90 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onChangeView('cinemas')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition">
              <div className="w-full h-full bg-[#06080F] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-amber-400 text-sm tracking-tighter">
                  3D
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black font-display tracking-tight text-white group-hover:text-amber-400 transition">
                  CineSphere<span className="text-amber-400">3D</span>
                </span>
                <span className="hidden sm:inline-block text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 uppercase tracking-widest">
                  VJA
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Vijayawada Cinema Booking
              </p>
            </div>
          </button>

          {/* Primary City Selector Badge in Navbar */}
          <button
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-500 text-xs text-white transition shadow-sm ml-2 group"
            title="Change Location"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="font-bold text-white block text-xs">
                {currentCity.name}
              </span>
              <span className="text-[9px] text-slate-400 block -mt-0.5">
                {currentCity.state}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors ml-0.5" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => onChangeView('cinemas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'cinemas'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>Theatres ({currentCity.theatresCount})</span>
          </button>

          <button
            onClick={() => onChangeView('movies')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'movies'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Movies</span>
          </button>

          <button
            onClick={() => onChangeView('map')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'map'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Discovery Map</span>
          </button>

          <button
            onClick={() => onChangeView('audit')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'audit'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audit Report</span>
          </button>
        </nav>

        {/* Right User Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            <User className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">
              {currentUser.isLoggedIn ? currentUser.name.split(' ')[0] : 'Sign In'}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-xl bg-slate-900 border border-slate-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0C111F] p-4 space-y-2 animate-in slide-in-from-top-2">
          <button
            onClick={() => {
              onChangeView('cinemas');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeView === 'cinemas' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Vijayawada Theatres ({currentCity.theatresCount})
          </button>

          <button
            onClick={() => {
              onChangeView('movies');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeView === 'movies' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Movies Playing
          </button>

          <button
            onClick={() => {
              onChangeView('map');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeView === 'map' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Cinema Discovery Map
          </button>

          <button
            onClick={() => {
              onChangeView('audit');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeView === 'audit' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Vijayawada Data Verification Audit
          </button>
        </div>
      )}
    </header>
  );
};
