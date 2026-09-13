import React from 'react';
import { ChevronRight, ArrowRight, Layers, Users, Sparkles, AlertCircle } from 'lucide-react';
import { AdminJob, ScreenType } from '../../types';

interface AdminOverviewScreenProps {
  jobs: AdminJob[];
  onNavigate: (screen: ScreenType) => void;
  onAssignJob: (job: AdminJob) => void;
  onOpenRoster: () => void;
  onOpenPools: () => void;
}

export const AdminOverviewScreen: React.FC<AdminOverviewScreenProps> = ({
  jobs,
  onNavigate,
  onAssignJob,
  onOpenRoster,
  onOpenPools,
}) => {
  // Urgent / Needs attention jobs
  const attentionJobs = jobs.filter(j => j.status === 'needs_assignment');

  return (
    <div className="max-w-xl mx-auto w-full px-4 pt-4 pb-24 space-y-6 font-sans antialiased text-[#191C1D]">
      {/* 1. Today Metric Section */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
          Today
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Jobs */}
          <button
            onClick={() => onNavigate('admin_jobs')}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-left hover:border-slate-300 transition active:scale-[0.99]"
          >
            <div className="text-[32px] font-extrabold text-slate-900 leading-tight">
              48
            </div>
            <div className="text-sm font-medium text-slate-500 mt-0.5">
              Jobs
            </div>
          </button>

          {/* Pending */}
          <button
            onClick={() => onNavigate('admin_dispatch')}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-left hover:border-slate-300 transition active:scale-[0.99]"
          >
            <div className="text-[32px] font-extrabold text-slate-900 leading-tight">
              7
            </div>
            <div className="text-sm font-medium text-slate-500 mt-0.5">
              Pending
            </div>
          </button>

          {/* Urgent */}
          <button
            onClick={() => onNavigate('admin_notifications')}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-left hover:border-slate-300 transition active:scale-[0.99]"
          >
            <div className="text-[32px] font-extrabold text-[#DC2626] leading-tight">
              3
            </div>
            <div className="text-sm font-medium text-slate-500 mt-0.5">
              Urgent
            </div>
          </button>

          {/* Workers active */}
          <button
            onClick={onOpenRoster}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-left hover:border-slate-300 transition active:scale-[0.99]"
          >
            <div className="text-[32px] font-extrabold text-slate-900 leading-tight">
              32
            </div>
            <div className="text-sm font-medium text-slate-500 mt-0.5">
              Workers active
            </div>
          </button>
        </div>
      </div>

      {/* 2. Needs Attention Section */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Needs Attention
          </h2>
          <button
            onClick={() => onNavigate('admin_jobs')}
            className="text-xs font-semibold text-[#006C4A] hover:text-emerald-800 flex items-center gap-0.5 transition"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {attentionJobs.slice(0, 2).map(job => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between gap-3 hover:border-slate-300 transition"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <span>{job.code}</span>
                  <span>·</span>
                  <span>{job.time}</span>
                </div>
                <div className="text-[15px] font-bold text-slate-900 truncate">
                  {job.title}
                </div>
                <div className="text-xs flex items-center gap-1.5">
                  <span className="text-[#DC2626] font-semibold">
                    Needs assignment
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="font-bold text-slate-900">
                    ₹{job.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onAssignJob(job)}
                className="px-4 py-2 bg-[#006C4A] hover:bg-[#00573B] text-white text-xs font-bold rounded-lg shadow-2xs transition active:scale-95 shrink-0"
              >
                Assign
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Operations Overview Section */}
      <div>
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          OPERATIONS OVERVIEW
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden">
          {/* Dispatch */}
          <button
            onClick={() => onNavigate('admin_dispatch')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50/80 transition"
          >
            <span className="text-sm font-medium text-slate-900">Dispatch</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-[#DC2626]">7 pending</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>

          {/* Workers */}
          <button
            onClick={onOpenRoster}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50/80 transition"
          >
            <span className="text-sm font-medium text-slate-900">Workers</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-slate-600">32 active</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>

          {/* Completed */}
          <button
            onClick={() => onNavigate('admin_jobs')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50/80 transition"
          >
            <span className="text-sm font-medium text-slate-900">Completed</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-slate-600">32 jobs</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>

          {/* Revenue */}
          <button
            onClick={() => onNavigate('admin_earnings')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50/80 transition"
          >
            <span className="text-sm font-medium text-slate-900">Revenue</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-[#006C4A]">₹42, 850</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>
        </div>
      </div>

      {/* 4. Demand Pools & Cooperative Highlights Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-slate-50 to-blue-50/50 rounded-2xl p-4 border border-emerald-200/80 shadow-2xs">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Cooperative Bidding Active</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Demand Pools & Society Bids
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              3 societies clustered 109 units for AC & RO servicing. Review accepted contracts & tower allocations.
            </p>
          </div>
          <button
            onClick={onOpenPools}
            className="px-3 py-1.5 bg-[#006C4A] hover:bg-[#00573B] text-white text-xs font-bold rounded-lg shadow-2xs shrink-0 transition"
          >
            View Pools
          </button>
        </div>
      </div>
    </div>
  );
};
