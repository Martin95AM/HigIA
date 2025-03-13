export type UserRole = 'patient' | 'ambulance' | 'hospital' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  medicalLicense?: string;
}

export interface Patient {
  id: string;
  name: string;
  symptoms: string[];
  triageLevel: 'red' | 'yellow' | 'green';
  waitTime?: number;
  position?: number;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  timestamp: Date;
  medications: string[];
  conditions: string[];
  allergies: string[];
  bloodType?: string;
  chronicConditions: string[];
  // Hash of the previous record to maintain chain integrity
  previousRecordHash: string;
  // Digital signature of the medical professional
  medicalSignature?: string;
}

export interface EmergencyRequest {
  id: string;
  patientId: string;
  timestamp: Date;
  location: string;
  symptoms: string[];
  triageLevel: 'red' | 'yellow' | 'green';
  status: 'pending' | 'assigned' | 'inProgress' | 'completed';
  estimatedArrival?: number;
}

export interface PrivatePatientData {
  id: string;
  medications: string[];
  conditions: string[];
  allergies: string[];
  bloodType: string;
  chronicConditions: string[];
}

// Mock data structure for the blockchain
export interface MedicalBlockchain {
  records: MedicalRecord[];
  getPatientHistory: (patientId: string) => MedicalRecord[];
  addRecord: (record: MedicalRecord) => void;
  verifyChain: () => boolean;
}