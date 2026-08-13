import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  RotateCcw,
  Sun,
  Trophy,
  Users,
  Sparkles
} from 'lucide-react';

export const GameFilters: React.FC = () => {
  const { filters, setFilters, resetFilters } = useApp();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Top Search bar + Reset */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Search game title, court name, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={resetFilters}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Filter Row Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
        {/* Date Filter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Date
          </label>
          <select
            value={filters.dateFilter}
            onChange={(e) => setFilters((prev) => ({ ...prev, dateFilter: e.target.value as any }))}
            className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="all">Any Date</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="weekend">This Weekend</option>
          </select>
        </div>

        {/* Skill Level */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Skill Level
          </label>
          <select
            value={filters.skillLevel}
            onChange={(e) => setFilters((prev) => ({ ...prev, skillLevel: e.target.value }))}
            className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner (2.0-2.5)</option>
            <option value="Advanced Beginner">Adv. Beginner (3.0)</option>
            <option value="Intermediate">Intermediate (3.5)</option>
            <option value="Advanced">Advanced (4.0-4.5)</option>
            <option value="Competitive">Competitive (5.0+)</option>
          </select>
        </div>

        {/* Game Format */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Format
          </label>
          <select
            value={filters.gameFormat}
            onChange={(e) => setFilters((prev) => ({ ...prev, gameFormat: e.target.value }))}
            className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="all">All Formats</option>
            <option value="Doubles">Doubles</option>
            <option value="Singles">Singles</option>
            <option value="Open Play">Open Play</option>
            <option value="King of the Court">King of the Court</option>
          </select>
        </div>

        {/* Game Type */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Game Type
          </label>
          <select
            value={filters.gameType}
            onChange={(e) => setFilters((prev) => ({ ...prev, gameType: e.target.value }))}
            className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="all">All Types</option>
            <option value="Casual">Casual</option>
            <option value="Competitive">Competitive</option>
            <option value="Beginner Friendly">Beginner Friendly</option>
            <option value="Open Play">Open Play</option>
          </select>
        </div>

        {/* Indoor/Outdoor */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Venue
          </label>
          <select
            value={filters.indoorOutdoor}
            onChange={(e) => setFilters((prev) => ({ ...prev, indoorOutdoor: e.target.value }))}
            className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="all">Indoor & Outdoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Indoor">Indoor</option>
            <option value="Covered">Covered</option>
          </select>
        </div>

        {/* Open Spots Only Toggle */}
        <div className="flex flex-col justify-end">
          <label className="inline-flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <input
              type="checkbox"
              checked={filters.onlyAvailableSpots}
              onChange={(e) => setFilters((prev) => ({ ...prev, onlyAvailableSpots: e.target.checked }))}
              className="rounded text-lime-500 focus:ring-lime-400 w-4 h-4"
            />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
              Open Spots Only
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
