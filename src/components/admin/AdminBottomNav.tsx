import React from 'react';
import { LayoutGrid, ClipboardList, Truck, Wallet } from 'lucide-react';
import { ScreenType } from '../../types';

interface AdminBottomNavProps {
  activeScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  dispatchBadgeCount?: number;
}

export const AdminBottomNav: React.FC<AdminBottomNavProps> = ({
  activeScreen,
  onSelectScreen,
  dispatchBadgeCount = 5,
}) => {
  return (
    <nav 
      aria-label="Admin Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 flex items-center justify-around shadow-lg transition-all"
    >
      {/* 1. Overview */}
      <button
        onClick={() => onSelectScreen('admin_overview')}
        className={`flex flex-col items-center gap-0.5 transition-all active:scale-95 px-3 py-1 ${
          activeScreen === 'admin_overview' ? 'text-[#006C4A] font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <span className={`flex items-center justify-center w-10 h-7 rounded-full transition ${
          activeScreen === 'admin_overview' ? 'text-[#006C4A]' : 'text-slate-500'
        }`}>
          <LayoutGrid className="w-5 h-5 stroke-[2.2]" />
        </span>
        <span className="text-[11px] tracking-tight">Overview</span>
      </button>

      {/* 2. Jobs */}
      <button
        onClick={() => onSelectScreen('admin_jobs')}
        className={`flex flex-col items-center gap-0.5 transition-all active:scale-95 px-3 py-1 ${
          activeScreen === 'admin_jobs' ? 'text-[#006C4A] font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <span className={`flex items-center justify-center w-10 h-7 rounded-full transition ${
          activeScreen === 'admin_jobs' ? 'text-[#006C4A]' : 'text-slate-500'
        }`}>
          <ClipboardList className="w-5 h-5 stroke-[2.2]" />
        </span>
        <span className="text-[11px] tracking-tight">Jobs</span>
      </button>

      {/* 3. Dispatch */}
      <button
        onClick={() => onSelectScreen('admin_dispatch')}
        className={`flex flex-col items-center gap-0.5 transition-all active:scale-95 px-3 py-1 relative ${
          activeScreen === 'admin_dispatch' ? 'text-[#006C4A] font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <span className={`relative flex items-center justify-center w-10 h-7 rounded-full transition ${
          activeScreen === 'admin_dispatch' ? 'text-[#006C4A]' : 'text-slate-500'
        }`}>
          <Truck className="w-5 h-5 stroke-[2.2]" />
          {dispatchBadgeCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-[#DC2626] text-white text-[9px] font-bold rounded-full ring-2 ring-white flex items-center justify-center">
              {dispatchBadgeCount}
            </span>
          )}
        </span>
        <span className="text-[11px] tracking-tight">Dispatch</span>
      </button>

      {/* 4. Earnings */}
      <button
        onClick={() => onSelectScreen('admin_earnings')}
        className={`flex flex-col items-center gap-0.5 transition-all active:scale-95 px-3 py-1 ${
          activeScreen === 'admin_earnings' ? 'text-[#006C4A] font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <span className={`flex items-center justify-center w-10 h-7 rounded-full transition ${
          activeScreen === 'admin_earnings' ? 'text-[#006C4A]' : 'text-slate-500'
        }`}>
          <Wallet className="w-5 h-5 stroke-[2.2]" />
        </span>
        <span className="text-[11px] tracking-tight">Earnings</span>
      </button>
    </nav>
  );
};
