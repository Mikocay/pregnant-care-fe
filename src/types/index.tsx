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

interface Week {
  week: number;
  min: number;
  max: number;
}
export interface FetusStandard {
  _id: string;
  name: string;
  unit: string;
  weeks: Week[];
  isDeleted: boolean;
  createdAt: string;
}

export interface ICreateBlog {
  title: string;
  description: string;
  content: string;
  author: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  featureImageUrls: string[];
  isActive: boolean;
  publishedAt: string | null;
}

export interface Fetus {
  id: string;
  name: string;
  dueDate: number;
  gender: 'male' | 'female';
}

export interface Fetus {
  _id: string;
  name: string;
  dueDate: number;
  gender: 'male' | 'female';
  isDeleted: boolean;
  metrics: GrowthMetricByWeek[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface FetusStandardSummary {
  name: string;
  unit: string;
}

export interface GrowthMetricData {
  name: string;
  unit: string;
  value: number;
}

export interface GrowthMetricByWeek {
  week: number;
  data: GrowthMetricData[];
}

export interface GrowthMetric {
  name: string;
  unit: string;
  value: number;
}

export interface PaginationResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: T[];
    pagination: {
      total: number;
      pageSize: number;
      current: number;
      next: number | null;
      prev: number | null;
    };
  };
}
