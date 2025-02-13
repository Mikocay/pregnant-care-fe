export interface User {
  id: string;
  email: string;
  // thêm các trường khác của user nếu cần
}
interface AuthState {
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  user: User | null;
}

export const initialState: AuthState = {
  isLoading: false,
  error: null,
  accessToken: null,
  user: null,
};
