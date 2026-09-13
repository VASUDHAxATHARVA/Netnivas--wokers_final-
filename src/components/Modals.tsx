import React, { useState } from 'react';
import { 
  Phone, PhoneOff, Mic, Volume2, MessageSquare, CheckCircle, 
  X, Shield, Award, Calendar, Download, MapPin, ArrowRight
} from 'lucide-react';
import { ServiceRequest, VendorProfile } from '../types';

interface CallModalProps {
  request: ServiceRequest;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ request, onClose }) => {
  const [isCalling, setIsCalling] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-center relative overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner mb-4">
          <Phone className="w-9 h-9 animate-pulse" />
        </div>

        <h3 className="text-xl font-bold text-slate-900">{request.clientName}</h3>
        <p className="text-sm text-slate-500 font-medium mt-0.5">{request.clientPhone || '+91 98765 43210'}</p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full mt-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          {isCalling ? 'Connecting Encrypted Call...' : 'Call Ended'}
        </div>

        <p className="text-xs text-slate-400 mt-2">Order #{request.orderNumber} • {request.title}</p>

        <div className="grid grid-cols-3 gap-3 my-6">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition text-xs font-medium ${
              isMuted ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Mic className="w-5 h-5" />
            <span>{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>
          <button 
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition text-xs font-medium ${
              isSpeaker ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Volume2 className="w-5 h-5" />
            <span>Speaker</span>
          </button>
          <a 
            href={`https://wa.me/919876543210?text=Hello%20${encodeURIComponent(request.clientName)},%20this%20is%20NetNivas%20technician%20regarding%20booking%20${request.orderNumber}`}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex flex-col items-center justify-center gap-1.5 transition text-xs font-medium"
          >
            <MessageSquare className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 active:scale-95 transition"
        >
          <PhoneOff className="w-5 h-5" />
          <span>End Call</span>
        </button>
      </div>
    </div>
  );
};

interface CompleteModalProps {
  request: ServiceRequest;
  onComplete: () => void;
  onClose: () => void;
}

export const CompleteModal: React.FC<CompleteModalProps> = ({ request, onComplete, onClose }) => {
  const [checklist, setChecklist] = useState({
    multimeter: true,
    safetyEarth: true,
    sealApplied: true,
    customerSignature: true
  });
  const [notes, setNotes] = useState('Inverter voltage tuned to 230V ±2%. Terminal screws torqued. Certified safe.');

  const toggleItem = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked = Object.values(checklist).every(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-left relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Complete Job & Handover</h3>
            <p className="text-xs text-slate-500 font-medium">Order #{request.orderNumber} • ₹{request.price.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-2xl mb-4">
          <p className="text-xs text-emerald-900 font-semibold">{request.title}</p>
          <p className="text-[11px] text-emerald-700/90 mt-0.5">{request.clientName} • {request.location}</p>
        </div>

        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Field Safety & Quality Checklist</h4>
        <div className="space-y-2 mb-4">
          <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition text-xs font-medium text-slate-800">
            <input 
              type="checkbox" 
              checked={checklist.multimeter} 
              onChange={() => toggleItem('multimeter')} 
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" 
            />
            <span>Voltage & insulation resistance calibrated</span>
          </label>
          <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition text-xs font-medium text-slate-800">
            <input 
              type="checkbox" 
              checked={checklist.safetyEarth} 
              onChange={() => toggleItem('safetyEarth')} 
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" 
            />
            <span>Earth leak circuit breaker (ELCB) tested</span>
          </label>
          <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition text-xs font-medium text-slate-800">
            <input 
              type="checkbox" 
              checked={checklist.sealApplied} 
              onChange={() => toggleItem('sealApplied')} 
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" 
            />
            <span>NetNivas Eco-Safe audit sticker attached</span>
          </label>
          <label className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition text-xs font-medium text-slate-800">
            <input 
              type="checkbox" 
              checked={checklist.customerSignature} 
              onChange={() => toggleItem('customerSignature')} 
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" 
            />
            <span>Client inspection & digital handover acknowledged</span>
          </label>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-700 mb-1">Technician Work Summary / Remarks</label>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button 
            onClick={onComplete}
            disabled={!allChecked}
            className={`py-2.5 px-4 rounded-xl text-xs font-semibold text-white transition flex items-center justify-center gap-2 shadow-sm ${
              allChecked ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-95' : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Confirm Complete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface EditProfileModalProps {
  profile: VendorProfile;
  onSave: (updated: Partial<VendorProfile>) => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, onSave, onClose }) => {
  const [name, setName] = useState(profile.name);
  const [companyName, setCompanyName] = useState(profile.companyName);
  const [tier, setTier] = useState(profile.tier);
  const [bankAccount, setBankAccount] = useState(profile.bankAccount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, companyName, tier, bankAccount });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-left relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-slate-900 mb-1">Edit Vendor Profile</h3>
        <p className="text-xs text-slate-500 mb-4">Update registered partner identity and account details</p>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Technician Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
              required 
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Business / Enterprise Name</label>
            <input 
              type="text" 
              value={companyName} 
              onChange={e => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
              required 
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Certification Tier</label>
            <select 
              value={tier} 
              onChange={e => setTier(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
            >
              <option value="Tier 4 Master Tech">Tier 4 Master Tech (Expert Level)</option>
              <option value="Tier 3 Senior Tech">Tier 3 Senior Tech</option>
              <option value="Tier 2 Certified Tech">Tier 2 Certified Tech</option>
              <option value="Solar Specialist">Solar & Microgrid Specialist</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Direct Settlement Account</label>
            <input 
              type="text" 
              value={bankAccount} 
              onChange={e => setBankAccount(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
              required 
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ServiceRadiusModalProps {
  currentRadius: number;
  currentArea: string;
  onSave: (radius: number, area: string) => void;
  onClose: () => void;
}

export const ServiceRadiusModal: React.FC<ServiceRadiusModalProps> = ({ 
  currentRadius, currentArea, onSave, onClose 
}) => {
  const [radius, setRadius] = useState(currentRadius);
  const [area, setArea] = useState(currentArea);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-left relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
          <MapPin className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">Operational Service Radius</h3>
        <p className="text-xs text-slate-500 mb-4">Set maximum distance for receiving instant dispatches & SOS alerts</p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-800 mb-2">
              <span>Coverage Range</span>
              <span className="text-emerald-700 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                {radius} km
              </span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="25" 
              value={radius} 
              onChange={e => setRadius(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>2 km (Local)</span>
              <span>12 km</span>
              <span>25 km (Metro)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Base Subzone</label>
            <select 
              value={area}
              onChange={e => setArea(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
            >
              <option value="South Bengaluru">South Bengaluru (Koramangala, HSR, Jayanagar)</option>
              <option value="Gurugram Central">Gurugram Central (DLF, CyberHub, Sector 45-56)</option>
              <option value="Navi Mumbai">Navi Mumbai (Kharghar, Seawoods, Nerul)</option>
              <option value="East Bengaluru">East Bengaluru (Whitefield, Indiranagar)</option>
            </select>
          </div>

          <div className="pt-2 flex gap-2">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-300 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                onSave(radius, area);
                onClose();
              }}
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white rounded-xl shadow-sm"
            >
              Update Radius
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LedgerModalProps {
  onClose: () => void;
}

export const LedgerModal: React.FC<LedgerModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-left relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Carbon Dividend Ledger</h3>
            <p className="text-xs text-slate-500 font-medium">Verified Clean Grid & Safety Offsets</p>
          </div>
        </div>

        <div className="bg-emerald-900 text-white rounded-2xl p-4 mb-4">
          <div className="flex justify-between items-center text-xs text-emerald-200">
            <span>Available Eco Points</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-white font-mono">Q3 Pool</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">18,450 pts</div>
          <p className="text-[11px] text-emerald-300 mt-1">₹3,690 estimated monthly dividend distribution on 1st Oct</p>
        </div>

        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Recent Verified Offsets</h4>
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-900">Inverter Efficiency Calibration</p>
              <p className="text-[10px] text-slate-400">Green Meadows Sector 45 • +12 kg CO2 offset</p>
            </div>
            <span className="font-bold text-emerald-700">+120 pts</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-900">EV Level-2 Fast Charger Setup</p>
              <p className="text-[10px] text-slate-400">DLF Cyber City • +48 kg CO2 offset</p>
            </div>
            <span className="font-bold text-emerald-700">+480 pts</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-900">Rooftop Solar Array Diagnostic</p>
              <p className="text-[10px] text-slate-400">Seawoods Palm Grove • +35 kg CO2 offset</p>
            </div>
            <span className="font-bold text-emerald-700">+350 pts</span>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
        >
          Close Ledger
        </button>
      </div>
    </div>
  );
};
