import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Avatar } from './Avatar';
import {
  PlusCircle,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Games', path: '/games' },
    { name: 'Courts', path: '/courts' },
    { name: 'Players', path: '/players' },
    { name: 'Community', path: '/community' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A] border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-[#D9FD16] p-0.5 shadow-lg shadow-[#D9FD16]/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                {/* SVG Pickleball Paddle + Ball Icon */}
                <svg className="w-5 h-5 text-[#D9FD16]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V19c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 10c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
                  <circle cx="10" cy="8" r="0.75" fill="#0F172A" />
                  <circle cx="14" cy="8" r="0.75" fill="#0F172A" />
                  <circle cx="12" cy="10" r="0.75" fill="#0F172A" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-white font-display">
                  Pickle<span className="text-[#D9FD16]">Rally</span>
                </span>
                <span className="bg-[#D9FD16] text-[#0F172A] text-[10px] font-black px-1.5 py-0.2 rounded uppercase tracking-widest hidden sm:inline-block">
                  DUPR
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all ${
                    active
                      ? 'text-[#D9FD16] bg-slate-800/80 border-b-2 border-[#D9FD16]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions & User Menu */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/create-game')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D9FD16] text-[#0F172A] font-extrabold text-sm shadow-md hover:bg-[#cbf013] active:scale-98 transition-all"
            >
              <PlusCircle className="w-4 h-4 text-[#0F172A] stroke-[2.5]" />
              <span>Create Game</span>
            </button>

            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800 transition-colors border border-slate-800"
                >
                  <Avatar
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    size="sm"
                    duprRating={currentUser.duprRating}
                  />
                  <div className="text-left hidden lg:block pr-1">
                    <p className="text-xs font-bold text-slate-100 leading-tight">{currentUser.name}</p>
                    <p className="text-[10px] font-medium text-lime-400">{currentUser.skillLevel}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 hidden lg:block" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-800">
                      <p className="text-xs font-bold text-slate-200">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <div className="mt-2 flex items-center justify-between text-[11px] bg-slate-800/80 px-2.5 py-1 rounded-lg">
                        <span className="text-slate-400">DUPR Rating</span>
                        <span className="font-extrabold text-lime-400">{currentUser.duprRating.toFixed(2)}</span>
                      </div>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-lime-400 transition-colors"
                    >
                      <User className="w-4 h-4 text-lime-400" />
                      Dashboard & Games
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-lime-400 transition-colors"
                    >
                      <User className="w-4 h-4 text-emerald-400" />
                      My Player Profile
                    </Link>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors border-t border-slate-800 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => navigate('/create-game')}
              className="p-2 rounded-xl bg-lime-400 text-slate-950 font-bold"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-bold ${
                isActive(link.path) ? 'bg-lime-400/10 text-lime-400' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl bg-slate-900 text-slate-200 text-sm font-bold"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  navigate('/');
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-rose-400 text-sm font-bold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-800 flex gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-3 rounded-xl bg-slate-900 text-white font-bold text-sm"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-3 rounded-xl bg-lime-400 text-slate-950 font-extrabold text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
