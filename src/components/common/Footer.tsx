import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Shield, Zap, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-24 md:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-lime-500 to-emerald-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <svg className="w-5 h-5 text-lime-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V19c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 10c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
                    <circle cx="10" cy="8" r="0.75" fill="#020617" />
                    <circle cx="14" cy="8" r="0.75" fill="#020617" />
                    <circle cx="12" cy="10" r="0.75" fill="#020617" />
                  </svg>
                </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-display">
                Pickle<span className="text-lime-400">Rally</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The modern pickleball-only community platform. Connecting players at every level with local games, court availability, and paddle partners.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-lime-400">
                <Shield className="w-3.5 h-3.5 text-lime-400" />
                DUPR Rating Integrated
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                100% Pickleball Dedicated
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">Platform</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link to="/games" className="hover:text-lime-400 transition-colors">Find Local Games</Link>
              </li>
              <li>
                <Link to="/courts" className="hover:text-lime-400 transition-colors">Discover Courts</Link>
              </li>
              <li>
                <Link to="/players" className="hover:text-lime-400 transition-colors">Find Players & Partners</Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-lime-400 transition-colors">Community Hub & Events</Link>
              </li>
              <li>
                <Link to="/create-game" className="hover:text-lime-400 transition-colors">Host a Game</Link>
              </li>
            </ul>
          </div>

          {/* Pickleball DUPR Levels */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">Skill Levels Guide</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li className="flex items-center justify-between py-1 border-b border-slate-900">
                <span className="text-slate-300">2.0 - 2.5</span>
                <span className="text-slate-400">Beginner</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-900">
                <span className="text-slate-300">3.0</span>
                <span className="text-slate-400">Adv. Beginner</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-900">
                <span className="text-slate-300">3.5</span>
                <span className="text-lime-400 font-bold">Intermediate</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-900">
                <span className="text-slate-300">4.0 - 4.5</span>
                <span className="text-emerald-400 font-bold">Advanced</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span className="text-slate-300">5.0+</span>
                <span className="text-amber-400 font-bold">Competitive / Pro</span>
              </li>
            </ul>
          </div>

          {/* Local Hub */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">Court Etiquette</h4>
            <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-lime-400 shrink-0 mt-0.5" />
                <span>Call out score loudly before serving</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-lime-400 shrink-0 mt-0.5" />
                <span>4-in 4-out paddle stack rotation</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-lime-400 shrink-0 mt-0.5" />
                <span>Respect kitchen non-volley zone lines</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} PickleRally. Built for pickleball players everywhere.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-lime-400" />
              Austin & Nationwide Local Hubs
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
