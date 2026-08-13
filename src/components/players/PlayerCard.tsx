import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '../../types';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import {
  MapPin,
  Trophy,
  Zap,
  Send,
  UserCheck,
  Award,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const navigate = useNavigate();
  const { games, showToast } = useApp();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState('');

  const handleSendInvite = () => {
    if (!selectedGameId) {
      showToast('Select a Game', 'Please choose an upcoming game to invite player.', 'info');
      return;
    }
    const game = games.find((g) => g.id === selectedGameId);
    showToast('Invite Sent! 🏓', `Invited ${player.name} to "${game?.title || 'Game'}".`);
    setInviteModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:shadow-xl hover:border-lime-500/50 transition-all duration-300 flex flex-col justify-between relative">
      <div>
        {/* Header Avatar + DUPR Rating */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar
              src={player.avatar}
              alt={player.name}
              size="lg"
              isOnline={player.isOnline}
            />
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-tight hover:text-lime-500 transition-colors cursor-pointer" onClick={() => navigate(`/players/${player.id}`)}>
                {player.name}
              </h3>
              <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                <MapPin className="w-3 h-3 text-lime-500" />
                <span>{player.location}</span>
                {player.distance && (
                  <>
                    <span>•</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{player.distance}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">DUPR</span>
            <span className="text-lg font-black text-lime-600 dark:text-lime-400 font-mono">
              {player.duprRating.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Badges row */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          <Badge variant="emerald">{player.skillLevel}</Badge>
          <Badge variant="slate">{player.preferredFormat}</Badge>
          {player.badge && <Badge variant="amber" icon={<Award className="w-3 h-3 text-amber-500" />}>{player.badge}</Badge>}
        </div>

        {/* Bio Quote */}
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2 leading-relaxed italic">
          "{player.bio}"
        </p>

        {/* Quick Stats Grid */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 grid grid-cols-3 gap-2 text-center">
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Games</span>
            <span className="text-xs font-black text-slate-800 dark:text-slate-200">{player.gamesPlayed}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Win Rate</span>
            <span className="text-xs font-black text-emerald-500">{player.winRate}%</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase">Side</span>
            <span className="text-xs font-black text-slate-800 dark:text-slate-200">{player.sidePreference || 'Both'}</span>
          </div>
        </div>

        {/* Favorite Paddle */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Zap className="w-3.5 h-3.5 text-lime-500 shrink-0" />
          <span className="truncate">Paddle: <span className="text-slate-800 dark:text-slate-200 font-semibold">{player.favoritePaddle}</span></span>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={() => navigate(`/players/${player.id}`)}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1"
        >
          <span>View Profile</span>
        </button>

        <button
          onClick={() => setInviteModalOpen(true)}
          className="flex-1 py-2 px-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-extrabold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Invite</span>
        </button>
      </div>

      {/* Invite Modal Overlay */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Invite {player.name} to a Game
            </h3>
            <p className="text-xs text-slate-400">
              Select one of your hosted or upcoming games to send an instant pickleball invite to {player.name} (DUPR {player.duprRating.toFixed(2)}).
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase">
                Choose Game
              </label>
              <select
                value={selectedGameId}
                onChange={(e) => setSelectedGameId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
              >
                <option value="">-- Select Upcoming Game --</option>
                {games.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title} ({g.displayDate} @ {g.courtName})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setInviteModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvite}
                className="px-5 py-2 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
