export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
  bloodType: string;
  nationality: string;
  dateOfBirth: string | null;
  avatarUrl: string | null;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  isActive: boolean;
  benefits: string[];
  createdAt: string;
}

interface Week {
  week: number;
  min: number;
  max: number;
}
export interface FetusStandard {
  name: string;
  unit: string;
  weeks: Week[];
  isDeleted: boolean;
  createdAt: string;
}

