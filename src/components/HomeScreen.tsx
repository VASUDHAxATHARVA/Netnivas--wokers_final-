import React, { useState } from 'react';
import { 
  Zap, Bell, ArrowRight, Wallet, CheckCircle2, Star, PieChart,
  Clock, User, MapPin, Phone, ClipboardCheck, ChevronRight,
  ShieldCheck, Leaf, Gift, Sliders, Wrench, Gauge, BatteryCharging,
  AlertTriangle, Check
} from 'lucide-react';
import { VendorProfile, ServiceRequest, NotificationSetting, ScreenType } from '../types';
import { CallModal, CompleteModal } from './Modals';

interface HomeScreenProps {
  profile: VendorProfile;
  setProfile: React.Dispatch<React.SetStateAction<VendorProfile>>;
  onNavigate: (screen: ScreenType) => void;
  notifications: NotificationSetting[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationSetting[]>>;
  activeTask: ServiceRequest;
  onCompleteActiveTask: () => void;
  newRequestsCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  setProfile,
  onNavigate,
  notifications,
  setNotifications,
  activeTask,
  onCompleteActiveTask,
  newRequestsCount,
}) => {
  const [showCallModal, setShowCallModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showNotificationList, setShowNotificationList] = useState(false);

  const toggleOnlineStatus = () => {
    setProfile(prev => ({ ...prev, isOnline: !prev.isOnline }));
  };

  const toggleNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  const activeNotifCount = notifications.filter(n => n.enabled).length;

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased select-none pb-24">
      {/* BEGIN: MainHeader */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-5 pt-4 pb-3.5 flex items-center justify-between shadow-xs">
        {/* Vendor Profile Info */}
        <div 
          onClick={() => onNavigate('profile')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-700 font-bold text-base sm:text-lg shadow-xs group-hover:scale-105 transition-transform">
              NN
            </div>
            {profile.isOnline && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition">
                Net Nivas
              </h1>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Services Provider</p>
          </div>
        </div>

        {/* Power State / Availability Toggle & Notification */}
        <div className="flex items-center gap-2">
          {/* Status Badge & Interactive Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer" title="Toggle Active Online Status">
            <input 
              type="checkbox" 
              checked={profile.isOnline} 
              onChange={toggleOnlineStatus}
              className="sr-only peer" 
              id="vendorStatusToggle" 
            />
            <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
          </label>

          <button 
            onClick={() => setShowNotificationList(!showNotificationList)}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-600 hover:text-slate-900 border border-slate-200 ml-1 relative shadow-xs active:scale-95 transition"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </header>
      {/* END: MainHeader */}

      {/* Notification Dropdown Drawer */}
      {showNotificationList && (
        <div className="mx-4 mt-2 p-3.5 bg-white border border-slate-200 rounded-2xl shadow-lg z-20 text-xs animate-fade-in">
          <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-slate-100">
            <span className="font-bold text-slate-900">Recent Dispatch Alerts</span>
            <button onClick={() => setShowNotificationList(false)} className="text-slate-400 hover:text-slate-600 text-[11px]">
              Dismiss
            </button>
          </div>
          <div className="space-y-2">
            <div className="p-2 bg-emerald-50/70 rounded-xl border border-emerald-100">
              <span className="font-semibold text-emerald-950">High Inverter Demand in Gurugram</span>
              <p className="text-[11px] text-emerald-700 mt-0.5">Surge incentives of +₹200 active across Sector 45-56 until 6 PM.</p>
            </div>
            <div className="p-2 bg-amber-50/70 rounded-xl border border-amber-100">
              <span className="font-semibold text-amber-950">Pending Verification Completed</span>
              <p className="text-[11px] text-amber-800 mt-0.5">Karnataka Inspectorate Class A badge validated for Q3.</p>
            </div>
          </div>
        </div>
      )}

      {/* BEGIN: MainContent */}
      <main className="px-4 sm:px-5 py-4 space-y-5 flex-grow max-w-3xl mx-auto w-full">
        {/* BEGIN: QuickStatusBanner */}
        <div className={`border rounded-2xl p-4 flex items-center justify-between shadow-xs transition-colors ${
          profile.isOnline 
            ? 'bg-emerald-50 border-emerald-200/80 text-emerald-950' 
            : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
              profile.isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
            }`}>
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                {profile.isOnline ? 'Accepting Orders' : 'Offline / On Break'}
              </h2>
              <p className="text-xs text-slate-500">
                {profile.isOnline ? 'High demand in your zone today' : 'Toggle switch on header to resume orders'}
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-white/90 text-emerald-800 border border-emerald-200 shadow-xs">
            {profile.isOnline ? 'Live 8h 15m' : 'Standby'}
          </span>
        </div>

        {/* Pending Requests Alert Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg font-bold">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wide">Pending Requests</h3>
                <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {newRequestsCount} New
                </span>
              </div>
              <p className="text-xs text-amber-900/80 mt-0.5">₹8,400 potential earnings waiting</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('requests')}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1"
          >
            Review <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        {/* END: QuickStatusBanner */}

        {/* BEGIN: MetricsOverview */}
        <section aria-labelledby="metrics-heading">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3" id="metrics-heading">
            Today's Summary
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Metric Card 1: Earnings */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:border-emerald-200 transition">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">Earnings</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
                  <Wallet className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight font-manrope">₹4,850</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
                  <span>↗</span>
                  <span>+18% from yesterday</span>
                </div>
              </div>
            </div>

            {/* Metric Card 2: Jobs Done */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:border-sky-200 transition">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">Jobs Done</span>
                <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight font-manrope">
                  6 <span className="text-xs font-normal text-slate-400">/ 8</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-sky-600 font-medium mt-1">
                  <Clock className="w-3 h-3" />
                  <span>2 scheduled left</span>
                </div>
              </div>
            </div>

            {/* Metric Card 3: Rating */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:border-amber-200 transition">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">Rating</span>
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight font-manrope">4.92</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Based on 148 reviews
                </div>
              </div>
            </div>

            {/* Metric Card 4: Acceptance Rate */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:border-purple-200 transition">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium">Acceptance Rate</span>
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs">
                  <PieChart className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight font-manrope">96%</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Top Performer</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: MetricsOverview */}

        {/* BEGIN: ActiveJobCard */}
        <section aria-labelledby="current-job-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider" id="current-job-heading">
              Current Active Task
            </h2>
            <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              In Progress
            </span>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-emerald-200 inline-block">
                  {activeTask.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">{activeTask.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">Booking ID: #{activeTask.orderNumber}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-emerald-600 font-manrope">
                  ₹{activeTask.price.toLocaleString('en-IN')}
                </span>
                <p className="text-[11px] text-slate-500 font-medium">{activeTask.priceNote}</p>
              </div>
            </div>

            <hr className="border-slate-100 my-3.5" />

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-medium text-slate-900">{activeTask.clientName}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{activeTask.clientPhone || '+91 98765 43210'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-700 leading-snug">{activeTask.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-500">{activeTask.timeSlot}</span>
              </div>
            </div>

            {/* Action Buttons for Current Task */}
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              <button 
                onClick={() => setShowCallModal(true)}
                className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 active:scale-95 transition rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 border border-slate-300 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Call Client
              </button>
              <button 
                onClick={() => setShowCompleteModal(true)}
                className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-xs"
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                Complete Job
              </button>
            </div>
          </div>
        </section>
        {/* END: ActiveJobCard */}

        {/* BEGIN: UpcomingJobsList */}
        <section aria-labelledby="upcoming-jobs-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider" id="upcoming-jobs-heading">
              Upcoming Schedule
            </h2>
            <button 
              onClick={() => onNavigate('schedule')}
              className="text-xs text-emerald-600 font-semibold hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {/* Job Item 1 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:border-slate-300 transition">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900">Electrical Wiring Inspection</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-1.5 py-0.5 rounded font-mono border border-slate-200">
                      04:30 PM
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Preet Vihar, Phase 2 • 3.2 km away</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-emerald-600 font-manrope">₹850</span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500 font-medium">Electrical Diagnostic</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('schedule')}
                className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-700 border border-slate-200 active:scale-95 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Job Item 2 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:border-slate-300 transition">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg mt-0.5">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900">Electrical Panel Replacement</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-1.5 py-0.5 rounded font-mono border border-slate-200">
                      06:00 PM
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Cyber City, Tower B • 6.8 km away</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-emerald-600 font-manrope">₹2,400</span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500 font-medium">Electrical Installation</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('schedule')}
                className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-700 border border-slate-200 active:scale-95 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Job Item 3 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:border-slate-300 transition">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg mt-0.5">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900">Smart Meter Diagnostics</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-1.5 py-0.5 rounded font-mono border border-slate-200">
                      07:30 PM
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Sector 56, DLF Phase 5 • 4.1 km away</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-emerald-600 font-manrope">₹650</span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500 font-medium">IoT & Metering</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onNavigate('schedule')}
                className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-700 border border-slate-200 active:scale-95 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* BEGIN: NotificationPreferences */}
        <section aria-labelledby="notification-prefs-heading">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider" id="notification-prefs-heading">
                Notification Preferences
              </h2>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                {activeNotifCount} Active
              </span>
            </div>
            <button 
              type="button" 
              onClick={() => {
                const allOn = notifications.every(n => n.enabled);
                setNotifications(prev => prev.map(n => ({ ...n, enabled: !allOn })));
              }}
              className="text-xs text-emerald-600 font-semibold hover:underline flex items-center gap-1"
            >
              <Bell className="w-3 h-3" />
              Toggle All
            </button>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Instant sound & dispatch alerts will trigger only for enabled service categories.
            </p>

            <div className="divide-y divide-slate-100">
              {notifications.map(item => {
                let icon = <Zap className="w-4 h-4" />;
                let iconBg = 'bg-emerald-50 text-emerald-600';

                if (item.iconType === 'panel') {
                  icon = <Wrench className="w-4 h-4" />;
                  iconBg = 'bg-blue-50 text-blue-600';
                } else if (item.iconType === 'meter') {
                  icon = <Gauge className="w-4 h-4" />;
                  iconBg = 'bg-purple-50 text-purple-600';
                } else if (item.iconType === 'solar') {
                  icon = <Leaf className="w-4 h-4" />;
                  iconBg = 'bg-emerald-50 text-emerald-600';
                } else if (item.iconType === 'sos') {
                  icon = <AlertTriangle className="w-4 h-4 animate-pulse" />;
                  iconBg = 'bg-amber-100 text-amber-700';
                }

                if (item.isPriority) {
                  return (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between py-2.5 bg-amber-50/60 -mx-4 px-4 rounded-xl mt-1 border border-amber-200/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center text-sm font-bold`}>
                          {icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-amber-950">{item.title}</h4>
                            <span className="text-[9px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.2 rounded-full uppercase">
                              High Priority
                            </span>
                          </div>
                          <p className="text-[10px] text-amber-900/80 font-medium">{item.description}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={item.enabled} 
                          onChange={() => toggleNotification(item.id)}
                          className="sr-only peer" 
                        />
                        <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500 shadow-inner"></div>
                      </label>
                    </div>
                  );
                }

                return (
                  <div key={item.id} className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center text-sm`}>
                        {icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900">{item.title}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{item.description}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={item.enabled} 
                        onChange={() => toggleNotification(item.id)}
                        className="sr-only peer" 
                      />
                      <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BEGIN: WeeklyEarnings */}
        <section aria-labelledby="weekly-earnings-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider" id="weekly-earnings-heading">
              Weekly Target & Payout
            </h2>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Payout: Mon
            </span>
          </div>

          <div 
            onClick={() => onNavigate('earnings')}
            className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3 cursor-pointer hover:border-emerald-200 transition"
          >
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs font-medium text-slate-500">Current Progress</span>
                <div className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5 font-manrope">
                  ₹18,450 <span className="text-xs font-normal text-slate-400">/ ₹25,000 goal</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-emerald-600 font-manrope">74%</span>
                <p className="text-[11px] text-slate-500 font-medium">4 days remaining</p>
              </div>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: '74%' }}
              ></div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-emerald-600" />
                Bonus eligible at ₹25,000
              </span>
              <span className="font-semibold text-slate-700">+₹2,000 extra</span>
            </div>
          </div>
        </section>

        {/* BEGIN: CivicImpact */}
        <section aria-labelledby="civic-impact-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider" id="civic-impact-heading">
              Civic & Sustainability Impact
            </h2>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold flex items-center gap-1">
              <Leaf className="w-3 h-3 text-emerald-600" />
              Eco Verified
            </span>
          </div>

          <div 
            onClick={() => onNavigate('profile')}
            className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white rounded-2xl p-4 shadow-xs relative overflow-hidden cursor-pointer hover:shadow-md transition"
          >
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-emerald-500/20 rounded-full blur-xl pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
                    Clean Energy & Safety
                  </span>
                </div>
                <span className="text-[11px] bg-white/15 px-2 py-0.5 rounded-md font-medium text-emerald-100">
                  This Month
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-2 border-t border-white/10">
                <div>
                  <div className="text-xl font-bold tracking-tight text-white font-manrope">184 kg</div>
                  <p className="text-[11px] text-emerald-200/80 mt-0.5">CO2 emissions avoided</p>
                </div>
                <div className="border-l border-white/10 pl-3">
                  <div className="text-xl font-bold tracking-tight text-white font-manrope">42 homes</div>
                  <p className="text-[11px] text-emerald-200/80 mt-0.5">Certified safe & efficient</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* END: MainContent */}

      {/* Modals */}
      {showCallModal && (
        <CallModal request={activeTask} onClose={() => setShowCallModal(false)} />
      )}
      {showCompleteModal && (
        <CompleteModal 
          request={activeTask} 
          onComplete={() => {
            onCompleteActiveTask();
            setShowCompleteModal(false);
          }} 
          onClose={() => setShowCompleteModal(false)} 
        />
      )}
    </div>
  );
};
