export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'doctor';
  profileComplete?: boolean;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: string;
  allergies?: string[];
  medications?: string[];
  doctorId?: string;
  goals?: Goal[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialty: string;
  licenseNumber: string;
  availability: TimeSlot[];
  patients?: string[];
}

export interface Goal {
  id: string;
  type: 'steps' | 'water' | 'sleep' | 'exercise' | 'medication';
  target: number;
  current: number;
  unit: string;
  date: string;
}

export interface TimeSlot {
  id: string;
  start: string;
  end: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'patient' | 'doctor') => Promise<void>;
  logout: () => void;
  signup: (userData: Partial<User>) => Promise<void>;
  loading: boolean;
}