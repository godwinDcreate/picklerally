import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlayerCard } from '../components/players/PlayerCard';
import {
  Users,
  Search,
  Filter,
  Trophy,
  Sparkles,
  Zap
} from 'lucide-react';

export const PlayersPage: React.FC = () => {
  const { players } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');

  const filteredPlayers = players.filter((player) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = player.name.toLowerCase().includes(q);
      const matchLoc = player.location.toLowerCase().includes(q);
      const matchPaddle = player.favoritePaddle.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchPaddle) return false;
    }

    if (skillFilter !== 'all') {
      if (!player.skillLevel.toLowerCase().includes(skillFilter.toLowerCase())) return false;
    }

    if (formatFilter !== 'all') {
      if (player.preferredFormat !== formatFilter) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-1">
          <Users className="w-4 h-4" />
          <span>Player Matchmaking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
          Find Pickleball Players
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Connect with {filteredPlayers.length} local pickleball players by skill level, rating, and schedule
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search player name, location, paddle brand..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="all">All DUPR Levels</option>
            <option value="Beginner">Beginner (2.0-2.5)</option>
            <option value="Advanced Beginner">Adv. Beginner (3.0)</option>
            <option value="Intermediate">Intermediate (3.5)</option>
            <option value="Advanced">Advanced (4.0-4.5)</option>
            <option value="Competitive">Competitive (5.0+)</option>
          </select>

          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="all">All Preferred Formats</option>
            <option value="Doubles">Doubles</option>
            <option value="Singles">Singles</option>
            <option value="Open Play">Open Play</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};
