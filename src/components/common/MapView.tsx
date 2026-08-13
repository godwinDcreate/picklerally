import React, { useState } from 'react';
import { PickleballCourt, PickleballGame } from '../../types';
import { MapPin, Navigation, Star, Users, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MapViewProps {
  courts?: PickleballCourt[];
  games?: PickleballGame[];
  selectedId?: string;
  onSelectCourt?: (court: PickleballCourt) => void;
  onSelectGame?: (game: PickleballGame) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  courts = [],
  games = [],
  onSelectCourt,
  onSelectGame,
}) => {
  const navigate = useNavigate();
  const [activePinId, setActivePinId] = useState<string | null>(null);

  const activeCourt = courts.find((c) => c.id === activePinId);
  const activeGame = games.find((g) => g.id === activePinId);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-inner group">
      {/* Map Graphic Canvas Placeholder / Vector Map */}
      <div className="absolute inset-0 bg-slate-950 opacity-90">
        {/* Decorative Grid Lines to simulate map streets & topography */}
        <svg className="w-full h-full opacity-20 stroke-slate-700" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Simulated river / lake vector */}
          <path d="M -50 200 Q 200 150 400 300 T 800 250 T 1200 400" fill="none" stroke="#0284c7" strokeWidth="18" opacity="0.6" />
          {/* Simulated highways */}
          <path d="M 0 100 Q 400 350 1200 100" fill="none" stroke="#f59e0b" strokeWidth="3" opacity="0.5" />
          <path d="M 300 0 L 300 600" fill="none" stroke="#64748b" strokeWidth="2" opacity="0.5" />
          <path d="M 700 0 L 700 600" fill="none" stroke="#64748b" strokeWidth="2" opacity="0.5" />
        </svg>
      </div>

      {/* Map Overlay Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-white shadow-lg">
        <Navigation className="w-4 h-4 text-lime-400 animate-pulse" />
        <span className="font-bold">La Union Pickleball Map Hub</span>
        <span className="text-[10px] bg-lime-400/20 text-lime-300 px-2 py-0.5 rounded-full font-mono">
          {courts.length} Courts
        </span>
      </div>

      {/* Interactive Pins */}
      <div className="absolute inset-0 p-8 flex items-center justify-around flex-wrap pointer-events-none">
        {courts.map((court, idx) => {
          // Calculate mock positions across the vector grid
          const leftOffsets = ['20%', '45%', '70%', '35%', '80%'];
          const topOffsets = ['30%', '25%', '40%', '65%', '70%'];
          const left = leftOffsets[idx % leftOffsets.length];
          const top = topOffsets[idx % topOffsets.length];

          const isSelected = activePinId === court.id;

          return (
            <div
              key={court.id}
              style={{ position: 'absolute', left, top }}
              className="pointer-events-auto transition-transform duration-300"
            >
              <button
                onClick={() => {
                  setActivePinId(court.id);
                  if (onSelectCourt) onSelectCourt(court);
                }}
                className={`relative group/pin flex items-center justify-center transition-all ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                }`}
              >
                {/* Pulsing ring */}
                <span className="absolute -inset-2 rounded-full bg-lime-400/30 animate-ping" />

                <div className={`p-2.5 rounded-full shadow-xl flex items-center justify-center border-2 ${
                  isSelected
                    ? 'bg-lime-400 text-slate-950 border-white'
                    : 'bg-slate-900 text-lime-400 border-lime-400/80'
                }`}>
                  <MapPin className="w-5 h-5 fill-current" />
                </div>

                {/* Pin Tooltip label */}
                <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/90 backdrop-blur-md text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-slate-800 shadow-lg pointer-events-none opacity-90 group-hover/pin:opacity-100">
                  {court.name.split(' ')[0]} ({court.totalCourts} nets)
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Court Popup Card */}
      {activeCourt && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-30 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 text-white shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <img src={activeCourt.image} alt={activeCourt.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h4 className="font-extrabold text-sm text-white">{activeCourt.name}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-current" />
                  {activeCourt.rating} • {activeCourt.totalCourts} Courts • {activeCourt.distance}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActivePinId(null)}
              className="text-slate-400 hover:text-white text-xs font-bold p-1"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-tight">
            {activeCourt.description}
          </p>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-lime-400">{activeCourt.fee}</span>
            <button
              onClick={() => navigate(`/courts/${activeCourt.id}`)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs"
            >
              <span>View Court Details</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
