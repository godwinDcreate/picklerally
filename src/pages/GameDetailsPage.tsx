import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Lock,
  Share2,
  CalendarPlus,
  Send,
  MessageSquare,
  ShieldCheck,
  Zap,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

export const GameDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { games, joinGame, leaveGame, joinedGameIds, addGameComment, currentUser, showToast } = useApp();
  const [commentText, setCommentText] = useState('');

  const game = games.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Game Not Found</h2>
        <p className="text-slate-500 text-sm">The game you are looking for may have ended or been removed.</p>
        <button
          onClick={() => navigate('/games')}
          className="px-5 py-2.5 bg-lime-400 text-slate-950 font-extrabold text-xs rounded-xl"
        >
          Back to All Games
        </button>
      </div>
    );
  }

  const isJoined = joinedGameIds.includes(game.id);
  const isFull = game.currentPlayersCount >= game.maxPlayers;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addGameComment(game.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: game.title,
        text: `Join ${game.title} at ${game.courtName} on PickleRally!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied 🔗', 'Game URL copied to clipboard.');
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(game.title);
    const details = encodeURIComponent(`${game.description}\nCourt: ${game.courtName}`);
    const location = encodeURIComponent(game.courtAddress);
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Games</span>
      </button>

      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-900 shadow-xl">
        <div className="h-56 sm:h-72 w-full relative">
          <img
            src={game.courtImage}
            alt={game.courtName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge variant="emerald" size="lg">{game.skillLevel}</Badge>
            <Badge variant="slate" size="lg">{game.gameFormat}</Badge>
            <Badge variant="outline" size="lg">{game.indoorOutdoor}</Badge>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-900 transition-colors"
              title="Share Game"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddToCalendar}
              className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-900 transition-colors"
              title="Add to Calendar"
            >
              <CalendarPlus className="w-4 h-4" />
            </button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight font-display">
              {game.title}
            </h1>
            <p className="flex items-center gap-2 text-xs sm:text-sm text-lime-400 font-medium">
              <MapPin className="w-4 h-4" />
              <span>{game.courtName} • {game.courtAddress}</span>
            </p>
          </div>
        </div>

        {/* Schedule & Info Bar */}
        <div className="p-6 bg-slate-900 text-white grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-800">
          <div>
            <span className="block text-[10px] uppercase font-extrabold text-slate-400">Date</span>
            <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-4 h-4 text-lime-400" />
              {game.displayDate}
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-extrabold text-slate-400">Time</span>
            <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
              <Clock className="w-4 h-4 text-lime-400" />
              {game.startTime} – {game.endTime}
            </span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-extrabold text-slate-400">Cost</span>
            <span className="text-sm font-bold text-lime-400 mt-0.5 block">{game.cost}</span>
          </div>

          <div>
            <span className="block text-[10px] uppercase font-extrabold text-slate-400">Ball Type</span>
            <span className="text-sm font-bold text-slate-200 mt-0.5 block">{game.ballType}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Details, Rules, Comments */}
        <div className="lg:col-span-8 space-y-8">
          {/* Description Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">About This Game</h3>
              {game.isReclubVerified && (
                <a
                  href={game.reclubSyncUrl || 'https://reclub.co'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0F172A] text-[#D9FD16] rounded-full text-xs font-black border border-[#D9FD16]/30 hover:bg-[#1E293B] transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D9FD16]" />
                  <span>Reclub Verified: {game.reclubClubName || 'La Union Club'}</span>
                </a>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {game.description}
            </p>

            {/* House Rules */}
            {game.houseRules && game.houseRules.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Court & Match Rules</h4>
                <ul className="space-y-1.5">
                  {game.houseRules.map((rule, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-lime-500 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Confirmed Roster */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-lime-500" />
                <span>Confirmed Players ({game.currentPlayersCount}/{game.maxPlayers})</span>
              </h3>
              <span className="text-xs font-bold text-slate-400">
                {game.maxPlayers - game.currentPlayersCount} spots open
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {game.participants.map((participant, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={participant.player.avatar}
                      alt={participant.player.name}
                      size="md"
                      duprRating={participant.player.duprRating}
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{participant.player.name}</p>
                      <p className="text-[10px] font-medium text-slate-500">{participant.player.skillLevel}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    participant.role === 'Host'
                      ? 'bg-amber-400/20 text-amber-500 border border-amber-400/30'
                      : 'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {participant.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Discussion Chat */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-lime-500" />
              <span>Player Discussion ({game.comments.length})</span>
            </h3>

            {/* Comment List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {game.comments.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No messages yet. Be the first player to post a comment!</p>
              ) : (
                game.comments.map((cm) => (
                  <div key={cm.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Avatar src={cm.playerAvatar} alt={cm.playerName} size="xs" />
                        <span className="font-bold text-slate-900 dark:text-white">{cm.playerName}</span>
                        <span className="text-[10px] text-lime-500 font-mono">DUPR {cm.playerRating.toFixed(2)}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{cm.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 pl-8">{cm.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Ask a question or send a message to participants..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs hover:bg-lime-300 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Sidebar - Sticky Join CTA & Host Profile */}
        <div className="lg:col-span-4 space-y-6">
          {/* Join CTA Box */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xl sticky top-24 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Spot Availability</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                {game.currentPlayersCount} <span className="text-slate-400 font-normal">/ {game.maxPlayers} Players</span>
              </div>
            </div>

            {/* CTA Button */}
            {isJoined ? (
              <div className="space-y-3">
                <div className="w-full py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-extrabold text-sm text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>You're Registered! 🎉</span>
                </div>
                <button
                  onClick={() => leaveGame(game.id)}
                  className="w-full py-2 text-rose-500 font-bold text-xs hover:underline text-center"
                >
                  Leave Game Registration
                </button>
              </div>
            ) : isFull ? (
              <button
                disabled
                className="w-full py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Game Is Full</span>
              </button>
            ) : (
              <button
                onClick={() => joinGame(game.id)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 font-black text-base shadow-lg shadow-lime-500/25 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 text-slate-950 fill-current" />
                <span>Join Game Now</span>
              </button>
            )}

            {/* Host Card Spotlight */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hosted By</span>
              <div className="flex items-center gap-3">
                <Avatar
                  src={game.host.avatar}
                  alt={game.host.name}
                  size="md"
                  duprRating={game.host.duprRating}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{game.host.name}</h4>
                  <p className="text-[10px] text-lime-500 font-bold">{game.host.skillLevel}</p>
                </div>
                <Link
                  to={`/players/${game.host.id}`}
                  className="text-[11px] font-bold text-lime-600 dark:text-lime-400 hover:underline shrink-0"
                >
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
