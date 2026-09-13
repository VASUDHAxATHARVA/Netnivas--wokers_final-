export type ScreenType = 
  | 'home' 
  | 'requests' 
  | 'schedule' 
  | 'earnings' 
  | 'profile' 
  | 'login' 
  | 'otp'
  | 'admin_overview'
  | 'admin_jobs'
  | 'admin_dispatch'
  | 'admin_earnings'
  | 'admin_notifications'
  | 'admin_roster'
  | 'admin_pools';

export type UserRole = 'vendor' | 'customer';

export type AppUserRole = 'worker' | 'admin';

export type RequestStatus = 'new' | 'accepted' | 'in_progress' | 'completed' | 'declined';

export interface ServiceRequest {
  id: string;
  orderNumber: string;
  title: string;
  category: string;
  serviceType: 'Residential' | 'Commercial';
  price: number;
  priceNote: string;
  clientName: string;
  clientRating: number;
  location: string;
  distance: string;
  timeSlot: string;
  tags: string[];
  status: RequestStatus;
  isUrgent?: boolean;
  expiresInMinutes?: number;
  requestedAgo?: string;
  clientPhone?: string;
}

export interface VendorProfile {
  name: string;
  companyName: string;
  id: string;
  tier: string;
  rating: number;
  reviewCount: number;
  avatarUrl: string;
  specializations: string[];
  gstin: string;
  contractorLicense: string;
  contractorExpiry: string;
  bankAccount: string;
  serviceRadius: number;
  serviceRadiusArea: string;
  workingHours: string;
  vehicleDetails: string;
  language: string;
  co2AvoidedTons: number;
  cleanJobsCount: number;
  ecoPoints: number;
  isOnline: boolean;
  sosDispatchEnabled: boolean;
}

export interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  isPriority?: boolean;
  iconType: 'inverter' | 'panel' | 'meter' | 'solar' | 'sos';
}

// ---------------- Admin / Cooperative Types ----------------
export type AdminJobStatus = 'needs_assignment' | 'assigned' | 'in_progress' | 'completed';

export interface AdminJob {
  id: string;
  code: string; // e.g. #NN-4091
  title: string;
  category: string;
  time: string; // e.g. 10:30 AM
  dateCategory: 'today_24' | 'tomorrow_25' | 'sat_26' | 'sun_27';
  price: number;
  status: AdminJobStatus;
  statusLabel?: string;
  assignedWorker?: string;
  assignedWorkerRating?: number;
  isUrgent?: boolean;
  location: string;
  towerFlat?: string;
}

export type DispatchStatusType = 'urgent' | 'pending' | 'in_transit' | 'assigned';

export interface AdminDispatchItem {
  id: string;
  code: string; // e.g. #DSP-810
  title: string;
  time: string;
  statusNote: string; // e.g. "Needs assignment", "In transit (Gate 2)", "Pending departure"
  statusType: DispatchStatusType;
  assignedPartner?: {
    name: string;
    rating: number;
    phone: string;
  };
  securityPass?: {
    status: 'Gate Verified' | 'Pending Approval' | 'Expired';
    passCode: string;
  };
  etaStatus?: string; // "En route (6m away)"
  location: string; // "Prestige Falcon City · T-B..."
  isExpanded?: boolean;
}

export interface AdminNotification {
  id: string;
  type: 'urgent' | 'gate_pass' | 'jobs' | 'dispatch' | 'info';
  title: string;
  subtitle: string;
  timeAgo: string;
  actionType: 'assign' | 'renew' | 'view';
  isUrgent?: boolean;
  targetId?: string;
}

export interface AdminWorker {
  id: string;
  name: string;
  phone: string;
  rating: number;
  skills: string[];
  status: 'active' | 'on_job' | 'en_route' | 'available' | 'off_duty';
  jobsCompletedToday: number;
  currentAssignment?: string;
  location: string;
  avatarInitials: string;
}

export interface DemandPool {
  id: string;
  society: string;
  societyCode: string;
  serviceType: string;
  requestCount: number;
  estValue: number;
  currentBidStatus: 'bidding_open' | 'bid_submitted' | 'accepted' | 'rejected';
  bidDetails?: {
    pricePerUnit: number;
    totalBid: number;
    warranty: string;
    techniciansCount: number;
    submissionDate: string;
  };
  serviceDate: string;
  towers: {
    name: string;
    units: number;
    assignedTech?: string;
  }[];
}

export interface CooperativeProfile {
  name: string;
  cooperativeName: string;
  managerName: string;
  managerInitials: string;
  societyName: string;
  city: string;
  verifiedStatus: boolean;
  activeWorkersCount: number;
  totalCompletedJobs: number;
  rating: number;
  reviewCount: number;
  serviceAreas: string[];
  gstin: string;
  hubLocation: string;
}
