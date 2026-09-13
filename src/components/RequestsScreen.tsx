import React, { useState } from 'react';
import { 
  Bell, Search, ArrowRight, User, MapPin, Calendar, 
  Check, X, Zap, Clock, ShieldCheck, ChevronRight
} from 'lucide-react';
import { ServiceRequest, ScreenType } from '../types';

interface RequestsScreenProps {
  requests: ServiceRequest[];
  onAcceptRequest: (id: string) => void;
  onDeclineRequest: (id: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const RequestsScreen: React.FC<RequestsScreenProps> = ({
  requests,
  onAcceptRequest,
  onDeclineRequest,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'new' | 'accepted' | 'in_progress' | 'completed'>('new');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter requests based on tab and search
  const filteredRequests = requests.filter(req => {
    const matchesTab = req.status === activeTab;
    const matchesSearch = 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const newCount = requests.filter(r => r.status === 'new').length;
  const acceptedCount = requests.filter(r => r.status === 'accepted').length;
  const inProgressCount = requests.filter(r => r.status === 'in_progress').length;
  const completedCount = requests.filter(r => r.status === 'completed').length;

  const pendingValueTotal = requests
    .filter(r => r.status === 'new')
    .reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col pb-28">
      {/* BEGIN: TopBar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 pt-3.5 pb-3 px-4 sm:px-6 shadow-xs">
        <div className="flex items-center justify-between max-w-xl mx-auto w-full">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-bold text-base shadow-sm shadow-emerald-500/30">
              NN
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 block leading-none">
                Net Nivas
              </span>
              <h1 className="text-base font-bold text-slate-900 leading-tight">Service Requests</h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onNavigate('home')}
              aria-label="Notifications" 
              className="relative p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 active:scale-95 transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </button>
            <div className="flex items-center bg-emerald-50 border border-emerald-200/60 rounded-full px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              Online
            </div>
          </div>
        </div>
      </header>
      {/* END: TopBar */}

      {/* Main Container */}
      <main className="max-w-xl mx-auto w-full px-4 sm:px-5 pt-3 flex-1 flex flex-col">
        {/* BEGIN: SearchAndFilters */}
        <section className="pb-1">
          {/* Search Input */}
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition placeholder-slate-400 shadow-xs" 
              placeholder="Search orders, clients, or locations..." 
              type="text" 
            />
          </div>

          {/* Horizontal Tabs / Status Carousel */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 text-xs font-semibold">
            <button 
              onClick={() => setActiveTab('new')}
              className={`px-3.5 py-1.5 rounded-full shadow-xs shrink-0 flex items-center space-x-1.5 transition ${
                activeTab === 'new' 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>New Requests</span>
              {newCount > 0 && (
                <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {newCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab('accepted')}
              className={`px-3.5 py-1.5 rounded-full shrink-0 transition flex items-center gap-1.5 ${
                activeTab === 'accepted' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>Accepted ({acceptedCount})</span>
            </button>

            <button 
              onClick={() => setActiveTab('in_progress')}
              className={`px-3.5 py-1.5 rounded-full shrink-0 transition flex items-center gap-1.5 ${
                activeTab === 'in_progress' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>In Progress ({inProgressCount})</span>
            </button>

            <button 
              onClick={() => setActiveTab('completed')}
              className={`px-3.5 py-1.5 rounded-full shrink-0 transition flex items-center gap-1.5 ${
                activeTab === 'completed' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>Completed ({completedCount})</span>
            </button>
          </div>
        </section>
        {/* END: SearchAndFilters */}

        {/* BEGIN: QuickStatsOverview */}
        <section className="py-2">
          <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="text-center border-r border-slate-100">
              <span className="text-[10px] text-slate-500 block font-medium">Pending Value</span>
              <span className="text-sm font-bold text-slate-900 leading-tight font-manrope">
                ₹{pendingValueTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-center border-r border-slate-100">
              <span className="text-[10px] text-slate-500 block font-medium">Accept Rate</span>
              <span className="text-sm font-bold text-emerald-700 leading-tight font-manrope">96%</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-slate-500 block font-medium">Avg Response</span>
              <span className="text-sm font-bold text-slate-900 leading-tight font-manrope">8 mins</span>
            </div>
          </div>
        </section>
        {/* END: QuickStatsOverview */}

        {/* BEGIN: RequestCardList */}
        <div className="py-2 space-y-3.5 flex-1">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No requests in this tab</h3>
              <p className="text-xs text-slate-500 mt-1">
                {searchQuery ? 'Try matching another search keyword.' : 'All pending service requests for this section are reviewed.'}
              </p>
              <button 
                onClick={() => { setActiveTab('new'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700 transition"
              >
                View New Requests
              </button>
            </div>
          ) : (
            filteredRequests.map(req => {
              const isUrgent = req.isUrgent;

              return (
                <article 
                  key={req.id} 
                  className={`bg-white rounded-2xl border shadow-xs overflow-hidden hover:shadow-md transition-all ${
                    isUrgent ? 'border-amber-200/90' : 'border-slate-200/90'
                  }`}
                >
                  {/* Card Top Bar: Urgency or Age */}
                  {isUrgent ? (
                    <div className="bg-amber-50/80 px-4 py-2 border-b border-amber-100 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1.5 font-medium text-amber-800">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        <span className="font-bold tracking-wide text-[11px]">URGENT DISPATCH</span>
                      </div>
                      <span className="text-slate-500 text-[11px] font-medium">Expires in {req.expiresInMinutes || 12}m</span>
                    </div>
                  ) : (
                    <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium text-[11px]">Standard Request</span>
                      <span className="text-slate-400 text-[11px]">{req.requestedAgo || 'Requested recently'}</span>
                    </div>
                  )}

                  <div className="p-4">
                    {/* Header and Pricing */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-1.5">
                          {req.category}
                        </span>
                        <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{req.title}</h2>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">
                          Order #{req.orderNumber} • {req.serviceType}
                        </p>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="text-base font-extrabold text-slate-900 font-manrope">
                          ₹{req.price.toLocaleString('en-IN')}
                        </span>
                        <span className={`text-[10px] block font-semibold ${isUrgent ? 'text-emerald-700 font-mono' : 'text-slate-500'}`}>
                          {req.priceNote}
                        </span>
                      </div>
                    </div>

                    {/* Client & Location Info */}
                    <div className="mt-3.5 bg-slate-50 rounded-xl p-3 space-y-2 border border-slate-100 text-xs">
                      <div className="flex items-center text-slate-700">
                        <User className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-900">{req.clientName}</span>
                        <span className="mx-1.5 text-slate-300">•</span>
                        <span className="text-amber-500 font-bold flex items-center">
                          ★ {req.clientRating}
                        </span>
                      </div>
                      <div className="flex items-start text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{req.location} ({req.distance})</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Clock className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                        <span>Slot: <strong className="text-slate-800 font-semibold">{req.timeSlot}</strong></span>
                      </div>
                    </div>

                    {/* Tags List */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {req.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons for New Requests */}
                    {req.status === 'new' && (
                      <div className="mt-4 grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                        <button 
                          onClick={() => onDeclineRequest(req.id)}
                          className="w-full py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 active:scale-95 transition"
                        >
                          Decline
                        </button>
                        <button 
                          onClick={() => onAcceptRequest(req.id)}
                          className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 active:scale-95 shadow-xs shadow-emerald-600/30 transition flex items-center justify-center space-x-1"
                        >
                          <span>Accept Job</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Action for Accepted Requests */}
                    {req.status === 'accepted' && (
                      <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-4 h-4" /> Ready for dispatch
                        </span>
                        <button 
                          onClick={() => onNavigate('home')}
                          className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition"
                        >
                          View in Schedule
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};
