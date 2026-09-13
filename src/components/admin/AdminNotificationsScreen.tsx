import React, { useState } from 'react';
import { 
  ArrowLeft, Check, ListFilter, AlertCircle, 
  ShieldAlert, CheckCircle2, Clock, Users, ArrowRight 
} from 'lucide-react';
import { AdminNotification } from '../../types';

interface AdminNotificationsScreenProps {
  notifications: AdminNotification[];
  onBack: () => void;
  onActionClick: (notif: AdminNotification) => void;
  onMarkAllRead: () => void;
}

export const AdminNotificationsScreen: React.FC<AdminNotificationsScreenProps> = ({
  notifications,
  onBack,
  onActionClick,
  onMarkAllRead,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'urgent' | 'jobs' | 'dispatch' | 'gate_pass'>('all');

  const filteredNotifs = notifications.filter(n => {
    if (activeFilter === 'urgent') return n.type === 'urgent' || n.isUrgent;
    if (activeFilter === 'jobs') return n.type === 'jobs';
    if (activeFilter === 'dispatch') return n.type === 'dispatch';
    if (activeFilter === 'gate_pass') return n.type === 'gate_pass';
    return true; // 'all'
  });

  return (
    <div className="max-w-xl mx-auto w-full px-4 pt-3 pb-24 space-y-4 font-sans text-[#191C1D]">
      {/* 1. Top Header */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-slate-100 transition active:scale-95 text-slate-700"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Notifications
          </h1>
          {/* Urgent Badge Pill */}
          <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-[#DC2626] text-xs font-bold">
            3 urgent
          </span>
        </div>

        {/* Right Icons: Checkmark & Filter */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMarkAllRead}
            className="p-2 rounded-full hover:bg-slate-100 transition text-slate-600"
            title="Mark all as read"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-slate-100 transition text-slate-600"
            title="Filter notifications"
          >
            <ListFilter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'all'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All (18)
        </button>

        <button
          onClick={() => setActiveFilter('urgent')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
            activeFilter === 'urgent'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
          <span>Urgent (3)</span>
        </button>

        <button
          onClick={() => setActiveFilter('jobs')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'jobs'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Jobs (8)
        </button>

        <button
          onClick={() => setActiveFilter('dispatch')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'dispatch'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Dispatch (4)
        </button>

        <button
          onClick={() => setActiveFilter('gate_pass')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'gate_pass'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Gate Pass (3)
        </button>
      </div>

      {/* 3. Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-slate-300 transition flex items-center justify-between gap-3"
          >
            {/* Left: Indicator dot + Content */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Dot */}
              <div className="pt-1.5 shrink-0">
                {item.type === 'urgent' ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] block"></span>
                ) : item.type === 'gate_pass' ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] block"></span>
                ) : item.type === 'jobs' ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006C4A] block"></span>
                ) : item.type === 'dispatch' ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006C4A] block"></span>
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 block"></span>
                )}
              </div>

              {/* Text info */}
              <div className="min-w-0 space-y-0.5">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 flex-wrap">
                  <span className="truncate">{item.title}</span>
                  <span className="text-slate-400 font-normal text-[11px]">· {item.timeAgo}</span>
                </div>
                <div className="text-xs text-slate-600 truncate">
                  {item.subtitle}
                </div>
              </div>
            </div>

            {/* Right: Action Button */}
            {item.actionType === 'assign' ? (
              <button
                type="button"
                onClick={() => onActionClick(item)}
                className="px-4 py-1.5 bg-[#006C4A] hover:bg-[#00573B] text-white text-xs font-bold rounded-lg shadow-2xs transition active:scale-95 shrink-0"
              >
                Assign
              </button>
            ) : item.actionType === 'renew' ? (
              <button
                type="button"
                onClick={() => onActionClick(item)}
                className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-lg shadow-2xs transition active:scale-95 shrink-0"
              >
                Renew
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onActionClick(item)}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition active:scale-95 shrink-0"
              >
                View
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
