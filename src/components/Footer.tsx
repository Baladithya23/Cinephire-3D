import React from 'react';
import { Film, Map, ShieldCheck, Heart, MapPin, Sparkles, AlertCircle, Building2 } from 'lucide-react';
import { OTHER_HISTORIC_THEATRES } from '../data/cinemas';

interface FooterProps {
  activeView: 'cinemas' | 'movies' | 'map' | 'audit';
  onChangeView: (view: 'cinemas' | 'movies' | 'map' | 'audit') => void;
}

export const Footer: React.FC<FooterProps> = ({ activeView, onChangeView }) => {
  return (
    <>
      <footer className="mt-20 border-t border-slate-800/80 bg-[#06080F] text-slate-400 text-xs pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          {/* Heritage & Single Screen Halls Section (From Reference Doc) */}
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Historical & Single-Screen Cinema Halls of Vijayawada</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-4xl">
              From the reference document <em>"Vijayawada Theatres & Multiplexes Website Content.docx"</em>: Vijayawada preserves a rich cinematic history including historic venues like Durga Kalamandiram (built in 1936) and Rajakumari, alongside multiplexes on MG Road, Gandhi Nagar, and Bunder Road.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {OTHER_HISTORIC_THEATRES.map(hall => (
                <div key={hall.name} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px]">
                  <div className="font-semibold text-slate-200">{hall.name}</div>
                  <div className="text-amber-400/80 mt-0.5">{hall.area}</div>
                  <div className="text-slate-500 text-[10px] mt-1">{hall.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Data Source Transparency Notice */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-slate-400 leading-relaxed space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Legal & Pricing Disclaimer (AP Cinema Regulation Slabs)
            </div>
            <p>
              "Tickets usually start around ₹150 and go to ₹250 on normal days; recliners and big releases cost more. Final price shows at booking." 
              All prices shown on this demonstration platform are illustrative placeholders. Exact final ticket fares and taxes are determined by the theater and active booking API at checkout.
            </p>
            <p className="text-slate-500 text-[10px]">
              Initial data extracted strictly from: <strong>Vijayawada Theatres & Multiplexes Website Content.docx</strong>. No IMAX screens exist in Vijayawada; Dolby Atmos is listed only where explicitly verified.
            </p>
          </div>

          {/* Bottom Brand Bar */}
          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <span className="font-bold text-white font-display">CineSphere 3D</span>
              <span>— Local Cinema Discovery & 3D Booking Platform</span>
            </div>

            <div className="flex items-center gap-4 text-slate-500 text-[11px]">
              <button onClick={() => onChangeView('cinemas')} className="hover:text-amber-400 transition">
                Theatres
              </button>
              <button onClick={() => onChangeView('movies')} className="hover:text-amber-400 transition">
                Movies
              </button>
              <button onClick={() => onChangeView('map')} className="hover:text-amber-400 transition">
                Map
              </button>
              <button onClick={() => onChangeView('audit')} className="hover:text-amber-400 transition">
                Audit Report
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Bottom Navigation Bar (For Exceptional Phone Compatibility) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#06080F]/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2 flex items-center justify-around text-[10px] font-semibold text-slate-400 shadow-2xl">
        <button
          onClick={() => onChangeView('cinemas')}
          className={`flex flex-col items-center gap-1 p-1 transition ${
            activeView === 'cinemas' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <Film className="w-5 h-5" />
          <span>Theatres</span>
        </button>

        <button
          onClick={() => onChangeView('movies')}
          className={`flex flex-col items-center gap-1 p-1 transition ${
            activeView === 'movies' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Movies</span>
        </button>

        <button
          onClick={() => onChangeView('map')}
          className={`flex flex-col items-center gap-1 p-1 transition ${
            activeView === 'map' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <Map className="w-5 h-5" />
          <span>Map View</span>
        </button>

        <button
          onClick={() => onChangeView('audit')}
          className={`flex flex-col items-center gap-1 p-1 transition ${
            activeView === 'audit' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Audit</span>
        </button>
      </nav>
    </>
  );
};

