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
  key: string;
  avatar: string;
  packageName: string;
  features: string[];
  price: number;
  dateCreate: string;
}
