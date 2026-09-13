import React, { useState } from 'react';
import { 
  ArrowLeft, HelpCircle, Settings, CheckCircle, Star, 
  Sun, Zap, Shield, Edit, Award, AlertOctagon, 
  MapPin, Clock, Lock, BadgeCheck, Building2, 
  FileText, Wrench, Truck, Languages, Headphones, 
  LogOut, ChevronRight, Check
} from 'lucide-react';
import { VendorProfile, ScreenType } from '../types';
import { EditProfileModal, ServiceRadiusModal, LedgerModal } from './Modals';

interface ProfileScreenProps {
  profile: VendorProfile;
  setProfile: React.Dispatch<React.SetStateAction<VendorProfile>>;
  onNavigate: (screen: ScreenType) => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  setProfile,
  onNavigate,
  onLogout,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRadiusModal, setShowRadiusModal] = useState(false);
  const [showLedgerModal, setShowLedgerModal] = useState(false);
  const [activeMenuInfo, setActiveMenuInfo] = useState<string | null>(null);

  const toggleSos = () => {
    setProfile(prev => ({ ...prev, sosDispatchEnabled: !prev.sosDispatchEnabled }));
  };

  const handleUpdateProfile = (updated: Partial<VendorProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  const handleUpdateRadius = (radius: number, area: string) => {
    setProfile(prev => ({ ...prev, serviceRadius: radius, serviceRadiusArea: area }));
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased pb-24">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md flex justify-between items-center w-full px-4 sm:px-6 h-16 border-b border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            aria-label="Go Back" 
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 active:scale-95 transition-transform hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] text-emerald-700 block font-bold tracking-wider uppercase">
              Net Nivas
            </span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Vendor Profile
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => setActiveMenuInfo('24/7 Field Support Dispatch Desk: Call 1800-419-7800 for active site emergency coordination.')}
            aria-label="Help & Support" 
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-transform"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowEditModal(true)}
            aria-label="Settings" 
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-transform"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Pop-up Alert Message if menu item clicked */}
      {activeMenuInfo && (
        <div className="mx-4 mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex justify-between items-center animate-fade-in">
          <span>{activeMenuInfo}</span>
          <button onClick={() => setActiveMenuInfo(null)} className="font-bold text-emerald-700 ml-2">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Content Canvas */}
      <main className="px-4 sm:px-6 pt-4 space-y-4 max-w-xl mx-auto w-full">
        {/* 1. Hero Profile Card */}
        <section className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-start gap-4 relative">
            {/* Avatar with Tier Accent & Verification Badge */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-sm">
                <img 
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>

            {/* Vendor Primary Identifiers */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-slate-900 truncate">{profile.name}</h2>
              <p className="text-xs text-slate-600 font-medium truncate mt-0.5">{profile.companyName}</p>
              
              <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-[11px] font-medium">
                <span>ID: {profile.id}</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">{profile.tier}</span>
              </div>

              {/* Rating badge */}
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-full text-xs text-slate-800 border border-slate-200">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="font-bold">{profile.rating}</span>
                  <span className="text-slate-500 font-normal">({profile.reviewCount} reviews)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Capability Specialization Chips */}
          <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-emerald-200">
              <Sun className="w-3 h-3 text-emerald-600" />
              Solar Systems
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-emerald-200">
              <Zap className="w-3 h-3 text-emerald-600" />
              EV Fast Charging
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-[11px] font-medium">
              <Shield className="w-3 h-3 text-slate-500" />
              Smart Earthing
            </span>
          </div>

          {/* Action: Edit Profile */}
          <div className="mt-4">
            <button 
              onClick={() => setShowEditModal(true)}
              className="w-full h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-slate-800 text-xs font-semibold border border-slate-200"
            >
              <Edit className="w-3.5 h-3.5 text-slate-600" />
              <span>Edit Profile</span>
            </button>
          </div>
        </section>

        {/* 2. Lifetime Civic & Environmental Impact */}
        <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white rounded-2xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-emerald-500 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
          
          <div className="flex items-center justify-between pb-3 border-b border-white/15">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-300">
                <Award className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] text-emerald-300 tracking-wide uppercase font-semibold block">
                  Verified Impact
                </span>
                <h3 className="text-sm font-bold text-white">Civic Eco Credentials</h3>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm text-emerald-200 text-[11px] px-2.5 py-1 rounded-full border border-white/20 font-medium">
              Green Hero Q3
            </span>
          </div>

          {/* 3-Column Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 pt-4 text-center">
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs border border-white/10 flex flex-col justify-between">
              <p className="text-[10px] text-emerald-200 font-medium">CO₂ Avoided</p>
              <p className="text-base font-bold text-emerald-300 my-0.5 font-manrope">
                {profile.co2AvoidedTons} T
              </p>
              <span className="text-[9px] leading-tight text-white/70">Verified Grid Offset</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs border border-white/10 flex flex-col justify-between">
              <p className="text-[10px] text-emerald-200 font-medium">Clean Jobs</p>
              <p className="text-base font-bold text-white my-0.5 font-manrope">
                {profile.cleanJobsCount}
              </p>
              <span className="text-[9px] leading-tight text-white/70">100% Zero-Hazard</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs border border-white/10 flex flex-col justify-between">
              <p className="text-[10px] text-emerald-200 font-medium">Eco Points</p>
              <p className="text-base font-bold text-amber-300 my-0.5 font-manrope">
                {profile.ecoPoints.toLocaleString('en-IN')}
              </p>
              <span className="text-[9px] leading-tight text-emerald-300">Top 5% Bengaluru</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-white/80 pt-2 border-t border-white/10">
            <span className="text-[11px]">Carbon Dividend Pool Active</span>
            <button 
              onClick={() => setShowLedgerModal(true)}
              className="font-semibold text-emerald-300 hover:underline flex items-center gap-0.5 text-xs"
            >
              View Ledger
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* 3. Operational Controls & Availability */}
        <section className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center justify-between">
            <span>Operational Dispatch</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
              On-Duty
            </span>
          </h3>

          {/* Emergency SOS Dispatch Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">Emergency SOS Dispatch</span>
                  <span className="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded-full uppercase">
                    Urgent
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Receive high-priority grid faults & solar trip alarms
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
              <input 
                type="checkbox" 
                checked={profile.sosDispatchEnabled} 
                onChange={toggleSos}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Operating Radius */}
          <div className="flex items-center justify-between py-1 px-1">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-[11px] text-slate-500">Service Radius</p>
                <p className="text-xs font-bold text-slate-900">
                  {profile.serviceRadius} km ({profile.serviceRadiusArea})
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowRadiusModal(true)}
              className="text-emerald-700 hover:text-emerald-900 text-xs font-bold px-2 py-1 rounded-lg hover:bg-slate-100"
            >
              Change
            </button>
          </div>

          {/* Working Hours */}
          <div className="flex items-center justify-between py-1 px-1 border-t border-slate-100 pt-2.5">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-[11px] text-slate-500">Standard Operating Schedule</p>
                <p className="text-xs font-bold text-slate-900">{profile.workingHours}</p>
              </div>
            </div>
            <Lock className="w-4 h-4 text-slate-400" />
          </div>
        </section>

        {/* 4. Verification & Compliance Status */}
        <section className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Verification & Compliance
            </h3>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
              100% Compliant
            </span>
          </div>

          <div className="space-y-2.5">
            {/* GSTIN */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[3]" />
                </span>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">GSTIN & KYC Verified</p>
                  <p className="text-xs font-semibold text-slate-900 font-mono">{profile.gstin}</p>
                </div>
              </div>
              <span className="text-xs text-emerald-700 font-bold">Active</span>
            </div>

            {/* Inspectorate License */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <BadgeCheck className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Karnataka Electrical Inspectorate</p>
                  <p className="text-xs font-semibold text-slate-900">
                    Class A Contractor <span className="text-slate-500 font-normal text-[11px]">({profile.contractorExpiry})</span>
                  </p>
                </div>
              </div>
              <Shield className="w-4 h-4 text-slate-400" />
            </div>

            {/* Payout Account */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Direct Payout Account</p>
                  <p className="text-xs font-semibold text-slate-900">{profile.bankAccount}</p>
                </div>
              </div>
              <span className="text-xs text-emerald-700 font-medium">Auto-Deposit</span>
            </div>
          </div>
        </section>

        {/* 5. Account Management Menu List */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden divide-y divide-slate-100 text-xs">
          {/* Item 1: Payout History */}
          <button 
            onClick={() => onNavigate('earnings')}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Payout History & GST Invoices</p>
                <p className="text-[10px] text-slate-500">Monthly reports and input tax credits</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <span className="font-semibold text-emerald-700">₹64,280 YTD</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          {/* Item 2: Certifications & Equipment */}
          <button 
            onClick={() => setActiveMenuInfo('All calibrated equipment is certified valid through 2026.')}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Certifications & Equipment Audit</p>
                <p className="text-[10px] text-slate-500">Safety harness & calibrated multimeters</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold text-[10px] border border-emerald-200">
                Up to date
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>

          {/* Item 3: Vehicle Details */}
          <button 
            onClick={() => setActiveMenuInfo(`Electric vehicle assigned: ${profile.vehicleDetails}`)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Vehicle & Mobile Kit Details</p>
                <p className="text-[10px] text-slate-500">{profile.vehicleDetails}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Item 4: Language & Regional */}
          <button 
            onClick={() => setActiveMenuInfo('Languages enabled: English, Kannada, Hindi.')}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Languages className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Language & Regional Settings</p>
                <p className="text-[10px] text-slate-500">{profile.language}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Item 5: Help Center */}
          <button 
            onClick={() => setActiveMenuInfo('Direct 24/7 Field Coordinator line: +91 80 4910 8800')}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Help Center & Safety Protocol</p>
                <p className="text-[10px] text-slate-500">24/7 Field dispatch coordinator line</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Item 6: Log Out */}
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-between p-4 hover:bg-rose-50/50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                <LogOut className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-rose-600">Log Out</p>
                <p className="text-[10px] text-slate-500">Sign out from this terminal</p>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">v2.4.12</span>
          </button>
        </section>

        {/* Trust & Civic Attribution Footer */}
        <footer className="text-center pt-2 pb-6 space-y-1">
          <p className="text-[11px] text-slate-500 font-medium">
            VasudhaX National Clean Energy Grid Partner Network
          </p>
          <p className="text-[10px] text-slate-400">
            Authorized & Encrypted under Bharat Smart Services Protocol
          </p>
        </footer>
      </main>

      {/* Modals */}
      {showEditModal && (
        <EditProfileModal 
          profile={profile} 
          onSave={handleUpdateProfile} 
          onClose={() => setShowEditModal(false)} 
        />
      )}
      {showRadiusModal && (
        <ServiceRadiusModal 
          currentRadius={profile.serviceRadius} 
          currentArea={profile.serviceRadiusArea} 
          onSave={handleUpdateRadius} 
          onClose={() => setShowRadiusModal(false)} 
        />
      )}
      {showLedgerModal && (
        <LedgerModal onClose={() => setShowLedgerModal(false)} />
      )}
    </div>
  );
};
