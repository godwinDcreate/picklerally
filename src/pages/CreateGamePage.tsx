import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GameFormat, GameType, SkillLevel, CourtType } from '../types';
import {
  Trophy,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

export const CreateGamePage: React.FC = () => {
  const navigate = useNavigate();
  const { courts, addGame, showToast } = useApp();

  // Form State
  const [title, setTitle] = useState('');
  const [selectedCourtId, setSelectedCourtId] = useState(courts[0]?.id || '');
  const [customCourtName, setCustomCourtName] = useState('');
  const [date, setDate] = useState('2026-08-16');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('11:00 AM');
  const [gameFormat, setGameFormat] = useState<GameFormat>('Doubles');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('Intermediate (3.5)');
  const [gameType, setGameType] = useState<GameType>('Competitive');
  const [indoorOutdoor, setIndoorOutdoor] = useState<CourtType>('Outdoor');
  const [maxPlayers, setMaxPlayers] = useState<number>(8);
  const [description, setDescription] = useState('');
  const [ballType, setBallType] = useState('Franklin X-40 Outdoor');
  const [cost, setCost] = useState('Free (Public Courts)');
  const [isPrivate, setIsPrivate] = useState(false);

  // Success Confirmation State
  const [createdGameId, setCreatedGameId] = useState<string | null>(null);

  const selectedCourt = courts.find((c) => c.id === selectedCourtId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('Title Required', 'Please enter a title for your pickleball game.', 'error');
      return;
    }

    const courtName = selectedCourt ? selectedCourt.name : customCourtName || 'Local Court';
    const courtAddress = selectedCourt ? `${selectedCourt.address}, ${selectedCourt.city}` : 'San Juan, La Union';
    const courtImage = selectedCourt ? selectedCourt.image : 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?auto=format&fit=crop&q=80&w=800';

    const newGame = addGame({
      title: title.trim(),
      courtId: selectedCourtId || 'custom',
      courtName,
      courtAddress,
      courtImage,
      indoorOutdoor,
      date,
      displayDate: `Saturday, Aug 16`,
      startTime,
      endTime,
      distance: selectedCourt ? selectedCourt.distance : '1.5 mi',
      skillLevel,
      gameFormat,
      gameType,
      maxPlayers,
      host: null as any,
      description: description.trim() || 'Join us for a fun and competitive pickleball session! Please bring your paddle and enthusiasm.',
      houseRules: [
        `${ballType} balls provided`,
        'Paddle stack rotation in effect',
        'Respect call lines & sportsmanship'
      ],
      ballType,
      isPrivate,
      cost,
    });

    setCreatedGameId(newGame.id);
  };

  if (createdGameId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-lime-400/20 text-lime-500 mx-auto flex items-center justify-center border-2 border-lime-400 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-black text-slate-900 dark:text-white font-display">
          Your Pickleball Game is Live! 🏓
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
          "{title}" has been published to the PickleRally game discovery feed. Nearby players can now view and join your match.
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(`/games/${createdGameId}`)}
            className="px-6 py-3 rounded-2xl bg-lime-400 text-slate-950 font-extrabold text-sm hover:bg-lime-300 transition-colors inline-flex items-center gap-2 shadow-lg"
          >
            <span>View Created Game</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/games')}
            className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm"
          >
            Go to Games Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Host a Match</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
          Create a Pickleball Game
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Set up a game, choose court location, target DUPR level, and invite players.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        {/* Game Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Game Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Saturday Morning 3.5+ Competitive Doubles"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Court Selection */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Pickleball Court Venue *
          </label>
          <select
            value={selectedCourtId}
            onChange={(e) => setSelectedCourtId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            {courts.map((court) => (
              <option key={court.id} value={court.id}>
                {court.name} ({court.address}, {court.city}) - {court.totalCourts} Courts
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Start Time
            </label>
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="e.g. 9:00 AM"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              End Time
            </label>
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="e.g. 11:00 AM"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>
        </div>

        {/* Formats & Skill Levels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Game Format
            </label>
            <select
              value={gameFormat}
              onChange={(e) => setGameFormat(e.target.value as GameFormat)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="Doubles">Doubles</option>
              <option value="Singles">Singles</option>
              <option value="Open Play">Open Play</option>
              <option value="King of the Court">King of the Court</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Target Skill Level
            </label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="Beginner (2.0-2.5)">Beginner (2.0-2.5)</option>
              <option value="Advanced Beginner (3.0)">Adv. Beginner (3.0)</option>
              <option value="Intermediate (3.5)">Intermediate (3.5)</option>
              <option value="Advanced (4.0-4.5)">Advanced (4.0-4.5)</option>
              <option value="Competitive (5.0+)">Competitive (5.0+)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Game Type
            </label>
            <select
              value={gameType}
              onChange={(e) => setGameType(e.target.value as GameType)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="Competitive">Competitive</option>
              <option value="Casual">Casual</option>
              <option value="Beginner Friendly">Beginner Friendly</option>
              <option value="Open Play">Open Play</option>
            </select>
          </div>
        </div>

        {/* Max Players & Ball Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Max Player Capacity
            </label>
            <input
              type="number"
              min={2}
              max={32}
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(parseInt(e.target.value) || 8)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Ball Type
            </label>
            <input
              type="text"
              value={ballType}
              onChange={(e) => setBallType(e.target.value)}
              placeholder="e.g. Franklin X-40"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Cost / Court Fee
            </label>
            <input
              type="text"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="e.g. Free or $10/player"
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Game Description & Notes
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the play format, court reservation details, warmups, or rotation rules..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/games')}
            className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-lime-500/25 hover:brightness-105 transition-all"
          >
            Publish Game 🏓
          </button>
        </div>
      </form>
    </div>
  );
};
