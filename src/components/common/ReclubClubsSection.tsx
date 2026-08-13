import React from 'react';
import { useApp } from '../../context/AppContext';
import { ExternalLink, ShieldCheck, Users, Calendar, Award } from 'lucide-react';

export const ReclubClubsSection: React.FC = () => {
  const { reclubClubs } = useApp();

  return (
    <div className="bg-[#0F172A] rounded-3xl border border-slate-800 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden my-8">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9FD16]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9FD16]/10 border border-[#D9FD16]/30 text-[#D9FD16] text-xs font-black uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Reclub Authoritative Integration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Real Pickleball Clubs in La Union
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium leading-relaxed">
            All club profiles, open play schedules, and player rosters are verified against <strong className="text-[#D9FD16]">Reclub</strong>—the official home for real pickleball communities in the Philippines.
          </p>
        </div>

        <a
          href="https://reclub.co"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#D9FD16] hover:bg-[#cbf013] text-[#0F172A] font-extrabold text-sm shadow-lg transition-all shrink-0 self-start md:self-auto"
        >
          <span>Explore Reclub.co</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Reclub Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 relative z-10">
        {reclubClubs.map((club) => (
          <div
            key={club.id}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-[#D9FD16]/50 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="bg-[#D9FD16] text-[#0F172A] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#0F172A]" />
                  Verified
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-white group-hover:text-[#D9FD16] transition-colors leading-snug">
                {club.name}
              </h3>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">
                {club.location}
              </p>

              <p className="text-xs text-slate-300 mt-3 line-clamp-2 font-normal leading-relaxed">
                {club.description}
              </p>

              {/* Stats & Featured Courts */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Users className="w-3.5 h-3.5 text-[#D9FD16]" />
                  <span className="font-bold text-white">{club.memberCount}</span>
                  <span className="text-slate-400 text-[11px]">members</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-[#D9FD16]" />
                  <span className="font-bold text-white">{club.activeSessions}</span>
                  <span className="text-slate-400 text-[11px]">sessions/wk</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-slate-400">
                {club.reclubId}
              </span>
              <a
                href={club.reclubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#D9FD16] font-extrabold text-xs transition-colors"
              >
                <span>View on Reclub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
