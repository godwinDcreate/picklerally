import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GameCard } from '../components/games/GameCard';
import { Badge } from '../components/common/Badge';
import {
  MapPin,
  Star,
  Sun,
  Home,
  Zap,
  Clock,
  ShieldCheck,
  PlusCircle,
  ArrowLeft,
  Navigation
} from 'lucide-react';

export const CourtDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courts, games, savedCourtIds, toggleSaveCourt } = useApp();

  const court = courts.find((c) => c.id === id);

  if (!court) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Court Not Found</h2>
        <button
          onClick={() => navigate('/courts')}
          className="px-5 py-2.5 bg-lime-400 text-slate-950 font-extrabold text-xs rounded-xl"
        >
          Back to Courts
        </button>
      </div>
    );
  }

  const isSaved = savedCourtIds.includes(court.id);
  const activeGamesAtCourt = games.filter((g) => g.courtId === court.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Courts</span>
      </button>

      {/* Hero Court Header */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-900 shadow-xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={court.image}
            alt={court.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />

          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="slate">{court.indoorOutdoor}</Badge>
            {court.hasLights && <Badge variant="amber" icon={<Zap className="w-3 h-3 text-amber-500" />}>Night Lights</Badge>}
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-amber-400 font-extrabold text-xs bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
                <Star className="w-3.5 h-3.5 fill-current" />
                {court.rating} ({court.reviewCount} Reviews)
              </span>
              <span className="text-xs font-bold text-lime-400 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
                {court.totalCourts} Dedicated Courts
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight font-display">
              {court.name}
            </h1>
            <p className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
              <MapPin className="w-4 h-4 text-lime-400" />
              <span>{court.address}, {court.city}, {court.state} {court.zip} ({court.distance})</span>
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="p-6 bg-slate-900 text-white grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-800">
          <div>
            <span className="block text-[10px] uppercase font-extrabold text-slate-400">Hours</span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block">{court.openHours}</span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-extrabold text-slate-400">Fee Structure</span>
            <span className="text-xs font-bold text-lime-400 mt-0.5 block">{court.fee}</span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-extrabold text-slate-400">Surface Type</span>
            <span className="text-xs font-bold text-slate-200 mt-0.5 block">{court.surfaceType}</span>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={() => navigate('/create-game')}
              className="px-4 py-2 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs hover:bg-lime-300 transition-colors inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Host Game Here</span>
            </button>
          </div>
        </div>
      </div>

      {/* Description & Amenities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Facility Overview</h3>
              {court.reclubVerified && (
                <a
                  href={court.reclubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F172A] text-[#D9FD16] text-xs font-black border border-[#D9FD16]/40 hover:bg-[#1E293B] transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D9FD16]" />
                  <span>Reclub Official: {court.reclubClubName}</span>
                </a>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {court.description}
            </p>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Amenities & Features</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {court.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <ShieldCheck className="w-4 h-4 text-lime-500 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Scheduled Games at this Court */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
              Live Games at {court.name} ({activeGamesAtCourt.length})
            </h3>

            {activeGamesAtCourt.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeGamesAtCourt.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <p className="text-xs text-slate-400">No upcoming games scheduled at this court yet.</p>
                <button
                  onClick={() => navigate('/create-game')}
                  className="px-4 py-2 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs"
                >
                  Schedule the First Game
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Directions & Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Location & Directions</h4>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 space-y-1">
              <p className="font-bold">{court.name}</p>
              <p>{court.address}</p>
              <p>{court.city}, {court.state} {court.zip}</p>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(court.name + ' ' + court.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-lime-400" />
              <span>Get Directions in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
