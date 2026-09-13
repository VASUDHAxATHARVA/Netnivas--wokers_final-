import React, { useState } from 'react';
import { 
  Smartphone, ArrowRight, AlertCircle, Shield, 
  Zap, Check, Users, Briefcase, Building2, UserCheck
} from 'lucide-react';
import { AppUserRole } from '../types';

interface LoginScreenProps {
  mobileNumber: string;
  setMobileNumber: (val: string) => void;
  userRole: AppUserRole;
  setUserRole: (val: AppUserRole) => void;
  onSendOtp: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  mobileNumber,
  setMobileNumber,
  userRole,
  setUserRole,
  onSendOtp,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorBanner, setShowErrorBanner] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = mobileNumber.replace(/\D/g, '');

    if (cleanNumber.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number (e.g. 98765 43210).');
      setShowErrorBanner(true);
      return;
    }

    setShowErrorBanner(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSendOtp();
    }, 800);
  };

  const handleSimulateError = () => {
    setErrorMessage('Simulated error: Network latency detected. Please retry in a few seconds.');
    setShowErrorBanner(prev => !prev);
  };

  return (
    <div className="bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] text-slate-900 min-h-screen flex flex-col justify-between font-sans antialiased relative overflow-hidden selection:bg-emerald-100 selection:text-emerald-900">
      {/* Ambient Soft Glow Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-40 pointer-events-none" 
          style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.18) 0%, rgba(255,255,255,0) 70%)' }}
        ></div>
        <div 
          className="absolute top-1/2 -right-20 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none" 
          style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, rgba(255,255,255,0) 70%)' }}
        ></div>
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-[430px] mx-auto px-4 sm:px-6 pt-7 pb-6 flex-1 flex flex-col justify-center">
        {/* Top Branding & Ecosystem Header */}
        <header className="text-center mb-5">
          <div className="inline-flex items-center justify-center gap-2.5 mb-2.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-[#006C4A] shadow-xs flex items-center justify-center p-2 relative overflow-hidden transition-transform duration-300 group-hover:scale-105 text-white">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center leading-none">
                Net<span className="text-emerald-700">Nivas</span>
                <span className="ml-1.5 px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">PRO</span>
              </span>
              <span className="text-[10px] tracking-widest font-semibold uppercase text-slate-500 block mt-0.5">
                Vendor & Cooperative Operations
              </span>
            </div>
          </div>

          <h1 className="text-sm font-semibold text-slate-800 tracking-tight flex items-center justify-center gap-1.5 mt-1">
            <span>Unified Operations Terminal</span>
            <span className="text-slate-400 font-normal">•</span>
            <span className="text-emerald-700 font-bold">
              {userRole === 'admin' ? 'Cooperative Admin' : 'Field Technician (Worker)'}
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your role to route to your dedicated dashboard
          </p>
        </header>

        {/* Main Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300">
          {/* Card Title & Welcome */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight font-manrope">
                Portal Sign In
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Select role and verify terminal</p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>{userRole === 'admin' ? 'Coop Admin' : 'Worker'}</span>
            </div>
          </div>

          {/* Role Switcher Pills (Worker vs Admin) */}
          <div className="space-y-1 mb-4">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              SELECT USER ROLE:
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button 
                type="button"
                onClick={() => setUserRole('worker')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  userRole === 'worker' ? 'bg-[#006C4A] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Worker</span>
              </button>
              <button 
                type="button"
                onClick={() => setUserRole('admin')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  userRole === 'admin' ? 'bg-[#006C4A] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
            <div className="text-[11px] text-slate-500 text-center pt-0.5">
              {userRole === 'admin' 
                ? 'Cooperative admin dashboard (Roster, Dispatch, Demand Pools, Jobs)' 
                : 'Technician dashboard (Pools, Bids, Schedule, Earnings)'}
            </div>
          </div>

          {/* Form Credentials */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Mobile Number Field */}
            <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-800" htmlFor="mobileInput">
                  <Smartphone className="w-4 h-4 text-emerald-700" />
                  <span>Registered Mobile Number</span>
                </label>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  OTP-Based
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-3 py-2 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 border-r border-slate-200 pr-2 select-none">
                  🇮🇳 +91
                </span>
                <input
                  id="mobileInput"
                  type="tel"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value.replace(/\D/g, ''));
                    setShowErrorBanner(false);
                  }}
                  placeholder="98765 43210"
                  className="w-full text-sm font-semibold tracking-wider text-slate-900 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
                />
              </div>
            </div>

            {/* Error Banner */}
            {showErrorBanner && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-800 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Unable to proceed</p>
                  <p className="text-[11px] text-red-700 mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#006C4A] hover:bg-[#00573B] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Sending Verification Code...</span>
                </span>
              ) : (
                <>
                  <span>Continue to Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          {/* Footer trust items */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-teal-600" />
              Certified Operations
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              GST Compliant
            </span>
          </div>
        </div>

        <p className="mt-4 text-[10px] text-slate-400 text-center">
          © 2026 NetNivas Pro • Cooperative & Partner Network
        </p>
      </main>
    </div>
  );
};
