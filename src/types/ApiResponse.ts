export interface ApiResponse<T> {
  data: {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
  statusCode: number;
  success: boolean;
}
