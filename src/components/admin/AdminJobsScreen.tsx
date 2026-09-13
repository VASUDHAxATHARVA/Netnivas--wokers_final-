import React, { useState } from 'react';
import { 
  ArrowLeft, ChevronDown, Calendar as CalendarIcon, 
  ListFilter, CheckCircle, Clock, AlertCircle
} from 'lucide-react';
import { AdminJob } from '../../types';

interface AdminJobsScreenProps {
  jobs: AdminJob[];
  onBack: () => void;
  onAssignJob: (job: AdminJob) => void;
  onViewJobDetails?: (job: AdminJob) => void;
}

export const AdminJobsScreen: React.FC<AdminJobsScreenProps> = ({
  jobs,
  onBack,
  onAssignJob,
  onViewJobDetails,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'scheduled' | 'in_progress' | 'needs_action'>('all');
  const [selectedDate, setSelectedDate] = useState<'today_24' | 'tomorrow_25' | 'sat_26' | 'sun_27'>('today_24');
  const [selectedSociety, setSelectedSociety] = useState('Green Glen Greens');

  // Filter jobs by date and status
  const filteredJobs = jobs.filter(job => {
    // Match date category
    if (job.dateCategory !== selectedDate) return false;

    // Match status tab
    if (activeFilter === 'scheduled') return job.status === 'assigned';
    if (activeFilter === 'in_progress') return job.status === 'in_progress';
    if (activeFilter === 'needs_action') return job.status === 'needs_assignment';
    return true; // 'all'
  });

  return (
    <div className="max-w-xl mx-auto w-full px-4 pt-3 pb-24 space-y-4 font-sans text-[#191C1D]">
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
            Jobs
          </h1>
          {/* Society Dropdown Pill */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer hover:bg-slate-200 transition">
            <span>{selectedSociety}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-slate-100 transition text-slate-600"
            title="Calendar View"
          >
            <CalendarIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-slate-100 transition text-slate-600"
            title="Filter"
          >
            <ListFilter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Status Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'all'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All 48
        </button>

        <button
          onClick={() => setActiveFilter('scheduled')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'scheduled'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Scheduled 14
        </button>

        <button
          onClick={() => setActiveFilter('in_progress')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'in_progress'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          In Progress 6
        </button>

        <button
          onClick={() => setActiveFilter('needs_action')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
            activeFilter === 'needs_action'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Needs Action 3
        </button>
      </div>

      {/* 3. Date Selection Row */}
      <div className="grid grid-cols-4 gap-2 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/80">
        <button
          onClick={() => setSelectedDate('today_24')}
          className={`py-2 rounded-xl text-center transition ${
            selectedDate === 'today_24'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider opacity-90">
            TODAY
          </div>
          <div className="text-base font-extrabold leading-none mt-0.5">
            24
          </div>
        </button>

        <button
          onClick={() => setSelectedDate('tomorrow_25')}
          className={`py-2 rounded-xl text-center transition ${
            selectedDate === 'tomorrow_25'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider opacity-90">
            TOMORROW
          </div>
          <div className="text-base font-extrabold leading-none mt-0.5">
            25
          </div>
        </button>

        <button
          onClick={() => setSelectedDate('sat_26')}
          className={`py-2 rounded-xl text-center transition ${
            selectedDate === 'sat_26'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider opacity-90">
            SAT
          </div>
          <div className="text-base font-extrabold leading-none mt-0.5">
            26
          </div>
        </button>

        <button
          onClick={() => setSelectedDate('sun_27')}
          className={`py-2 rounded-xl text-center transition ${
            selectedDate === 'sun_27'
              ? 'bg-[#006C4A] text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider opacity-90">
            SUN
          </div>
          <div className="text-base font-extrabold leading-none mt-0.5">
            27
          </div>
        </button>
      </div>

      {/* 4. Jobs List */}
      <div className="space-y-3">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
            <Clock className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-sm font-bold text-slate-800">No jobs matching this filter</div>
            <div className="text-xs text-slate-500">Try choosing another status or date.</div>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-slate-300 transition space-y-2"
            >
              {/* Top Row: Job Code & Price */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600">{job.code}</span>
                  <span>·</span>
                  <span className="text-slate-900 font-extrabold text-sm">
                    ₹{job.price.toLocaleString('en-IN')}
                  </span>
                </div>

                {job.assignedWorker && (
                  <span className="text-[11px] font-medium text-slate-500 truncate max-w-[150px]">
                    Assigned: <strong className="text-slate-800">{job.assignedWorker}</strong>
                  </span>
                )}
              </div>

              {/* Title & Action Button Row */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    {job.title}
                  </h3>
                  {/* Status subtitle */}
                  <div className="flex items-center gap-1.5 text-xs mt-0.5">
                    <span className="text-slate-500">{job.time}</span>
                    <span className="text-slate-300">·</span>

                    {job.status === 'needs_assignment' ? (
                      <span className="flex items-center gap-1 text-[#DC2626] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
                        <span>Needs assignment</span>
                      </span>
                    ) : job.status === 'in_progress' ? (
                      <span className="flex items-center gap-1 text-[#006C4A] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006C4A]"></span>
                        <span>In progress</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        <span>Assigned</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Action Button */}
                {job.status === 'needs_assignment' ? (
                  <button
                    type="button"
                    onClick={() => onAssignJob(job)}
                    className="px-4 py-2 bg-[#006C4A] hover:bg-[#00573B] text-white text-xs font-bold rounded-lg shadow-2xs transition active:scale-95 shrink-0"
                  >
                    Assign
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onViewJobDetails?.(job)}
                    className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition active:scale-95 shrink-0"
                  >
                    View
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
