import React from 'react';
import { Home, ClipboardList, Calendar, Wallet, User } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavigationProps {
  activeScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  pendingCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeScreen,
  onSelectScreen,
  pendingCount = 3,
}) => {
  return (
    <nav 
      aria-label="Bottom Navigation" 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 sm:px-6 py-2 flex items-center justify-around shadow-lg transition-all"
    >
      {/* 1. Home */}
      <button 
        onClick={() => onSelectScreen('home')}
        className={`flex flex-col items-center gap-1 transition-all active:scale-95 px-3 py-1 ${
          activeScreen === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <span className={`flex items-center justify-center w-10 h-7 rounded-full transition ${
          activeScreen === 'home' ? 'bg-emerald-100 text-emerald-700 shadow-xs' : ''
        }`}>
          <Home className="w-5 h-5" />
        </span>
        <span className="text-[10px] tracking-tight">Home</span>
      </button>

      {/* 2. Requests */}
      <button 
        onClick={() => onSelectScreen('requests')}
        className={`flex flex-col items-center gap-1 transition-all active:scale-95 px-3 py-1 relative ${
          activeScreen === 'requests' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <span className={`relative flex items-center justify-center w-10 h-7 rounded-full transition ${
          activeScreen === 'requests' ? 'bg-emerald-100 text-emerald-700 shadow-xs' : ''
        }`}>
          <ClipboardList className="w-5 h-5" />
          {pendingCount > 0 && (
            <span className="absolute -top-1 right-0.5 min-w-4 h-4 px-1 bg-amber-500 text-white text-[9px] font-bold rounded-full ring-2 ring-white flex items-center justify-center animate-pulse">
              {pendingCount}
            </span>
          )}
        </span>
        <span className="text-[10px] tracking-tight">Requests</span>
      </button>

      {/* 3. Schedule */}
      <button 
        onClick={() => onSelectScreen('schedule')}
        className={`flex flex-col items-center gap-1 transition-all active:scale-95 px-3 py-1 ${
          activeScreen === 'schedule' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <span className={`flex items-center justify-center w-10 h-7 rounded-full transition ${
          activeScreen === 'schedule' ? 'bg-emerald-100 text-emerald-700 shadow-xs' : ''
        }`}>
          <Calendar className="w-5 h-5" />
        </span>
        <span className="text-[10px] tracking-tight">Schedule</span>
      </button>

      {/* 4. Earnings */}
      <button 
        onClick={() => onSelectScreen('earnings')}
        className={`flex flex-col items-center gap-1 transition-all active:scale-95 px-3 py-1 ${
          activeScreen === 'earnings' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <span className={`flex items-center justify-center w-10 h-7 rounded-full transition ${
          activeScreen === 'earnings' ? 'bg-emerald-100 text-emerald-700 shadow-xs' : ''
        }`}>
          <Wallet className="w-5 h-5" />
        </span>
        <span className="text-[10px] tracking-tight">Earnings</span>
      </button>

      {/* 5. Profile */}
      <button 
        onClick={() => onSelectScreen('profile')}
        className={`flex flex-col items-center gap-1 transition-all active:scale-95 px-3 py-1 ${
          activeScreen === 'profile' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <span className={`flex items-center justify-center w-10 h-7 rounded-full transition ${
          activeScreen === 'profile' ? 'bg-emerald-100 text-emerald-700 shadow-xs' : ''
        }`}>
          <User className="w-5 h-5" />
        </span>
        <span className="text-[10px] tracking-tight">Profile</span>
      </button>
    </nav>
  );
};
