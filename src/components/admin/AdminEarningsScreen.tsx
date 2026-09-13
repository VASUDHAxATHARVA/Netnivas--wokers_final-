import React, { useState } from 'react';
import { 
  ArrowLeft, Wallet, TrendingUp, Users, Building2, 
  ArrowUpRight, Download, Calendar, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { AdminWorker } from '../../types';

interface AdminEarningsScreenProps {
  workers: AdminWorker[];
  onBack: () => void;
  onOpenRoster: () => void;
}

export const AdminEarningsScreen: React.FC<AdminEarningsScreenProps> = ({
  workers,
  onBack,
  onOpenRoster,
}) => {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');

  const topWorkers = [
    { name: 'Ramesh Kumar', jobs: 3, earned: 4850, rating: 4.9, avatar: 'RK' },
    { name: 'Suresh Murthy', jobs: 2, earned: 3200, rating: 4.8, avatar: 'SM' },
    { name: 'Rajesh K. Murthy', jobs: 3, earned: 6450, rating: 4.9, avatar: 'RM' },
    { name: 'Aniket Patil', jobs: 4, earned: 3900, rating: 4.9, avatar: 'AP' },
    { name: 'Mohammad Rafiq', jobs: 2, earned: 2750, rating: 4.8, avatar: 'MR' },
  ];

  return (
    <div className="max-w-xl mx-auto w-full px-4 pt-3 pb-24 space-y-4 font-sans text-[#191C1D]">
      {/* Header */}
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
            Cooperative Earnings
          </h1>
        </div>

        <button
          type="button"
          onClick={() => alert('Cooperative GST invoice & disbursement report exported.')}
          className="p-2 rounded-full hover:bg-slate-100 transition text-slate-600"
          title="Export report"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      {/* Period Selector */}
      <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
        <button
          onClick={() => setPeriod('today')}
          className={`py-1.5 text-xs font-bold rounded-lg transition ${
            period === 'today' ? 'bg-[#006C4A] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setPeriod('week')}
          className={`py-1.5 text-xs font-bold rounded-lg transition ${
            period === 'week' ? 'bg-[#006C4A] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => setPeriod('month')}
          className={`py-1.5 text-xs font-bold rounded-lg transition ${
            period === 'month' ? 'bg-[#006C4A] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          This Month
        </button>
      </div>

      {/* Main Revenue Card */}
      <div className="bg-gradient-to-br from-[#006C4A] to-[#004D34] text-white p-5 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-100 uppercase tracking-wider">
            {period === 'today' ? 'Today Gross Cooperative Revenue' : period === 'week' ? 'Weekly Gross Revenue' : 'Monthly Gross Revenue'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-semibold">
            +18.4% vs last week
          </span>
        </div>

        <div>
          <div className="text-3xl font-extrabold tracking-tight">
            {period === 'today' ? '₹42,850' : period === 'week' ? '₹2,84,600' : '₹8,92,400'}
          </div>
          <div className="text-xs text-emerald-100 mt-1 flex items-center gap-2">
            <span>32 jobs completed</span>
            <span>·</span>
            <span>32 active technicians</span>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="pt-2 border-t border-emerald-500/40 grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="text-emerald-200 text-[10px] uppercase font-semibold">Technician Payouts (92%)</div>
            <div className="text-sm font-bold mt-0.5">
              {period === 'today' ? '₹39,422' : period === 'week' ? '₹2,61,832' : '₹8,21,008'}
            </div>
          </div>
          <div>
            <div className="text-emerald-200 text-[10px] uppercase font-semibold">Coop Ops Margin (8%)</div>
            <div className="text-sm font-bold mt-0.5">
              {period === 'today' ? '₹3,428' : period === 'week' ? '₹22,768' : '₹71,392'}
            </div>
          </div>
        </div>
      </div>

      {/* Society Revenue Breakdown */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Society Revenue Share
          </h2>
          <span className="text-xs text-slate-500">Clustered Hubs</span>
        </div>

        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Green Glen Greens (22 orders)</span>
              <span>₹24,800</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-[#006C4A] rounded-full" style={{ width: '58%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Prestige Falcon City (14 orders)</span>
              <span>₹12,450</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '29%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Bellandur Sector Hub (6 orders)</span>
              <span>₹5,600</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full" style={{ width: '13%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Technician Rollup / Top Earners */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Technician Performance Rollup
          </h2>
          <button
            onClick={onOpenRoster}
            className="text-xs font-semibold text-[#006C4A] hover:underline"
          >
            Full Roster (32) →
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {topWorkers.map((w, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 font-bold text-xs text-slate-700 flex items-center justify-center">
                  {w.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{w.name}</span>
                    <span className="text-amber-500 text-[10px]">★ {w.rating}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {w.jobs} jobs completed today
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-slate-900">
                  ₹{w.earned.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-emerald-700 font-medium">
                  Direct Payout
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank & Settlement Status */}
      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between text-xs">
        <div className="space-y-0.5">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#006C4A]" />
            <span>Daily Auto-Settlement Active</span>
          </div>
          <div className="text-slate-500 text-[11px]">
            HDFC Bank Coop Account · Ending in 4821
          </div>
        </div>
        <span className="px-2 py-1 bg-emerald-100 text-[#006C4A] font-bold rounded-lg text-[10px]">
          Next: 11:30 PM
        </span>
      </div>
    </div>
  );
};
