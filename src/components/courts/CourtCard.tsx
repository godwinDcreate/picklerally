import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PickleballCourt } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import {
  MapPin,
  Star,
  Sun,
  Home,
  Zap,
  Heart,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface CourtCardProps {
  court: PickleballCourt;
}

export const CourtCard: React.FC<CourtCardProps> = ({ court }) => {
  const navigate = useNavigate();
  const { savedCourtIds, toggleSaveCourt, games } = useApp();

  const isSaved = savedCourtIds.includes(court.id);
  const activeGamesAtCourt = games.filter((g) => g.courtId === court.id);

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:border-lime-500/50 transition-all duration-300 flex flex-col justify-between">
      {/* Court Image Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-800">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveCourt(court.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isSaved
              ? 'bg-rose-500 text-white shadow-lg scale-110'
              : 'bg-slate-900/60 text-white hover:bg-slate-900 hover:text-rose-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Venue Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <Badge
            variant="slate"
            icon={court.indoorOutdoor === 'Outdoor' ? <Sun className="w-3 h-3 text-amber-400" /> : <Home className="w-3 h-3 text-sky-400" />}
          >
            {court.indoorOutdoor}
          </Badge>
          {court.reclubVerified && (
            <span className="inline-flex items-center gap-1 bg-[#0F172A] text-[#D9FD16] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#D9FD16]/40 uppercase tracking-wider shadow-md">
              <ShieldCheck className="w-3 h-3 text-[#D9FD16]" />
              Reclub Club
            </span>
          )}
          {court.hasLights && (
            <Badge variant="amber" icon={<Zap className="w-3 h-3 text-amber-500" />}>
              Lighted
            </Badge>
          )}
        </div>

        {/* Bottom Banner Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div className="flex items-center gap-1 text-amber-400 font-extrabold text-xs bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-800">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{court.rating}</span>
            <span className="text-slate-400 font-normal">({court.reviewCount})</span>
          </div>

          <span className="text-xs font-bold text-lime-400 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-800">
            {court.totalCourts} Dedicated Courts
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg group-hover:text-lime-500 transition-colors line-clamp-1">
              {court.name}
            </h3>
          </div>

          <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-lime-500 shrink-0" />
            <span className="truncate">{court.address}, {court.city}</span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">{court.distance}</span>
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
            {court.description}
          </p>

          {/* Amenities tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {court.amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
              >
                {amenity}
              </span>
            ))}
            {court.amenities.length > 4 && (
              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
                +{court.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
              Fee Structure
            </span>
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
              {court.fee}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/courts/${court.id}`)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
            >
              <span>View Court</span>
            </button>
            <button
              onClick={() => navigate(`/games?court=${court.id}`)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-extrabold text-xs shadow-xs transition-colors"
            >
              <span>Games ({activeGamesAtCourt.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
