import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, ArrowLeft, ArrowRight, Timer, MessageSquare, 
  Mail, Headset, ShieldCheck, CheckCircle2, Edit3, 
  Briefcase, Handshake, Lock, Building2, UserCheck
} from 'lucide-react';
import { ScreenType, AppUserRole } from '../types';

interface OtpScreenProps {
  mobileNumber: string;
  userRole?: AppUserRole;
  setUserRole?: (role: AppUserRole) => void;
  onVerifySuccess: () => void;
  onBackToLogin: () => void;
}

export const OtpScreen: React.FC<OtpScreenProps> = ({
  mobileNumber,
  userRole = 'admin',
  setUserRole,
  onVerifySuccess,
  onBackToLogin,
}) => {
  const [otp, setOtp] = useState(['5', '8', '2', '', '', '']);
  const [timer, setTimer] = useState(40);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Timer countdown
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setErrorMessage('');

    // Advance focus
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split('');
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) {
      setErrorMessage('Please enter all 6 digits of the OTP verification code.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerifySuccess();
    }, 900);
  };

  const handleFillDemoCode = () => {
    setOtp(['5', '8', '2', '9', '4', '1']);
    setErrorMessage('');
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen flex flex-col justify-between relative selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Global Shared TopNavBar */}
      <header className="w-full bg-white border-b border-slate-200/80 shadow-xs z-30">
        <div className="flex justify-between items-center w-full px-4 sm:px-6 max-w-6xl mx-auto h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs">
              <Sun className="w-5 h-5 text-emerald-300" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              NetNivas
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Partner Network Active</span>
            </div>
            <button 
              onClick={() => alert('Support line: +91 1800-419-7800')}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
            >
              <Headset className="w-4 h-4 text-emerald-700" />
              <span>Partner Help Desk & Dispatch</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 z-10">
        {/* Brand Header Group */}
        <div className="w-full max-w-md text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 mb-3.5 rounded-2xl bg-white shadow-xs border border-slate-200/80">
            <div className="flex items-center gap-2 px-1">
              <Handshake className="w-6 h-6 text-emerald-700" />
              <span className="text-slate-300 font-light">|</span>
              <Briefcase className="w-6 h-6 text-emerald-700" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 mb-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-manrope">NetNivas</h1>
          </div>
          <p className="text-[11px] tracking-wider uppercase text-slate-500 font-semibold mb-2">
            ENERGY & SMART LIVING • PARTNER OPERATIONS
          </p>

          <div className="inline-flex items-center gap-2 text-xs text-slate-600 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200">
            <span className="text-emerald-700 font-semibold">One platform.</span>
            <span className="text-slate-300">•</span>
            <span>Partner authentication & dispatch verification</span>
          </div>
        </div>

        {/* Centered Modal Verification Card */}
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_40px_-15px_rgba(17,24,39,0.06),0_1px_3px_0_rgba(17,24,39,0.04)] p-6 sm:p-8">
          {/* Card Top Bar */}
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
            <button 
              onClick={onBackToLogin}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Edit Number</span>
            </button>

            <button
              type="button"
              onClick={() => setUserRole?.(userRole === 'admin' ? 'worker' : 'admin')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition cursor-pointer"
              title="Click to toggle role"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>{userRole === 'admin' ? 'Coop Admin' : 'Worker'}</span>
              <span className="text-[10px] text-slate-400 font-normal">▾</span>
            </button>
          </div>

          {/* Card Heading */}
          <div className="mb-6 text-left">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1 font-manrope">
              Enter Verification Code
            </h2>
            <div className="flex items-center flex-wrap gap-1 text-xs text-slate-600">
              <span>We've sent a 6-digit code to</span>
              <span className="font-bold text-slate-900 font-manrope">{mobileNumber || '+91 98765 43210'}</span>
              <button 
                onClick={onBackToLogin} 
                className="text-emerald-700 hover:underline inline-flex items-center ml-0.5"
                title="Edit mobile"
              >
                <Edit3 className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-xs font-bold text-slate-800">
                  Security OTP <span className="text-emerald-700 font-normal ml-1 text-[11px]">(SMS Auto-detect ready)</span>
                </label>
                <button 
                  type="button" 
                  onClick={handleFillDemoCode}
                  className="text-[11px] font-bold text-emerald-700 hover:underline"
                >
                  Auto-fill code
                </button>
              </div>

              {/* 6 Digit OTP Inputs */}
              <div className="grid grid-cols-6 gap-2">
                {otp.map((digit, idx) => (
                  <input 
                    key={idx}
                    ref={el => (inputRefs.current[idx] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    placeholder="•"
                    onPaste={handlePaste}
                    onChange={e => handleInputChange(idx, e.target.value)}
                    onKeyDown={e => handleKeyDown(idx, e)}
                    className={`w-full h-14 text-center font-manrope text-xl font-bold rounded-xl border-2 transition-all outline-none ${
                      digit 
                        ? 'bg-white border-emerald-600 ring-2 ring-emerald-100 text-slate-900' 
                        : 'bg-slate-50 border-slate-200 focus:bg-white focus:border-emerald-500 text-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-xs text-rose-600 font-medium">{errorMessage}</p>
            )}

            {/* Resend Timer Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <Timer className="w-4 h-4 text-slate-400" />
                <span>
                  Resend OTP in <strong className="text-slate-800 font-mono">00:{timer < 10 ? `0${timer}` : timer}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  disabled={timer > 0} 
                  onClick={() => setTimer(45)}
                  className={`text-xs font-semibold ${
                    timer > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-emerald-700 hover:underline'
                  }`}
                >
                  Resend SMS
                </button>
                <span className="text-slate-300">|</span>
                <button 
                  onClick={() => alert(`WhatsApp OTP sent to ${mobileNumber}`)}
                  className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Inline Status Box */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="text-slate-800 font-medium">Verifying as Vendor / Partner</span>
              </div>
              <span className="text-emerald-700 flex items-center gap-1 font-semibold text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                Enterprise Operations Portal
              </span>
            </div>

            {/* Primary CTA */}
            <button 
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.985] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <span>Authorizing Terminal...</span>
              ) : (
                <>
                  <span>Verify & Access Partner Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Trouble Receiving Code Separator */}
            <div className="relative flex items-center justify-center my-3">
              <div className="w-full border-t border-slate-200"></div>
              <span className="absolute bg-white px-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Trouble receiving code?
              </span>
            </div>

            {/* Alternative Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button 
                onClick={() => alert(`Verification link sent to partner email for ${mobileNumber}`)}
                className="h-11 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Mail className="w-4 h-4 text-emerald-700" />
                <span>Verify via Business Email</span>
              </button>
              <button 
                onClick={() => alert('Dispatch helpline: 1800-419-7800')}
                className="h-11 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Headset className="w-4 h-4 text-emerald-700" />
                <span>Call Partner Support Desk</span>
              </button>
            </div>

            {/* Security Assurance */}
            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Auto-detecting SMS OTP with 256-bit NetNivas Guard for Enterprise Partners</span>
            </div>
          </div>
        </div>

        {/* Micro Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
            <Sun className="w-3.5 h-3.5 text-emerald-600" />
            <span>Clean Solar & EV Grid</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Certified Partner Technicians</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Enterprise & GST Compliant</span>
          </div>
        </div>
      </main>

      {/* Global Shared Footer */}
      <footer className="bg-white border-t border-slate-200 z-30 py-3 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px]">
            © 2025 NetNivas Infrastructure Technologies. 256-bit Institutional Encryption. CERT-In & ISO 27001 Compliant.
          </p>
          <div className="flex gap-4 text-[11px] font-medium text-slate-600">
            <a href="#" className="hover:text-emerald-700 underline">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-700 underline">Terms of Service</a>
            <a href="#" className="hover:text-emerald-700 underline">Security Architecture</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
