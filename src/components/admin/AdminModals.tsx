import React, { useState } from 'react';
import { 
  X, Check, Phone, ShieldCheck, MapPin, Search, 
  Users, Award, Calendar, Layers, CheckCircle2, 
  Sparkles, ChevronRight, AlertCircle, LogOut, ArrowRightLeft
} from 'lucide-react';
import { 
  AdminJob, AdminDispatchItem, AdminWorker, 
  DemandPool, CooperativeProfile 
} from '../../types';

// ==========================================
// 1. Assign Worker Modal
// ==========================================
interface AssignWorkerModalProps {
  job: AdminJob | AdminDispatchItem | null;
  workers: AdminWorker[];
  isOpen: boolean;
  onClose: () => void;
  onConfirmAssign: (jobId: string, workerName: string, workerRating: number) => void;
}

export const AssignWorkerModal: React.FC<AssignWorkerModalProps> = ({
  job,
  workers,
  isOpen,
  onClose,
  onConfirmAssign,
}) => {
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>(workers[0]?.id || '');
  const [search, setSearch] = useState('');

  if (!isOpen || !job) return null;

  const filteredWorkers = workers.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleConfirm = () => {
    const worker = workers.find(w => w.id === selectedWorkerId);
    if (worker) {
      onConfirmAssign(job.id, worker.name, worker.rating);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-[10px] font-bold text-[#006C4A] uppercase tracking-wider">
              Cooperative Dispatch
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Assign Technician to {('code' in job) ? job.code : 'Job'}
            </h3>
            <p className="text-xs text-slate-500 truncate max-w-[260px]">
              {job.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search technician or skill..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-emerald-600"
            />
          </div>
        </div>

        {/* Workers List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1 divide-y divide-slate-100">
          {filteredWorkers.map(w => {
            const isSelected = w.id === selectedWorkerId;
            return (
              <div
                key={w.id}
                onClick={() => setSelectedWorkerId(w.id)}
                className={`pt-2 first:pt-0 pb-2 px-3 rounded-xl cursor-pointer transition flex items-center justify-between ${
                  isSelected ? 'bg-emerald-50 border border-emerald-300' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#006C4A] text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {w.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{w.name}</span>
                      <span className="text-amber-500 text-[11px]">★ {w.rating}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {w.skills.slice(0, 2).join(', ')}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        w.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></span>
                      <span className="capitalize">{w.status.replace('_', ' ')}</span>
                      <span>·</span>
                      <span>{w.jobsCompletedToday} jobs today</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-[#006C4A] bg-[#006C4A] text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-2 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 bg-[#006C4A] hover:bg-[#00573B] text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-95"
          >
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. Full Worker Roster Modal
// ==========================================
interface WorkerRosterModalProps {
  workers: AdminWorker[];
  isOpen: boolean;
  onClose: () => void;
  onCallWorker: (worker: { name: string; phone: string }) => void;
}

export const WorkerRosterModal: React.FC<WorkerRosterModalProps> = ({
  workers,
  isOpen,
  onClose,
  onCallWorker,
}) => {
  const [filter, setFilter] = useState<'all' | 'available' | 'on_job' | 'en_route'>('all');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = workers.filter(w => {
    if (filter === 'available' && w.status !== 'available') return false;
    if (filter === 'on_job' && w.status !== 'on_job' && w.status !== 'active') return false;
    if (filter === 'en_route' && w.status !== 'en_route') return false;
    if (search.trim()) {
      return w.name.toLowerCase().includes(search.toLowerCase()) ||
             w.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">
                Technician Roster
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006C4A] text-xs font-bold">
                32 Active
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Cooperative workforce deployment & current availability
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 border-b border-slate-100 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by name, trade or skill..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                filter === 'all' ? 'bg-[#006C4A] text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              All (32)
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                filter === 'available' ? 'bg-[#006C4A] text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Available (14)
            </button>
            <button
              onClick={() => setFilter('en_route')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                filter === 'en_route' ? 'bg-[#006C4A] text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              En Route (6)
            </button>
            <button
              onClick={() => setFilter('on_job')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                filter === 'on_job' ? 'bg-[#006C4A] text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              On Job (12)
            </button>
          </div>
        </div>

        {/* Workers List */}
        <div className="p-3 overflow-y-auto space-y-2.5 flex-1">
          {filtered.map(w => (
            <div
              key={w.id}
              className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                  {w.avatarInitials}
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{w.name}</span>
                    <span className="text-amber-500 text-[11px]">★ {w.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {w.skills.map(s => (
                      <span key={s} className="px-1.5 py-0.2 bg-slate-100 text-slate-600 text-[10px] rounded font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      w.status === 'available' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}></span>
                    <span className="capitalize">{w.status.replace('_', ' ')}</span>
                    {w.currentAssignment && (
                      <span className="text-slate-400">· {w.currentAssignment}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => onCallWorker({ name: w.name, phone: w.phone })}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  title="Call Technician"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. Demand Pools & Bids Management Modal
// ==========================================
interface DemandPoolsModalProps {
  pools: DemandPool[];
  isOpen: boolean;
  onClose: () => void;
}

export const DemandPoolsModal: React.FC<DemandPoolsModalProps> = ({
  pools,
  isOpen,
  onClose,
}) => {
  const [selectedPool, setSelectedPool] = useState<DemandPool | null>(pools[0] || null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-[#006C4A] uppercase tracking-wider">
                Society Clustered Demand
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Demand Pools & Cooperative Bids
            </h3>
            <p className="text-xs text-slate-500">
              Bulk opportunities aggregated by Resident Welfare Associations
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pools Tabs */}
        <div className="p-3 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {pools.map(pool => {
            const isSel = selectedPool?.id === pool.id;
            return (
              <button
                key={pool.id}
                onClick={() => setSelectedPool(pool)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                  isSel ? 'bg-[#006C4A] text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{pool.society}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                  isSel ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {pool.requestCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {selectedPool && (
          <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
            {/* Pool Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">{selectedPool.societyCode}</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                  selectedPool.currentBidStatus === 'accepted'
                    ? 'bg-emerald-100 text-[#006C4A]'
                    : selectedPool.currentBidStatus === 'bid_submitted'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedPool.currentBidStatus === 'accepted' ? 'Bid Accepted ✓' : selectedPool.currentBidStatus === 'bid_submitted' ? 'Bid Under Review' : 'Bidding Open'}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900">
                {selectedPool.serviceType}
              </h4>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Clustered Units</span>
                  <div className="text-sm font-bold text-slate-900">{selectedPool.requestCount} Apartments</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase">Estimated Pool Value</span>
                  <div className="text-sm font-bold text-[#006C4A]">₹{selectedPool.estValue.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            {/* Bid details */}
            {selectedPool.bidDetails && (
              <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#006C4A]" />
                  <span>Submitted Cooperative Offer</span>
                </h5>
                <div className="space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Negotiated Rate per Unit:</span>
                    <strong className="text-slate-900">₹{selectedPool.bidDetails.pricePerUnit} / unit</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Contract Value:</span>
                    <strong className="text-[#006C4A]">₹{selectedPool.bidDetails.totalBid.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Dedicated Tech Team:</span>
                    <strong className="text-slate-900">{selectedPool.bidDetails.techniciansCount} Technicians</strong>
                  </div>
                  <div className="text-slate-500 pt-1">
                    <span className="font-medium">Warranty offered:</span> {selectedPool.bidDetails.warranty}
                  </div>
                </div>
              </div>
            )}

            {/* Tower Allocation / Service Day schedule */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#006C4A]" />
                  <span>Service-Day Tower Allocation</span>
                </h5>
                <span className="text-[11px] text-slate-500">{selectedPool.serviceDate}</span>
              </div>

              <div className="space-y-2">
                {selectedPool.towers.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-[11px] text-slate-500">{t.units} clustered bookings</div>
                    </div>

                    <div className="text-right">
                      {t.assignedTech ? (
                        <div className="text-[11px] font-semibold text-[#006C4A] bg-emerald-50 px-2 py-0.5 rounded">
                          {t.assignedTech}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">
                          Allocation in progress
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. Live Route & Gate Pass Modal
// ==========================================
interface LiveRouteModalProps {
  item: AdminDispatchItem | null;
  isOpen: boolean;
  onClose: () => void;
  onCallTech: (partner: { name: string; phone: string }) => void;
}

export const LiveRouteModal: React.FC<LiveRouteModalProps> = ({
  item,
  isOpen,
  onClose,
  onCallTech,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-[10px] font-bold text-[#006C4A] uppercase tracking-wider">
              Live Fleet Tracking
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {item.code} · {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map Simulation Box */}
        <div className="h-44 bg-slate-100 relative overflow-hidden flex items-center justify-center border-b border-slate-200">
          {/* Stylized simulated street grid */}
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#006C4A_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Animated Route Line */}
          <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-1 bg-emerald-400/50 rounded-full"></div>
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#006C4A] ring-4 ring-emerald-200 animate-pulse"></div>

          <div className="relative z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md text-xs font-bold text-slate-800 flex items-center gap-2 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{item.etaStatus || 'En route (6m away)'}</span>
          </div>

          <div className="absolute bottom-2 left-3 text-[10px] text-slate-600 font-semibold bg-white/80 px-2 py-0.5 rounded">
            GPS Signal: Strong (Hub ORR-4)
          </div>
        </div>

        {/* Details Content */}
        <div className="p-4 space-y-3 text-xs">
          {/* Security Gate Pass Verification */}
          <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-200/60 text-[#006C4A] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-emerald-950">Society Gate Pass: Active</div>
                <div className="text-[11px] text-emerald-800">
                  {item.securityPass?.passCode || 'GP-8812'} · Pre-cleared at Gate 2
                </div>
              </div>
            </div>
            <span className="text-emerald-700 font-bold text-xs bg-white px-2 py-1 rounded-lg border border-emerald-300">
              Verified
            </span>
          </div>

          {/* Location & Partner */}
          <div className="space-y-2 pt-1">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">{item.location}</div>
                <div className="text-slate-500 text-[11px]">Society Main Entrance Checkpoint</div>
              </div>
            </div>

            {item.assignedPartner && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{item.assignedPartner.name}</div>
                  <div className="text-slate-500 text-[11px]">Rating: ★ {item.assignedPartner.rating}</div>
                </div>

                <button
                  type="button"
                  onClick={() => onCallTech(item.assignedPartner!)}
                  className="px-3 py-1.5 bg-[#006C4A] text-white font-bold rounded-lg flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. Call Tech Modal
// ==========================================
interface CallTechModalProps {
  partner: { name: string; phone: string } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CallTechModal: React.FC<CallTechModalProps> = ({
  partner,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !partner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-slate-200 p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#006C4A] flex items-center justify-center mx-auto ring-8 ring-emerald-50">
          <Phone className="w-8 h-8 animate-bounce" />
        </div>

        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Calling Technician
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-0.5">
            {partner.name}
          </h3>
          <p className="text-xs text-slate-600 font-mono mt-1">
            {partner.phone}
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          Connected via NetNivas Secure Cooperative Telephony. Call recording enabled for quality assurance.
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
        >
          End Call
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 6. Cooperative Profile Modal
// ==========================================
interface CooperativeProfileModalProps {
  profile: CooperativeProfile;
  isOpen: boolean;
  onClose: () => void;
  onSwitchRole: () => void;
}

export const CooperativeProfileModal: React.FC<CooperativeProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSwitchRole,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#006C4A] text-white font-bold text-sm flex items-center justify-center shadow-xs">
              {profile.managerInitials}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {profile.managerName}
              </h3>
              <p className="text-xs text-slate-500">
                Cooperative Administrator
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Coop Credentials */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">
                {profile.cooperativeName}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-[#006C4A] font-bold text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Entity</span>
              </span>
            </div>

            <div className="text-slate-600 space-y-1">
              <div>GSTIN: <span className="font-mono font-medium text-slate-800">{profile.gstin}</span></div>
              <div>Primary Operating Society: <span className="font-medium text-slate-800">{profile.societyName}</span></div>
              <div>Hub: <span className="font-medium text-slate-800">{profile.hubLocation}</span></div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
              <div className="text-base font-extrabold text-slate-900">{profile.activeWorkersCount}</div>
              <div className="text-[10px] text-slate-500 uppercase">Technicians</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
              <div className="text-base font-extrabold text-[#006C4A]">{profile.totalCompletedJobs}</div>
              <div className="text-[10px] text-slate-500 uppercase">Jobs Done</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
              <div className="text-base font-extrabold text-amber-500">★ {profile.rating}</div>
              <div className="text-[10px] text-slate-500 uppercase">Rating</div>
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Service Clusters & Societies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {profile.serviceAreas.map(area => (
                <span key={area} className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 text-xs font-medium border border-slate-200">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Switch Role Action */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchRole();
              }}
              className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-[#006C4A] font-bold rounded-xl border border-emerald-200 flex items-center justify-center gap-2 transition"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Switch to Individual Worker App</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitchRole();
            }}
            className="text-xs text-red-600 font-semibold flex items-center gap-1 hover:underline"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
