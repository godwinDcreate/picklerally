import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { MOCK_LOCAL_EVENTS } from '../data/mockData';
import { ReclubClubsSection } from '../components/common/ReclubClubsSection';
import {
  MessageSquare,
  ThumbsUp,
  PlusCircle,
  Trophy,
  Calendar,
  Sparkles,
  Send,
  Users,
  Award,
  Flame,
  Tag
} from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { communityPosts, addCommunityPost, toggleLikePost, currentUser, showToast } = useApp();

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<'Partner Search' | 'Gear Discussion' | 'Court Update' | 'Strategy & Tips' | 'General'>('Partner Search');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) {
      showToast('Missing Fields', 'Please fill out both title and content.', 'error');
      return;
    }

    addCommunityPost({
      title: postTitle.trim(),
      content: postContent.trim(),
      category: postCategory,
      tags: [postCategory.replace(/\s+/g, ''), 'PickleballAustin']
    });

    setPostTitle('');
    setPostContent('');
    setPostModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Pickleball Community</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Local Pickleball Community
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Connect with local players, find tournament partners, review paddles, and share court news.
          </p>
        </div>

        <button
          onClick={() => setPostModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-extrabold text-xs shadow-md transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          <span>New Community Post</span>
        </button>
      </div>

      {/* Authoritative Reclub Real Clubs Showcase */}
      <ReclubClubsSection />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Discussion Posts Feed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-lime-500" />
              <span>Trending Discussions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {communityPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs hover:border-lime-500/50 transition-all space-y-4"
              >
                {/* Author Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={post.author.avatar}
                      alt={post.author.name}
                      size="md"
                      duprRating={post.author.duprRating}
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{post.author.name}</h4>
                      <p className="text-[10px] text-slate-400">
                        {post.author.skillLevel} • {post.createdAt}
                      </p>
                    </div>
                  </div>

                  <Badge variant="emerald">{post.category}</Badge>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Tags */}
                {post.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-lime-600 dark:text-lime-400 bg-lime-500/10 px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions (Like & Comments) */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <button
                    onClick={() => toggleLikePost(post.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-colors ${
                      post.isLiked
                        ? 'bg-rose-500/10 text-rose-500'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likesCount} Likes</span>
                  </button>

                  <span className="flex items-center gap-1 font-medium">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {post.commentsCount} Comments
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Events & Leaderboards */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Events Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Local Round Robins & Events</span>
            </h3>

            <div className="space-y-4">
              {MOCK_LOCAL_EVENTS.map((event) => (
                <div key={event.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">
                    {event.skillLevels}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                    {event.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-lime-500" />
                    {event.date}
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="font-extrabold text-lime-600 dark:text-lime-400">{event.entryFee}</span>
                    <span className="text-slate-400 font-bold">{event.attendeesCount}/{event.maxAttendees} Attending</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Create Community Post</h3>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category</label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white"
                >
                  <option value="Partner Search">Partner Search</option>
                  <option value="Gear Discussion">Gear Discussion</option>
                  <option value="Court Update">Court Update</option>
                  <option value="Strategy & Tips">Strategy & Tips</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Post Title</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Looking for a 4.0 Women's Doubles Partner for Austin PPA..."
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Content</label>
                <textarea
                  rows={4}
                  required
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share details, court locations, gear feelings, or tips..."
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPostModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-lime-400 text-slate-950 text-xs font-extrabold"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
