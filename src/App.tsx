import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { 
  ScreenType, VendorProfile, ServiceRequest, NotificationSetting, 
  AppUserRole, AdminJob, AdminDispatchItem, AdminNotification, 
  AdminWorker, DemandPool, CooperativeProfile 
} from './types';
import { initialProfile, initialRequests, initialNotifications } from './data/mockData';
import { 
  initialAdminJobs, initialDispatchQueue, initialAdminNotifications, 
  initialAdminWorkers, initialDemandPools, cooperativeProfile 
} from './data/mockVendorAdminData';

import { HomeScreen } from './components/HomeScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { RequestsScreen } from './components/RequestsScreen';
import { OtpScreen } from './components/OtpScreen';
import { LoginScreen } from './components/LoginScreen';
import { ScheduleScreen } from './components/ScheduleScreen';
import { EarningsScreen } from './components/EarningsScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { CallModal } from './components/Modals';

// Admin Components
import { AdminHeader } from './components/admin/AdminHeader';
import { AdminBottomNav } from './components/admin/AdminBottomNav';
import { AdminOverviewScreen } from './components/admin/AdminOverviewScreen';
import { AdminJobsScreen } from './components/admin/AdminJobsScreen';
import { AdminDispatchScreen } from './components/admin/AdminDispatchScreen';
import { AdminNotificationsScreen } from './components/admin/AdminNotificationsScreen';
import { AdminEarningsScreen } from './components/admin/AdminEarningsScreen';
import { 
  AssignWorkerModal, 
  WorkerRosterModal, 
  DemandPoolsModal, 
  LiveRouteModal, 
  CallTechModal, 
  CooperativeProfileModal 
} from './components/admin/AdminModals';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('otp');
  const [userRole, setUserRole] = useState<AppUserRole>('admin');

  // Worker State
  const [profile, setProfile] = useState<VendorProfile>(initialProfile);
  const [requests, setRequests] = useState<ServiceRequest[]>(initialRequests);
  const [notifications, setNotifications] = useState<NotificationSetting[]>(initialNotifications);
  const [mobileNumber, setMobileNumber] = useState('98765 43210');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [callingRequest, setCallingRequest] = useState<ServiceRequest | null>(null);

  // Admin State
  const [adminJobs, setAdminJobs] = useState<AdminJob[]>(initialAdminJobs);
  const [dispatchQueue, setDispatchQueue] = useState<AdminDispatchItem[]>(initialDispatchQueue);
  const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>(initialAdminNotifications);
  const [adminWorkers, setAdminWorkers] = useState<AdminWorker[]>(initialAdminWorkers);
  const [demandPools, setDemandPools] = useState<DemandPool[]>(initialDemandPools);
  const [coopProfile, setCoopProfile] = useState<CooperativeProfile>(cooperativeProfile);

  // Admin Modals State
  const [assignTarget, setAssignTarget] = useState<AdminJob | AdminDispatchItem | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRosterModal, setShowRosterModal] = useState(false);
  const [showPoolsModal, setShowPoolsModal] = useState(false);
  const [liveRouteTarget, setLiveRouteTarget] = useState<AdminDispatchItem | null>(null);
  const [callingTech, setCallingTech] = useState<{ name: string; phone: string } | null>(null);
  const [showCoopProfileModal, setShowCoopProfileModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  // Worker Action Handlers
  const handleAcceptRequest = (id: string) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'accepted' as const } : r))
    );
    const acceptedReq = requests.find(r => r.id === id);
    showToast(`Accepted Order #${acceptedReq?.orderNumber || ''}! Added to dispatch schedule.`);
  };

  const handleDeclineRequest = (id: string) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'declined' as const } : r))
    );
    showToast('Request declined and released back to zone pool.');
  };

  const handleCompleteActiveTask = () => {
    setRequests(prev =>
      prev.map(r => (r.id === 'req-active' ? { ...r, status: 'completed' as const } : r))
    );
    setProfile(prev => ({
      ...prev,
      cleanJobsCount: prev.cleanJobsCount + 1,
      ecoPoints: prev.ecoPoints + 120,
      co2AvoidedTons: Number((prev.co2AvoidedTons + 0.012).toFixed(3)),
    }));
    showToast('Job #VX-88349 successfully completed! ₹1,200 added to settlements.');
  };

  // Admin Action Handlers
  const handleAssignWorker = (targetId: string, workerName: string, workerRating: number) => {
    // Check if in adminJobs
    setAdminJobs(prev =>
      prev.map(j =>
        j.id === targetId
          ? {
              ...j,
              status: 'assigned',
              assignedTo: {
                name: workerName,
                rating: workerRating,
                avatar: workerName.slice(0, 2).toUpperCase(),
              },
            }
          : j
      )
    );

    // Check if in dispatchQueue
    setDispatchQueue(prev =>
      prev.map(d =>
        d.id === targetId
          ? {
              ...d,
              status: 'in_transit',
              assignedPartner: {
                name: workerName,
                phone: '+91 98765 43210',
                rating: workerRating,
                avatar: workerName.slice(0, 2).toUpperCase(),
              },
            }
          : d
      )
    );

    showToast(`Technician ${workerName} assigned successfully.`);
  };

  const handleOpenAssignForJob = (job: AdminJob) => {
    setAssignTarget(job);
    setShowAssignModal(true);
  };

  const handleOpenAssignForDispatch = (item: AdminDispatchItem) => {
    setAssignTarget(item);
    setShowAssignModal(true);
  };

  const handleMarkAllNotificationsRead = () => {
    setAdminNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All administrative notifications marked as read.');
  };

  const newRequestsCount = requests.filter(r => r.status === 'new').length;
  const unreadAdminNotificationsCount = adminNotifications.filter(n => !n.isRead).length;
  const pendingDispatchesCount = dispatchQueue.filter(d => d.status === 'pending').length;

  const activeTask = requests.find(r => r.id === 'req-active') || {
    id: 'req-active',
    orderNumber: 'VX-88349',
    title: 'Electrical Inverter Maintenance',
    category: 'Electrical Maintenance',
    serviceType: 'Residential',
    price: 1200,
    priceNote: 'Online Paid',
    clientName: 'Rohit Sharma',
    clientRating: 4.9,
    location: 'Flat 402, Green Meadows, Sector 45, Gurugram',
    distance: 'Current Active',
    timeSlot: 'Slot: 02:00 PM - 04:00 PM (35m elapsed)',
    tags: ['Electrical Maintenance', 'Inverter Calibration'],
    status: 'in_progress',
    clientPhone: '+91 98765 43210',
  };

  const isAdminScreen = [
    'admin_overview',
    'admin_jobs',
    'admin_dispatch',
    'admin_earnings',
    'admin_notifications',
  ].includes(activeScreen);

  // Render current screen content
  const renderScreen = () => {
    switch (activeScreen) {
      // ---------------- Worker Screens ----------------
      case 'home':
        return (
          <HomeScreen
            profile={profile}
            setProfile={setProfile}
            onNavigate={setActiveScreen}
            notifications={notifications}
            setNotifications={setNotifications}
            activeTask={activeTask}
            onCompleteActiveTask={handleCompleteActiveTask}
            newRequestsCount={newRequestsCount}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            profile={profile}
            setProfile={setProfile}
            onNavigate={setActiveScreen}
            onLogout={() => {
              setActiveScreen('login');
              showToast('Signed out from NetNivas terminal.');
            }}
          />
        );
      case 'requests':
        return (
          <RequestsScreen
            requests={requests}
            onAcceptRequest={handleAcceptRequest}
            onDeclineRequest={handleDeclineRequest}
            onNavigate={setActiveScreen}
          />
        );
      case 'schedule':
        return (
          <ScheduleScreen
            requests={requests}
            onNavigate={setActiveScreen}
            onCallClient={setCallingRequest}
          />
        );
      case 'earnings':
        return (
          <EarningsScreen
            profile={profile}
            onNavigate={setActiveScreen}
          />
        );

      // ---------------- Admin Screens ----------------
      case 'admin_overview':
        return (
          <div className="flex-1 flex flex-col">
            <AdminHeader
              profile={coopProfile}
              unreadCount={unreadAdminNotificationsCount}
              onOpenNotifications={() => setActiveScreen('admin_notifications')}
              onOpenProfile={() => setShowCoopProfileModal(true)}
              onOpenRoster={() => setShowRosterModal(true)}
              onOpenPools={() => setShowPoolsModal(true)}
              onSwitchToWorker={() => {
                setUserRole('worker');
                setActiveScreen('home');
                showToast('Switched to Field Technician (Worker) view.');
              }}
            />
            <AdminOverviewScreen
              jobs={adminJobs}
              onNavigate={setActiveScreen}
              onAssignJob={handleOpenAssignForJob}
              onOpenRoster={() => setShowRosterModal(true)}
              onOpenPools={() => setShowPoolsModal(true)}
            />
          </div>
        );
      case 'admin_jobs':
        return (
          <AdminJobsScreen
            jobs={adminJobs}
            onBack={() => setActiveScreen('admin_overview')}
            onAssignJob={handleOpenAssignForJob}
          />
        );
      case 'admin_dispatch':
        return (
          <AdminDispatchScreen
            dispatchItems={dispatchQueue}
            onBack={() => setActiveScreen('admin_overview')}
            onAssignItem={handleOpenAssignForDispatch}
            onCallTech={partner => setCallingTech(partner)}
            onLiveRoute={item => setLiveRouteTarget(item)}
          />
        );
      case 'admin_earnings':
        return (
          <AdminEarningsScreen
            workers={adminWorkers}
            onBack={() => setActiveScreen('admin_overview')}
            onOpenRoster={() => setShowRosterModal(true)}
          />
        );
      case 'admin_notifications':
        return (
          <AdminNotificationsScreen
            notifications={adminNotifications}
            onBack={() => setActiveScreen('admin_overview')}
            onActionClick={notif => {
              if (notif.actionScreen) {
                setActiveScreen(notif.actionScreen as ScreenType);
              }
            }}
            onMarkAllRead={handleMarkAllNotificationsRead}
          />
        );

      // ---------------- Auth Screens ----------------
      case 'otp':
        return (
          <OtpScreen
            mobileNumber={mobileNumber}
            userRole={userRole}
            setUserRole={setUserRole}
            onVerifySuccess={() => {
              if (userRole === 'admin') {
                setActiveScreen('admin_overview');
                showToast('Cooperative Admin Terminal Authorized. Welcome!');
              } else {
                setActiveScreen('home');
                showToast('Terminal authorized! Welcome back, Rajesh K. Murthy.');
              }
            }}
            onBackToLogin={() => setActiveScreen('login')}
          />
        );
      case 'login':
        return (
          <LoginScreen
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            userRole={userRole}
            setUserRole={setUserRole}
            onSendOtp={() => setActiveScreen('otp')}
          />
        );
      default:
        return null;
    }
  };

  const isAuthScreen = ['login', 'otp'].includes(activeScreen);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Floating Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {renderScreen()}
      </div>

      {/* Bottom Tab Bar (Role-Specific) */}
      {!isAuthScreen && (
        isAdminScreen ? (
          <AdminBottomNav
            activeScreen={activeScreen}
            onSelectScreen={setActiveScreen}
            dispatchBadgeCount={pendingDispatchesCount}
          />
        ) : (
          <BottomNavigation
            activeScreen={activeScreen}
            onSelectScreen={setActiveScreen}
            pendingCount={newRequestsCount}
          />
        )
      )}

      {/* Worker Call Modal */}
      {callingRequest && (
        <CallModal
          request={callingRequest}
          onClose={() => setCallingRequest(null)}
        />
      )}

      {/* Admin Modals */}
      <AssignWorkerModal
        job={assignTarget}
        workers={adminWorkers}
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setAssignTarget(null);
        }}
        onConfirmAssign={handleAssignWorker}
      />

      <WorkerRosterModal
        workers={adminWorkers}
        isOpen={showRosterModal}
        onClose={() => setShowRosterModal(false)}
        onCallWorker={partner => setCallingTech(partner)}
      />

      <DemandPoolsModal
        pools={demandPools}
        isOpen={showPoolsModal}
        onClose={() => setShowPoolsModal(false)}
      />

      <LiveRouteModal
        item={liveRouteTarget}
        isOpen={!!liveRouteTarget}
        onClose={() => setLiveRouteTarget(null)}
        onCallTech={partner => setCallingTech(partner)}
      />

      <CallTechModal
        partner={callingTech}
        isOpen={!!callingTech}
        onClose={() => setCallingTech(null)}
      />

      <CooperativeProfileModal
        profile={coopProfile}
        isOpen={showCoopProfileModal}
        onClose={() => setShowCoopProfileModal(false)}
        onSwitchRole={() => {
          setUserRole('worker');
          setActiveScreen('home');
          setShowCoopProfileModal(false);
          showToast('Switched to Field Technician (Worker) view.');
        }}
      />
    </div>
  );
}
