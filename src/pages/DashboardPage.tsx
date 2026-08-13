import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GameCard } from '../components/games/GameCard';
import { CourtCard } from '../components/courts/CourtCard';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import {
  Trophy,
  PlusCircle,
  Users,
  MapPin,
  Calendar,
  Zap,
  Activity,
  Heart,
  Flame,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, games, courts, joinedGameIds, savedCourtIds } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'hosted' | 'savedCourts'>('upcoming');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
        <p className="text-slate-300 text-sm font-bold">Please sign in to access your player dashboard.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2.5 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs"
        >
          Sign In
        </button>
      </div>
    );
  }

  // Filter games
  const upcomingJoinedGames = games.filter((g) => joinedGameIds.includes(g.id));
  const myHostedGames = games.filter((g) => g.host.id === currentUser.id);
  const mySavedCourts = courts.filter((c) => savedCourtIds.includes(c.id));

  // Time of day greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar
              src={currentUser.avatar}
              alt={currentUser.name}
              size="xl"
              duprRating={currentUser.duprRating}
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black font-display">
                  {greeting}, {currentUser.name.split(' ')[0]} 👋
                </h1>
                <Badge variant="amber">{currentUser.badge || 'Active Dinker'}</Badge>
              </div>

              <p className="text-xs text-slate-300 font-medium flex items-center gap-2">
                <span>{currentUser.skillLevel}</span>
                <span>•</span>
                <span className="text-lime-400 font-bold">{currentUser.preferredFormat}</span>
                <span>•</span>
                <span>{currentUser.location}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-400">DUPR Rating</span>
              <span className="text-2xl font-black text-lime-400 font-mono">{currentUser.duprRating.toFixed(2)}</span>
            </div>
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Win Rate</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{currentUser.winRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => navigate('/games')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-lime-500/50 hover:shadow-md transition-all text-left group"
        >
          <Trophy className="w-6 h-6 text-lime-500 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Find a Game</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Discover open matches</p>
        </button>

        <button
          onClick={() => navigate('/create-game')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-lime-500/50 hover:shadow-md transition-all text-left group"
        >
          <PlusCircle className="w-6 h-6 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Create a Game</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Host at your court</p>
        </button>

        <button
          onClick={() => navigate('/players')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-lime-500/50 hover:shadow-md transition-all text-left group"
        >
          <Users className="w-6 h-6 text-sky-500 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Find Players</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Match by DUPR rating</p>
        </button>

        <button
          onClick={() => navigate('/courts')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-lime-500/50 hover:shadow-md transition-all text-left group"
        >
          <MapPin className="w-6 h-6 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Find Courts</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">Indoor & outdoor venues</p>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'upcoming'
                ? 'bg-lime-400 text-slate-950 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            My Upcoming Games ({upcomingJoinedGames.length})
          </button>

          <button
            onClick={() => setActiveTab('hosted')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'hosted'
                ? 'bg-lime-400 text-slate-950 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            My Hosted Games ({myHostedGames.length})
          </button>

          <button
            onClick={() => setActiveTab('savedCourts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'savedCourts'
                ? 'bg-lime-400 text-slate-950 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Favorite Courts ({mySavedCourts.length})
          </button>
        </div>

        {/* Tab Panels */}
        {activeTab === 'upcoming' && (
          <div>
            {upcomingJoinedGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingJoinedGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <p className="text-xs text-slate-400">You haven't joined any upcoming games yet.</p>
                <button
                  onClick={() => navigate('/games')}
                  className="px-4 py-2 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs"
                >
                  Browse Games Feed
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'hosted' && (
          <div>
            {myHostedGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myHostedGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <p className="text-xs text-slate-400">You haven't hosted any games yet.</p>
                <button
                  onClick={() => navigate('/create-game')}
                  className="px-4 py-2 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs"
                >
                  Create Your First Game
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'savedCourts' && (
          <div>
            {mySavedCourts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mySavedCourts.map((court) => (
                  <CourtCard key={court.id} court={court} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <p className="text-xs text-slate-400">No favorite courts saved yet.</p>
                <button
                  onClick={() => navigate('/courts')}
                  className="px-4 py-2 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs"
                >
                  Discover Courts
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
