import React, { useState } from 'react';
import { 
  Building2, ChevronDown, Bell, ShieldCheck, Check, 
  MapPin, LogOut, Users, FileText
} from 'lucide-react';
import { CooperativeProfile } from '../../types';

interface AdminHeaderProps {
  profile: CooperativeProfile;
  unreadCount?: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenRoster?: () => void;
  onOpenPools?: () => void;
  onSwitchToWorker?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  profile,
  unreadCount = 3,
  onOpenNotifications,
  onOpenProfile,
  onOpenRoster,
  onOpenPools,
  onSwitchToWorker,
}) => {
  const [showSocietyMenu, setShowSocietyMenu] = useState(false);
  const [selectedSociety, setSelectedSociety] = useState('Green Glen Greens, BLR');

  const societies = [
    'Green Glen Greens, BLR',
    'Prestige Falcon City, BLR',
    'Sobha Dream Acres, BLR',
    'Bellandur Sector Hub, BLR',
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90 shadow-xs px-4 py-2.5">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {/* Left: NetNivas Pro Logo & Society Dropdown */}
        <div className="flex items-center gap-2.5">
          {/* Green App Icon */}
          <div className="w-9 h-9 rounded-xl bg-[#006C4A] text-white flex items-center justify-center shadow-xs">
            <Building2 className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[17px] font-bold tracking-tight text-slate-900 leading-tight">
                NetNivas Pro
              </span>
              <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
                Coop Admin
              </span>
            </div>

            {/* Society Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSocietyMenu(prev => !prev)}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium transition"
              >
                <span>{selectedSociety}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showSocietyMenu && (
                <div className="absolute left-0 top-6 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Operating Society
                  </div>
                  {societies.map(soc => (
                    <button
                      key={soc}
                      onClick={() => {
                        setSelectedSociety(soc);
                        setShowSocietyMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                        selectedSociety === soc ? 'text-[#006C4A] font-bold bg-emerald-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span className="truncate">{soc}</span>
                      {selectedSociety === soc && <Check className="w-3.5 h-3.5 text-[#006C4A]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Notification Bell & Profile Avatar */}
        <div className="flex items-center gap-2">
          {/* Notifications Button */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full text-slate-700 hover:bg-slate-100 transition active:scale-95"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#DC2626] rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Manager Avatar Badge */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center transition active:scale-95 shadow-2xs"
            title="Cooperative Admin Profile"
          >
            {profile.managerInitials}
          </button>
        </div>
      </div>
    </header>
  );
};
