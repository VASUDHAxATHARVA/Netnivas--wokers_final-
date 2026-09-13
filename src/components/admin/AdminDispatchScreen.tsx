import React, { useState } from 'react';
import { 
  ArrowLeft, Search, ListFilter, MapPin, ChevronDown, 
  ChevronUp, Phone, Navigation, MoreHorizontal, ShieldCheck, 
  Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { AdminDispatchItem } from '../../types';

interface AdminDispatchScreenProps {
  dispatchItems: AdminDispatchItem[];
  onBack: () => void;
  onAssignItem: (item: AdminDispatchItem) => void;
  onCallTech: (partner: { name: string; phone: string }) => void;
  onLiveRoute: (item: AdminDispatchItem) => void;
}

export const AdminDispatchScreen: React.FC<AdminDispatchScreenProps> = ({
  dispatchItems,
  onBack,
  onAssignItem,
  onCallTech,
  onLiveRoute,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'urgent' | 'pending' | 'in_transit'>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'dsp-1': true, // Card 1 expanded by default per reference Image 4
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredItems = dispatchItems.filter(item => {
    // Search query
    if (searchQuery.trim()) {
      const match = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (item.assignedPartner?.name.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!match) return false;
    }

    if (activeFilter === 'urgent') return item.statusType === 'urgent';
    if (activeFilter === 'pending') return item.statusType === 'pending';
    if (activeFilter === 'in_transit') return item.statusType === 'in_transit';
    return true; // 'all'
  });

  return (
    <div className="max-w-xl mx-auto w-full px-4 pt-3 pb-24 space-y-3 font-sans text-[#191C1D]">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-slate-100 transition active:scale-95 text-slate-700"
            title="Back to Overview"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Dispatch
          </h1>
          {/* Live Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-[#DC2626] text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse"></span>
            <span>5 Live</span>
          </span>
        </div>

        {/* Right Search & Filter Icons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowSearchInput(prev => !prev)}
            className="p-2 rounded-full hover:bg-slate-100 transition text-slate-600"
            title="Search Queue"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-slate-100 transition text-slate-600"
            title="Filter Queue"
          >
            <ListFilter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Input Bar (Expandable) */}
      {showSearchInput && (
        <div className="relative animate-in fade-in">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search tech, job code, or society..."
            className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-600"
          />
        </div>
      )}

      {/* 2. Society Dropdown Pill */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 text-slate-800 text-xs font-semibold border border-slate-200 cursor-pointer hover:bg-slate-200 transition">
          <MapPin className="w-3.5 h-3.5 text-slate-500" />
          <span>Green Glen Greens</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </div>
      </div>

      {/* 3. Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'all'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All (12)
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
          onClick={() => setActiveFilter('pending')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'pending'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Pending (7)
        </button>

        <button
          onClick={() => setActiveFilter('in_transit')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'in_transit'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          In Transit (5)
        </button>
      </div>

      {/* 4. Subheader */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          DISPATCH QUEUE
        </span>
        <span className="text-[11px] text-slate-400">
          updated 2m ago
        </span>
      </div>

      {/* 5. Dispatch Queue List */}
      <div className="space-y-3">
        {filteredItems.map(item => {
          const isExpanded = !!expandedIds[item.id];

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs transition hover:border-slate-300"
            >
              {/* Header row: Status dot + Code */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.statusType === 'urgent' ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span>
                  ) : item.statusType === 'in_transit' ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006C4A]"></span>
                  ) : item.statusType === 'pending' ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  )}
                  <span className="text-xs font-bold text-slate-900">{item.code}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Action Button */}
                  {item.statusType === 'urgent' ? (
                    <button
                      type="button"
                      onClick={() => onAssignItem(item)}
                      className="px-3.5 py-1.5 bg-[#006C4A] hover:bg-[#00573B] text-white text-xs font-bold rounded-lg shadow-2xs transition active:scale-95"
                    >
                      Assign
                    </button>
                  ) : item.statusType === 'in_transit' ? (
                    <button
                      type="button"
                      onClick={() => onLiveRoute(item)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition active:scale-95"
                    >
                      Track
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition active:scale-95"
                    >
                      View
                    </button>
                  )}

                  {/* Accordion Chevron Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Title & Status note */}
              <div className="mt-1">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <div className="text-xs mt-0.5">
                  <span className="text-slate-500">{item.time}</span>
                  <span className="text-slate-300 mx-1.5">·</span>
                  <span className={
                    item.statusType === 'urgent'
                      ? 'text-[#DC2626] font-semibold'
                      : item.statusType === 'in_transit'
                      ? 'text-[#006C4A] font-semibold'
                      : 'text-slate-600 font-medium'
                  }>
                    {item.statusNote}
                  </span>
                </div>
              </div>

              {/* Expanded Details Section */}
              {isExpanded && (
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-3 animate-in fade-in-50">
                  {/* 2x2 Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {/* Assigned Partner */}
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        ASSIGNED PARTNER
                      </div>
                      <div className="font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                        <span>{item.assignedPartner?.name || 'Unassigned'}</span>
                        {item.assignedPartner && (
                          <span className="text-amber-500 font-bold text-[11px]">
                            ★ {item.assignedPartner.rating}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Security Pass */}
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        SECURITY PASS
                      </div>
                      <div className="font-semibold text-[#006C4A] mt-0.5 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{item.securityPass?.status || 'Gate Verified'}</span>
                      </div>
                    </div>

                    {/* ETA Status */}
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        ETA STATUS
                      </div>
                      <div className="font-semibold text-[#006C4A] mt-0.5">
                        {item.etaStatus || 'On Schedule'}
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        LOCATION
                      </div>
                      <div className="font-medium text-slate-800 mt-0.5 truncate" title={item.location}>
                        {item.location}
                      </div>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="flex items-center gap-2 pt-1">
                    {item.assignedPartner && (
                      <button
                        type="button"
                        onClick={() => onCallTech(item.assignedPartner!)}
                        className="flex-1 py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition active:scale-95"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Call Tech</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onLiveRoute(item)}
                      className="flex-1 py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition active:scale-95"
                    >
                      <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Live Route</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl shadow-2xs transition"
                      title="More options"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
