import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PickleballGame } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Lock,
  ChevronRight,
  Sun,
  Home
} from 'lucide-react';

interface GameCardProps {
  game: PickleballGame;
  onOpenDetails?: (game: PickleballGame) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onOpenDetails }) => {
  const navigate = useNavigate();
  const { joinGame, joinedGameIds } = useApp();

  const isJoined = joinedGameIds.includes(game.id);
  const isFull = game.currentPlayersCount >= game.maxPlayers;

  const handleCardClick = () => {
    if (onOpenDetails) {
      onOpenDetails(game);
    } else {
      navigate(`/games/${game.id}`);
    }
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isJoined && !isFull) {
      joinGame(game.id);
    }
  };

  // Skill badge color styling
  const getSkillBadgeVariant = (skill: string) => {
    if (skill.includes('Beginner')) return 'blue';
    if (skill.includes('Intermediate')) return 'emerald';
    if (skill.includes('Advanced')) return 'purple';
    if (skill.includes('Competitive') || skill.includes('5.0')) return 'amber';
    return 'slate';
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:shadow-xl hover:border-lime-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top Banner & Status Badges */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={getSkillBadgeVariant(game.skillLevel)}>
              {game.skillLevel}
            </Badge>
            <Badge variant="slate">
              {game.gameFormat}
            </Badge>
            <Badge variant="outline" icon={game.indoorOutdoor === 'Outdoor' ? <Sun className="w-3 h-3 text-amber-500" /> : <Home className="w-3 h-3 text-sky-500" />}>
              {game.indoorOutdoor}
            </Badge>
            {game.isReclubVerified && (
              <span className="inline-flex items-center gap-1 bg-[#0F172A] text-[#D9FD16] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#D9FD16]/30 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9FD16] animate-ping" />
                Reclub
              </span>
            )}
          </div>

          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 whitespace-nowrap bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            {game.distance}
          </span>
        </div>

        {/* Title & Court Name */}
        <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors line-clamp-2 leading-snug">
          {game.title}
        </h3>

        <div className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <MapPin className="w-4 h-4 text-lime-500 shrink-0" />
            <span className="font-semibold truncate">{game.courtName}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {game.displayDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {game.startTime} – {game.endTime}
            </span>
          </div>
        </div>

        {/* Player Roster Progress */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              Players
            </span>
            <span className="font-extrabold text-slate-900 dark:text-slate-100">
              {game.currentPlayersCount} / {game.maxPlayers}{' '}
              <span className="text-slate-400 font-normal">
                ({Math.max(0, game.maxPlayers - game.currentPlayersCount)} spots left)
              </span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFull ? 'bg-amber-500' : 'bg-[#D9FD16]'
              }`}
              style={{ width: `${Math.min(100, (game.currentPlayersCount / game.maxPlayers) * 100)}%` }}
            />
          </div>

          {/* Participant Avatars Stack */}
          <div className="flex items-center justify-between">
            <div className="flex items-center -space-x-2 overflow-hidden">
              {game.participants.slice(0, 5).map((pt, idx) => (
                <Avatar
                  key={pt.player.id || idx}
                  src={pt.player.avatar}
                  alt={pt.player.name}
                  size="sm"
                />
              ))}
              {game.participants.length > 5 && (
                <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-white dark:border-slate-900 text-slate-300 font-bold text-[10px] flex items-center justify-center">
                  +{game.participants.length - 5}
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400 font-medium">
              Host: <span className="font-bold text-slate-700 dark:text-slate-200">{game.host.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action CTA */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {game.cost}
        </span>

        {isJoined ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/games/${game.id}`);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold border border-emerald-500/30"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>You're In!</span>
          </button>
        ) : isFull ? (
          <button
            disabled
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-bold cursor-not-allowed"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Game Full</span>
          </button>
        ) : (
          <button
            onClick={handleJoinClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D9FD16] hover:bg-[#cbf013] text-[#0F172A] font-extrabold text-xs shadow-xs active:scale-95 transition-all"
          >
            <span>Join Game</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
};
