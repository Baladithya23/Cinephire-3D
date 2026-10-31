import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle, Layers, Users, Volume2, Sparkles, Armchair, ExternalLink } from 'lucide-react';
import { VIJAYAWADA_CINEMAS } from '../data/cinemas';

export const AuditReportView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Title & Document Source Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0C111F] to-slate-900 border border-amber-500/40 shadow-xl space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Vijayawada Cinema Data Verification & Audit Report
            </h2>
            <p className="text-xs text-slate-400">
              Source: <em>Vijayawada Theatres & Multiplexes Website Content.docx</em>
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          To maintain absolute authenticity, CineSphere 3D strictly adheres to the provided source document. 
          Fields with missing information display <strong className="text-amber-400 font-mono">"Information unavailable"</strong> rather than fabricated data. 
          Dolby Atmos is presented <em>only</em> where explicitly confirmed (INOX Laila Mall & Capital Cinemas Trendset Mall). 
          <strong>No IMAX screen</strong> is claimed anywhere in Vijayawada.
        </p>
      </div>

      {/* Comprehensive Audit Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#0C111F]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-300 font-bold uppercase tracking-wider text-[11px]">
              <th className="p-3.5">Multiplex / Cinema</th>
              <th className="p-3.5">Locality</th>
              <th className="p-3.5">Screens</th>
              <th className="p-3.5">Seats</th>
              <th className="p-3.5">Dolby Atmos</th>
              <th className="p-3.5">3D / Projection</th>
              <th className="p-3.5">Recliners</th>
              <th className="p-3.5">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {VIJAYAWADA_CINEMAS.map(cinema => (
              <tr key={cinema.id} className="hover:bg-slate-800/30 transition">
                <td className="p-3.5">
                  <div className="font-bold text-white text-sm">{cinema.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{cinema.address}</div>
                </td>

                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400 font-semibold">
                    {cinema.locality}
                  </span>
                </td>

                <td className="p-3.5">
                  {cinema.screenCount !== null ? (
                    <span className="text-emerald-400 font-bold">
                      {cinema.screenCount} Screens
                    </span>
                  ) : (
                    <span className="text-slate-500 italic">Information unavailable</span>
                  )}
                </td>

                <td className="p-3.5">
                  {cinema.seatingCapacity !== null ? (
                    <span className="text-emerald-400 font-bold">
                      {cinema.seatingCapacity.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-slate-500 italic">Information unavailable</span>
                  )}
                </td>

                <td className="p-3.5">
                  {cinema.hasDolbyAtmos ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold">
                      Yes (Confirmed)
                    </span>
                  ) : (
                    <span className="text-slate-500 italic">Not confirmed</span>
                  )}
                </td>

                <td className="p-3.5">
                  {cinema.has3D ? (
                    <span className="text-cyan-400 font-semibold">
                      {cinema.projectionAnd3D}
                    </span>
                  ) : (
                    <span className="text-slate-500 italic">Information unavailable</span>
                  )}
                </td>

                <td className="p-3.5">
                  {cinema.recliners.verification === 'verified' ? (
                    <span className="text-amber-400 font-semibold">
                      {cinema.recliners.count ? `${cinema.recliners.count} Recliners` : 'Available'}
                    </span>
                  ) : (
                    <span className="text-slate-500 italic">Information unavailable</span>
                  )}
                </td>

                <td className="p-3.5">
                  {cinema.coordinates.isVerified ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-400">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Address Unverified
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Audit Notes from Reference Document Section 8 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Verified Facts in Reference Document
          </h4>
          <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
            <li><strong>Dolby Atmos:</strong> Strictly confirmed at 2 locations: INOX Laila Mall (all 3 screens) and Capital Cinemas Trendset Mall.</li>
            <li><strong>Laser Projection:</strong> Confirmed at INOX Laila Mall with Volfoni Smart Crystal Diamond 3D.</li>
            <li><strong>Recliner Counts:</strong> Confirmed 108 luxury recliners at Capital Cinemas Trendset Mall. Recliners verified present at Cinepolis PVP Square, PVR Ripples, and G3 Raj Yuvraj.</li>
            <li><strong>Seating Capacities:</strong> Confirmed 959 seats at INOX Laila Mall, 1,198 seats at INOX LEPL Icon, and 1,103 seats at INOX Urvasi Complex.</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Missing / Unconfirmed Information Flagged
          </h4>
          <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
            <li><strong>IMAX Myth:</strong> No operational IMAX screen exists in Vijayawada. Historical news from Trendset Mall construction mentioned IMAX, but no operational installation was ever verified.</li>
            <li><strong>Tara Screens 2K:</strong> Exact physical street address, screen count, and seating are not verified. Displayed with explicit warning.</li>
            <li><strong>Seat Counts Missing:</strong> Missing for Trendset, PVR Ripples, both Cinepolis multiplexes, Tara Screens, and G3 Theatres Raj Yuvraj.</li>
            <li><strong>PVR Ripples Screen Count:</strong> 4 screens reported in 2013 opening announcement; marked for partner re-verification.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
