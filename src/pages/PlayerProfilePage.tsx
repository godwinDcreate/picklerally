import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { GameCard } from '../components/games/GameCard';
import { elyuPlayerAvatar1, elyuPlayerAvatar2 } from '../data/mockData';
import {
  MapPin,
  Trophy,
  Zap,
  Award,
  Send,
  Edit3,
  Calendar,
  Activity,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Camera,
  Upload,
  Image as ImageIcon,
  Check
} from 'lucide-react';

const PRESET_AVATARS = [
  { id: 'elyu_1', label: 'San Juan Local (Teo)', url: elyuPlayerAvatar1 },
  { id: 'elyu_2', label: 'Beach Visor Player', url: elyuPlayerAvatar2 },
  { id: 'pro_1', label: 'Coastal Dink Pro', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' },
  { id: 'pro_2', label: 'Sunset Match Master', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
  { id: 'pro_3', label: 'Urbiztondo Court Champ', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
];

export const PlayerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, players, games, updateProfile, showToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // If no ID, viewing own profile
  const isOwnProfile = !id || (currentUser && currentUser.id === id);
  const player = isOwnProfile
    ? currentUser
    : players.find((p) => p.id === id) || players[0];

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player?.name || '');
  const [editBio, setEditBio] = useState(player?.bio || '');
  const [editPaddle, setEditPaddle] = useState(player?.favoritePaddle || '');
  const [editCourt, setEditCourt] = useState(player?.favoriteCourt || '');
  const [editAvatar, setEditAvatar] = useState(player?.avatar || elyuPlayerAvatar1);

  if (!player) {
    return <div className="p-8 text-center text-slate-400">Player not found.</div>;
  }

  const userGames = games.filter(
    (g) => g.host.id === player.id || g.participants.some((pt) => pt.player.id === player.id)
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const newAvatar = reader.result;
        setEditAvatar(newAvatar);
        updateProfile({ avatar: newAvatar });
        showToast('Photo Updated 📸', 'Your new profile picture has been saved.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      bio: editBio,
      favoritePaddle: editPaddle,
      favoriteCourt: editCourt,
      avatar: editAvatar,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Hidden File Input for Direct Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Cover Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-900 shadow-xl">
        <div className="h-44 sm:h-56 bg-gradient-to-r from-slate-900 via-slate-800 to-lime-950 p-6 relative flex items-end">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {isOwnProfile && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white font-extrabold text-xs hover:bg-slate-900 transition-colors inline-flex items-center gap-1.5 border border-slate-700 shadow-lg"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Card Header Info */}
        <div className="px-6 pb-6 pt-0 relative -mt-12 sm:-mt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="relative group">
              <Avatar
                src={isEditing ? editAvatar : player.avatar}
                alt={player.name}
                size="xl"
                isOnline={player.isOnline}
              />
              {isOwnProfile && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-slate-950/60 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs border-2 border-dashed border-lime-400 cursor-pointer"
                  title="Click to upload profile photo"
                >
                  <Camera className="w-6 h-6 text-lime-400 mb-0.5" />
                  <span className="text-[10px] font-black uppercase">Change</span>
                </button>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-display">{player.name}</h1>
                {player.badge && <Badge variant="amber">{player.badge}</Badge>}
              </div>

              <p className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-lime-400" />
                <span>{player.location}</span>
                <span>•</span>
                <span className="text-lime-400 font-bold">{player.skillLevel}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-white">
            <div className="text-right">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Official DUPR</span>
              <span className="text-2xl font-black text-lime-400 font-mono">{player.duprRating.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Form vs Content */}
      {isEditing ? (
        <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-extrabold text-white">Edit Your Pickleball Profile</h3>
            <span className="text-xs font-semibold text-lime-400">Reclub Verified Member</span>
          </div>

          {/* Profile Photo Selector Section */}
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
              Profile Photo
            </label>

            {/* Quick Upload Button & Presets */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-lime-400 text-xs font-extrabold inline-flex items-center gap-2 border border-slate-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload From Device</span>
              </button>

              <span className="text-xs text-slate-400 font-medium">or pick a preset:</span>

              <div className="flex flex-wrap items-center gap-2">
                {PRESET_AVATARS.map((preset) => {
                  const isSelected = editAvatar === preset.url;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setEditAvatar(preset.url)}
                      className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-all ${
                        isSelected ? 'border-lime-400 scale-110 shadow-lg shadow-lime-400/20' : 'border-slate-700 opacity-70 hover:opacity-100'
                      }`}
                      title={preset.label}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute inset-0 bg-lime-400/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-slate-950 font-black stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Image URL input option */}
            <div className="pt-2">
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Image URL</label>
              <input
                type="url"
                value={editAvatar}
                onChange={(e) => setEditAvatar(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 focus:border-lime-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Display Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white focus:border-lime-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Player Bio</label>
            <textarea
              rows={3}
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-white focus:border-lime-400 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Favorite Paddle</label>
              <input
                type="text"
                value={editPaddle}
                onChange={(e) => setEditPaddle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white focus:border-lime-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Favorite Court</label>
              <input
                type="text"
                value={editCourt}
                onChange={(e) => setEditCourt(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white focus:border-lime-400 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-xs hover:bg-lime-300 transition-colors shadow-lg">
              Save Profile Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        /* Stats Summary Grid */
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs text-center space-y-1">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Games Played</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{player.gamesPlayed}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs text-center space-y-1">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Games Hosted</span>
            <span className="text-2xl font-black text-lime-600 dark:text-lime-400 font-mono">{player.gamesHosted}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs text-center space-y-1">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Win Rate</span>
            <span className="text-2xl font-black text-emerald-500 font-mono">{player.winRate}%</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs text-center space-y-1">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preferred Format</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white mt-1 block">{player.preferredFormat}</span>
          </div>
        </div>
      )}

      {/* Bio & Gear Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Player Bio & Playstyle</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "{player.bio}"
            </p>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Primary Playstyle</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{player.playStyle || 'Kitchen Dinker & Resetter'}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Court Side Preference</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{player.sidePreference || 'Both Sides'}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Favorite Paddle</span>
                <span className="text-xs font-bold text-lime-600 dark:text-lime-400 mt-0.5 block">{player.favoritePaddle}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Favorite Court</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{player.favoriteCourt}</span>
              </div>
            </div>
          </div>

          {/* Player Game History */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
              {player.name}'s Games ({userGames.length})
            </h3>
            {userGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No public games found for this player.</p>
            )}
          </div>
        </div>

        {/* Sidebar Schedule */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Playing Availability</h4>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-lime-500 shrink-0" />
              <span>{player.availability}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
