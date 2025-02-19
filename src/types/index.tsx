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

export type UserToken = {
  email: string;
  sub: string;
  role: 'admin' | 'user' | 'guest'; // Có thể mở rộng nếu có nhiều vai trò khác
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  iat: number; // Issued At (thời điểm tạo token)
  exp: number; // Expiration (thời điểm hết hạn)
};

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
