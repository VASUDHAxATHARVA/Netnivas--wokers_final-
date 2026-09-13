import React, { useState } from 'react';
import { 
  Wallet, ArrowUpRight, Download, Gift, 
  Building2, CheckCircle, FileText, ChevronRight,
  TrendingUp, Calendar, ShieldCheck, Award
} from 'lucide-react';
import { VendorProfile, ScreenType } from '../types';
import { LedgerModal } from './Modals';

interface EarningsScreenProps {
  profile: VendorProfile;
  onNavigate: (screen: ScreenType) => void;
}

export const EarningsScreen: React.FC<EarningsScreenProps> = ({
  profile,
  onNavigate,
}) => {
  const [showLedger, setShowLedger] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownloadInvoice = (invoiceId: string) => {
    setDownloadNotice(`GST Tax Invoice ${invoiceId} downloaded to device storage.`);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  const invoiceHistory = [
    {
      id: 'INV-2026-08',
      period: 'August 2026 Cycle',
      jobs: 24,
      amount: 42800,
      gst: 7704,
      status: 'Paid & Reconciled',
      date: '02 Sep 2026',
    },
    {
      id: 'INV-2026-07',
      period: 'July 2026 Cycle',
      jobs: 21,
      amount: 36450,
      gst: 6561,
      status: 'Paid & Reconciled',
      date: '03 Aug 2026',
    },
    {
      id: 'INV-2026-06',
      period: 'June 2026 Cycle',
      jobs: 19,
      amount: 32100,
      gst: 5778,
      status: 'Paid & Reconciled',
      date: '02 Jul 2026',
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased pb-28">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 shadow-xs">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
              Financial Overview
            </span>
            <h1 className="text-base font-bold text-slate-900 leading-tight">Earnings & Settlements</h1>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            HDFC Auto-Deposit
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto w-full px-4 sm:px-5 pt-4 space-y-4">
        {downloadNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{downloadNotice}</span>
          </div>
        )}

        {/* Total Available Balance Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Current Cycle Balance</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
              Payout: Mon, 14 Sep
            </span>
          </div>

          <div className="text-3xl font-extrabold text-slate-900 mt-2 font-manrope">
            ₹18,450
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Linked to <strong className="text-slate-800 font-semibold">{profile.bankAccount}</strong>
          </p>

          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 text-[11px] block">Completed Jobs Today</span>
              <span className="text-sm font-bold text-slate-900 font-manrope">6 jobs • ₹4,850</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block">Total YTD Disbursed</span>
              <span className="text-sm font-bold text-emerald-700 font-manrope">₹64,280</span>
            </div>
          </div>
        </div>

        {/* Weekly Target Progress */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs font-medium text-slate-500">Weekly Goal Milestone</span>
              <div className="text-xl font-bold text-slate-900 tracking-tight mt-0.5 font-manrope">
                ₹18,450 <span className="text-xs font-normal text-slate-400">/ ₹25,000</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-emerald-700 font-manrope">74%</span>
              <p className="text-[11px] text-slate-500 font-medium">4 days left</p>
            </div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: '74%' }}
            ></div>
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-100">
            <span className="flex items-center gap-1.5 font-medium">
              <Gift className="w-3.5 h-3.5 text-emerald-600" />
              Bonus incentive at ₹25,000 threshold
            </span>
            <span className="font-bold text-slate-800">+₹2,000 cash credit</span>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Earnings by Service Category
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">Electrical Inverter Maintenance</span>
              <span className="font-bold text-slate-900 font-manrope">₹8,400</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '45%' }}></div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-700 font-medium">Panel & High-Voltage Installation</span>
              <span className="font-bold text-slate-900 font-manrope">₹6,200</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '33%' }}></div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-700 font-medium">Smart Meter Diagnostics</span>
              <span className="font-bold text-slate-900 font-manrope">₹2,650</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '15%' }}></div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-700 font-medium">Emergency SOS Dispatches</span>
              <span className="font-bold text-slate-900 font-manrope">₹1,200</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '7%' }}></div>
            </div>
          </div>
        </div>

        {/* GST Invoices & Settlement History */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Payout History & GST Invoices
            </h3>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              GSTIN: {profile.gstin}
            </span>
          </div>

          <div className="space-y-3">
            {invoiceHistory.map(inv => (
              <div 
                key={inv.id}
                className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-bold text-slate-900">{inv.id}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    {inv.period} • {inv.jobs} jobs • GST ₹{inv.gst.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 font-manrope text-sm">
                    ₹{inv.amount.toLocaleString('en-IN')}
                  </span>
                  <button 
                    onClick={() => handleDownloadInvoice(inv.id)}
                    className="p-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 active:scale-95 transition text-slate-600"
                    title="Download Receipt"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon Dividend Pool Callout */}
        <div 
          onClick={() => setShowLedger(true)}
          className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-4 shadow-xs flex items-center justify-between cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider block">
                Eco-Civic Dividends
              </span>
              <p className="text-sm font-bold text-white">18,450 Eco Points Pool</p>
              <p className="text-[11px] text-emerald-200/80">Est. ₹3,690 quarterly dividend</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-300" />
        </div>
      </main>

      {/* Ledger modal */}
      {showLedger && (
        <LedgerModal onClose={() => setShowLedger(false)} />
      )}
    </div>
  );
};
