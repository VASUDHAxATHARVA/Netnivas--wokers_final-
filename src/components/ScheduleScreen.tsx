import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Clock, MapPin, ChevronRight, 
  CheckCircle2, Phone, Navigation, AlertTriangle, Zap, Wrench, Gauge
} from 'lucide-react';
import { ServiceRequest, ScreenType } from '../types';

interface ScheduleScreenProps {
  requests: ServiceRequest[];
  onNavigate: (screen: ScreenType) => void;
  onCallClient: (req: ServiceRequest) => void;
}

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  requests,
  onNavigate,
  onCallClient,
}) => {
  const [selectedDay, setSelectedDay] = useState<'today' | 'tomorrow' | 'upcoming'>('today');

  const scheduleSlots = [
    {
      id: 'slot-1',
      time: '02:00 PM – 04:00 PM',
      title: 'Electrical Inverter Maintenance',
      category: 'Electrical Maintenance',
      client: 'Rohit Sharma',
      location: 'Flat 402, Green Meadows, Sector 45, Gurugram',
      distance: '0.0 km (Active)',
      status: 'In Progress',
      payout: 1200,
      icon: <Zap className="w-4 h-4 text-emerald-600" />,
      iconBg: 'bg-emerald-50',
    },
    {
      id: 'slot-2',
      time: '04:30 PM – 05:30 PM',
      title: 'Electrical Wiring Inspection',
      category: 'Diagnostic Audit',
      client: 'Mrs. Kavita Sen',
      location: 'Preet Vihar, Phase 2, Gurugram',
      distance: '3.2 km away',
      status: 'Scheduled',
      payout: 850,
      icon: <Zap className="w-4 h-4 text-amber-600" />,
      iconBg: 'bg-amber-50',
    },
    {
      id: 'slot-3',
      time: '06:00 PM – 07:15 PM',
      title: 'Electrical Panel Replacement',
      category: 'Installation',
      client: 'Cyber City, Tower B (Facility Dept)',
      location: 'DLF CyberHub, Sector 24',
      distance: '6.8 km away',
      status: 'Scheduled',
      payout: 2400,
      icon: <Wrench className="w-4 h-4 text-blue-600" />,
      iconBg: 'bg-blue-50',
    },
    {
      id: 'slot-4',
      time: '07:30 PM – 08:30 PM',
      title: 'Smart Meter Diagnostics',
      category: 'IoT & Metering',
      client: 'Rameshwar Nath',
      location: 'Sector 56, DLF Phase 5',
      distance: '4.1 km away',
      status: 'Scheduled',
      payout: 650,
      icon: <Gauge className="w-4 h-4 text-purple-600" />,
      iconBg: 'bg-purple-50',
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased pb-28">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 shadow-xs">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
              Dispatcher View
            </span>
            <h1 className="text-base font-bold text-slate-900 leading-tight">Field Schedule</h1>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-800">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>4 Slots Booked</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto w-full px-4 sm:px-5 pt-4 space-y-4">
        {/* Day Carousel Selector */}
        <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
          <button 
            onClick={() => setSelectedDay('today')}
            className={`py-2 px-3 rounded-2xl border transition flex flex-col items-center ${
              selectedDay === 'today' 
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="text-[11px] opacity-80">Today</span>
            <span className="text-sm font-bold mt-0.5">Thu, 10 Sep</span>
          </button>
          <button 
            onClick={() => setSelectedDay('tomorrow')}
            className={`py-2 px-3 rounded-2xl border transition flex flex-col items-center ${
              selectedDay === 'tomorrow' 
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="text-[11px] opacity-80">Tomorrow</span>
            <span className="text-sm font-bold mt-0.5">Fri, 11 Sep</span>
          </button>
          <button 
            onClick={() => setSelectedDay('upcoming')}
            className={`py-2 px-3 rounded-2xl border transition flex flex-col items-center ${
              selectedDay === 'upcoming' 
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="text-[11px] opacity-80">Upcoming</span>
            <span className="text-sm font-bold mt-0.5">Weekend</span>
          </button>
        </div>

        {/* Route Optimization Summary Card */}
        <div className="bg-emerald-900 text-white rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-200 text-xs font-semibold">
              <Navigation className="w-3.5 h-3.5" />
              <span>Smart Eco-Route Calculated</span>
            </div>
            <p className="text-base font-bold text-white mt-1">14.1 km Total Transit</p>
            <p className="text-[11px] text-emerald-300">Saves ~2.8 kg CO2 vs unsequenced driving</p>
          </div>
          <button 
            onClick={() => alert('GPS transit directions dispatched to your mobile navigation app.')}
            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-95"
          >
            Start Route
          </button>
        </div>

        {/* Timeline slots list */}
        <div className="space-y-3">
          {scheduleSlots.map((slot, idx) => (
            <div 
              key={slot.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs relative overflow-hidden"
            >
              {slot.status === 'In Progress' && (
                <div className="absolute top-0 right-0 w-2 h-full bg-amber-500"></div>
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${slot.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                    {slot.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{slot.time}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        slot.status === 'In Progress' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {slot.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">{slot.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{slot.client}</p>
                    <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{slot.location} ({slot.distance})</span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-base font-extrabold text-emerald-700 font-manrope">
                    ₹{slot.payout.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action row */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-medium">Auto-synced with NetNivas Dispatch</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onCallClient({
                      id: slot.id,
                      orderNumber: 'VX-88349',
                      title: slot.title,
                      category: slot.category,
                      serviceType: 'Residential',
                      price: slot.payout,
                      priceNote: 'Scheduled',
                      clientName: slot.client,
                      clientRating: 4.9,
                      location: slot.location,
                      distance: slot.distance,
                      timeSlot: slot.time,
                      tags: [],
                      status: 'accepted',
                      clientPhone: '+91 98765 43210'
                    })}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>Call</span>
                  </button>
                  <button 
                    onClick={() => alert(`Opening navigation to ${slot.location}`)}
                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg font-semibold flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3 text-emerald-700" />
                    <span>Navigate</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
