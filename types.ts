
export enum BloodGroup {
  APos = 'A+',
  ANeg = 'A-',
  BPos = 'B+',
  BNeg = 'B-',
  ABPos = 'AB+',
  ABNeg = 'AB-',
  OPos = 'O+',
  ONeg = 'O-'
}

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  location: { lat: number; lng: number };
  lastDonationDate: string;
  points: number;
  isVerified: boolean;
}

export interface Request {
  id: string;
  patientName: string;
  age: number;
  bloodGroup: BloodGroup;
  hospital: string;
  urgency: 'Critical' | 'High' | 'Normal';
  unitsNeeded: number;
  timestamp: number;
}
