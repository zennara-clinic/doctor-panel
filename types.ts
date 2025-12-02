
export enum Screen {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  PATIENT_OVERVIEW = 'PATIENT_OVERVIEW',
  VIEW_LAST_PRESCRIPTION = 'VIEW_LAST_PRESCRIPTION',
  CONSULTATION_SESSION = 'CONSULTATION_SESSION',
  CONSULTATION = 'CONSULTATION',
  REVIEW = 'REVIEW',
  SUCCESS = 'SUCCESS',
  DRAFTS = 'DRAFTS',
  SEARCH = 'SEARCH',
  HISTORY_PATIENT_LIST = 'HISTORY_PATIENT_LIST',
  HISTORY = 'HISTORY',
  SETTINGS = 'SETTINGS',
  HELP = 'HELP',
  TREATMENT = 'TREATMENT',
  TEMPLATE_MANAGEMENT = 'TEMPLATE_MANAGEMENT',
  NOTIFICATIONS = 'NOTIFICATIONS'
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  status: 'Waiting' | 'Scheduled' | 'Completed';
  waitTime?: number; // minutes
  allergies?: string[];
  lastVisit?: string;
  photoUrl: string;
}

export enum PrescriptionMode {
  TEMPLATE = 'TEMPLATE',
  PHOTO = 'PHOTO',
  PEN = 'PEN'
}

export interface PrescriptionData {
  diagnosis: string;
  medications: Medication[];
  instructions: string;
  mode: PrescriptionMode;
  photoData?: string; // Base64
  penData?: string; // Canvas data URL
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
}

export interface UserSession {
  name: string;
  id: string;
  notifications: number;
}