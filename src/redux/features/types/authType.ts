export interface UserState {
  accessToken: string | null;
  userRole: string | null;
  loading: boolean;
  error: string | null;
}
