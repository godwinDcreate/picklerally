import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CourtCard } from '../components/courts/CourtCard';
import { MapView } from '../components/common/MapView';
import {
  MapPin,
  Search,
  Grid,
  Map,
  Sun,
  Home,
  Zap,
  Sparkles
} from 'lucide-react';

export const CourtsPage: React.FC = () => {
  const navigate = useNavigate();
  const { courts } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [indoorOutdoorFilter, setIndoorOutdoorFilter] = useState('all');
  const [lightedOnly, setLightedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filteredCourts = courts.filter((court) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = court.name.toLowerCase().includes(q);
      const matchCity = court.city.toLowerCase().includes(q);
      const matchAddress = court.address.toLowerCase().includes(q);
      if (!matchName && !matchCity && !matchAddress) return false;
    }

    if (indoorOutdoorFilter !== 'all') {
      if (court.indoorOutdoor !== indoorOutdoorFilter) return false;
    }

    if (lightedOnly && !court.hasLights) return false;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-lime-600 dark:text-lime-400 uppercase tracking-widest mb-1">
            <MapPin className="w-4 h-4" />
            <span>Court Discovery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Find Pickleball Courts
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Discover {filteredCourts.length} dedicated pickleball facilities in La Union, Philippines
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              viewMode === 'map'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Interactive Map</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search court name, address, or city..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={indoorOutdoorFilter}
            onChange={(e) => setIndoorOutdoorFilter(e.target.value)}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="all">Indoor & Outdoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Indoor">Indoor</option>
            <option value="Covered">Covered</option>
          </select>

          <label className="inline-flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
            <input
              type="checkbox"
              checked={lightedOnly}
              onChange={(e) => setLightedOnly(e.target.checked)}
              className="rounded text-lime-500 focus:ring-lime-400 w-4 h-4"
            />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
              Night Lights Only
            </span>
          </label>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'map' ? (
        <MapView courts={filteredCourts} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>
      )}
    </div>
  );
};
