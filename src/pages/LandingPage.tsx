import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GameCard } from '../components/games/GameCard';
import { CourtCard } from '../components/courts/CourtCard';
import { PlayerCard } from '../components/players/PlayerCard';
import { ReclubClubsSection } from '../components/common/ReclubClubsSection';
import laUnionCourtImg from '../assets/images/la_union_pickleball_court_1786636130500.jpg';
import {
  Trophy,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Heart,
  MessageSquare,
  Activity,
  Flame,
  Award
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { games, courts, players, communityPosts } = useApp();

  const featuredGames = games.slice(0, 3);
  const featuredCourts = courts.slice(0, 3);
  const featuredPlayers = players.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0F172A] text-white pt-12 lg:pt-20 pb-20 lg:pb-28 border-b border-slate-800">
        {/* Subtle background gradient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[#D9FD16]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-[#D9FD16] text-xs font-black tracking-wider uppercase shadow-inner">
                <Sparkles className="w-4 h-4 text-[#D9FD16] animate-pulse" />
                <span>The #1 La Union & Philippine Pickleball Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] font-display">
                Find Your Game.{' '}
                <span className="text-[#D9FD16]">
                  Find Your People.
                </span>{' '}
                Play Pickleball in Elyu.
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover pickleball courts across San Juan, San Fernando, and La Union, connect with players at your DUPR level, and get on the court in seconds.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => navigate('/games')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#D9FD16] text-[#0F172A] font-extrabold text-base shadow-xl shadow-[#D9FD16]/20 hover:bg-[#cbf013] active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5 text-[#0F172A] stroke-[2.5]" />
                  <span>Find a Game</span>
                </button>

                <button
                  onClick={() => navigate('/create-game')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base border border-slate-700 shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-[#D9FD16]" />
                  <span>Create a Game</span>
                </button>
              </div>

              {/* Trust Indicators / Stats Row */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="block text-2xl sm:text-3xl font-black text-white font-mono">14,200+</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Players</span>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="block text-2xl sm:text-3xl font-black text-[#D9FD16] font-mono">3,850+</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Courts Listed</span>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="block text-2xl sm:text-3xl font-black text-[#D9FD16] font-mono">98.4%</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Match Rate</span>
                </div>
              </div>
            </div>

            {/* Hero Feature Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/80 shadow-2xl p-2 group">
                <img
                  src={laUnionCourtImg}
                  alt="San Juan La Union Pickleball Court"
                  className="w-full h-[420px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Floating Game Preview Widget */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold text-lime-400 tracking-widest bg-lime-400/10 px-2 py-0.5 rounded-md border border-lime-400/20">
                      RECLUB VERIFIED SESSION
                    </span>
                    <span className="text-xs font-bold text-slate-300">2 Spots Open</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-white">Sunset Surf & Dink 3.5+ Doubles</h4>
                  <p className="text-xs text-slate-400 mt-0.5">San Juan Beachfront Courts • Sat 4:30 PM</p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <img className="w-7 h-7 rounded-full border-2 border-slate-900" src={players[0]?.avatar} alt="Alex" />
                      <img className="w-7 h-7 rounded-full border-2 border-slate-900" src={players[1]?.avatar} alt="Sarah" />
                      <img className="w-7 h-7 rounded-full border-2 border-slate-900" src={players[2]?.avatar} alt="Marcus" />
                    </div>
                    <button
                      onClick={() => navigate('/games')}
                      className="px-3.5 py-1.5 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs hover:bg-lime-300 transition-colors"
                    >
                      Instant Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest bg-lime-500/10 px-3 py-1 rounded-full border border-lime-500/20">
            Simple & Fast
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            How PickleRally Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            From finding a court to making third-shot drops with new partners in 3 easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs relative group hover:border-lime-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-lime-400/20 text-lime-600 dark:text-lime-400 font-black text-xl flex items-center justify-center mb-4">
              01
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mb-2">Discover Courts & Games</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Explore local indoor & outdoor courts, filtered by distance, skill level (DUPR 2.0 - 5.0+), and game format.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs relative group hover:border-lime-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 font-black text-xl flex items-center justify-center mb-4">
              02
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mb-2">Match with Compatible Players</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Find local players at your exact rating level. Join existing doubles/singles games or invite players directly.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs relative group hover:border-lime-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-600 dark:text-amber-400 font-black text-xl flex items-center justify-center mb-4">
              03
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mb-2">Step On Court & Dink!</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Get real-time match reminders, chat with participants, add games to calendar, and build your local pickleball network.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED GAMES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5 text-lime-500" />
              <span className="text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-wider">
                Live Open Games
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display">
              Upcoming Pickleball Matches
            </h2>
          </div>

          <button
            onClick={() => navigate('/games')}
            className="inline-flex items-center gap-1.5 font-extrabold text-sm text-lime-600 dark:text-lime-400 hover:text-lime-500 transition-colors"
          >
            <span>View All Games ({games.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* FEATURED COURTS SECTION */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-lime-400 uppercase tracking-widest bg-lime-400/10 px-3 py-1 rounded-full border border-lime-400/20">
                Top Rated Venues
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2 font-display">
                Discover Local Pickleball Courts
              </h2>
            </div>

            <button
              onClick={() => navigate('/courts')}
              className="inline-flex items-center gap-1.5 font-extrabold text-sm text-lime-400 hover:text-lime-300 transition-colors"
            >
              <span>Explore All Courts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PLAYERS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-wider">
              Local Community
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1 font-display">
              Connect with Nearby Players
            </h2>
          </div>

          <button
            onClick={() => navigate('/players')}
            className="inline-flex items-center gap-1.5 font-extrabold text-sm text-lime-600 dark:text-lime-400 hover:text-lime-500 transition-colors"
          >
            <span>Find Players & Partners</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>

      {/* COMMUNITY & DISCUSSIONS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-800 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-lime-400 uppercase tracking-widest bg-lime-400/10 px-3 py-1 rounded-full border border-lime-400/20">
                Community Hub
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-display">
                More Than Booking — A Real Pickleball Community
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Join discussions on paddle reviews, court lights updates, local round robins, and third-shot drop strategies with local pickleball players.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/community')}
                  className="px-6 py-3 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs sm:text-sm hover:bg-lime-300 transition-colors inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Join Community Discussions</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              {communityPosts.slice(0, 2).map((post) => (
                <div key={post.id} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-lime-400">{post.category}</span>
                    <span>{post.createdAt}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{post.title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{post.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECLUB OFFICIAL CLUBS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReclubClubsSection />
      </section>

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 p-8 sm:p-12 text-slate-950 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-2xl mx-auto font-display">
            Ready to Hit the Kitchen?
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-900 max-w-xl mx-auto">
            Join thousands of pickleball enthusiasts discovering games, finding court time, and making friends on the court today.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-950 text-white font-extrabold text-sm shadow-xl hover:bg-slate-900 transition-all"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate('/games')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-950/10 hover:bg-slate-950/20 text-slate-950 font-extrabold text-sm border border-slate-950/20 transition-all"
            >
              Browse Games
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
