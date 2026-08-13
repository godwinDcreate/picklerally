import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, MapPin, Users, UserCheck } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Games', path: '/games', icon: Trophy },
    { label: 'Courts', path: '/courts', icon: MapPin },
    { label: 'Players', path: '/players', icon: Users },
    { label: 'Profile', path: '/dashboard', icon: UserCheck },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 pb-safe">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
                active ? 'text-lime-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5] text-lime-400 scale-110' : ''}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
              {active && (
                <span className="absolute top-1 w-1 h-1 rounded-full bg-lime-400 shadow-xs shadow-lime-400" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
