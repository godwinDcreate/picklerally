import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GameCard } from '../components/games/GameCard';
import { GameFilters } from '../components/games/GameFilters';
import { MapView } from '../components/common/MapView';
import {
  Trophy,
  PlusCircle,
  Map,
  Grid,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const FindGamesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courtFilterId = searchParams.get('court');

  const { games, courts, filters, resetFilters } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Filter logic
  const filteredGames = games.filter((game) => {
    // Court query filter from URL if present
    if (courtFilterId && game.courtId !== courtFilterId) return false;

    // Search query
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = game.title.toLowerCase().includes(q);
      const matchCourt = game.courtName.toLowerCase().includes(q);
      const matchSkill = game.skillLevel.toLowerCase().includes(q);
      if (!matchTitle && !matchCourt && !matchSkill) return false;
    }

    // Date filter
    if (filters.dateFilter === 'today') {
      // Show games with today date
      if (!game.displayDate.toLowerCase().includes('today') && !game.displayDate.toLowerCase().includes('sat')) return false;
    } else if (filters.dateFilter === 'weekend') {
      if (!game.displayDate.toLowerCase().includes('sat') && !game.displayDate.toLowerCase().includes('sun')) return false;
    }

    // Skill level filter
    if (filters.skillLevel !== 'all') {
      if (!game.skillLevel.toLowerCase().includes(filters.skillLevel.toLowerCase())) return false;
    }

    // Format filter
    if (filters.gameFormat !== 'all') {
      if (game.gameFormat !== filters.gameFormat) return false;
    }

    // Game type filter
    if (filters.gameType !== 'all') {
      if (game.gameType !== filters.gameType) return false;
    }

    // Indoor / Outdoor
    if (filters.indoorOutdoor !== 'all') {
      if (game.indoorOutdoor !== filters.indoorOutdoor) return false;
    }

    // Only available spots
    if (filters.onlyAvailableSpots) {
      if (game.currentPlayersCount >= game.maxPlayers) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-1">
            <Trophy className="w-4 h-4" />
            <span>Game Discovery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Find Pickleball Games
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Showing {filteredGames.length} live games in La Union, Philippines
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'map'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
          </div>

          <button
            onClick={() => navigate('/create-game')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-extrabold text-xs shadow-md transition-all"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Host a Game</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <GameFilters />

      {/* Main Content Area */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <MapView courts={courts} games={filteredGames} />
          <p className="text-xs text-slate-500 text-center">
            Click any court pin on the map to see court details and live scheduled games.
          </p>
        </div>
      ) : filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-lime-500 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            No games found matching your filters
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Try adjusting your search criteria, skill levels, or date range. Or be the first to host a game at your local court!
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
            <button
              onClick={() => navigate('/create-game')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-lime-400 text-slate-950 text-xs font-extrabold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create This Game</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
