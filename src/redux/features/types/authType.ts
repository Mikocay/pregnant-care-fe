export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
}

export interface UserState {
  accessToken: string | null;
  userRole: string | null;
  loading: boolean;
  error: string | null;
}


export interface ResetPasswordForm {
  token: string;
  newPassword: string;
}
export interface AuthState {
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  userId: string;
  userRole: string;
  registrationStatus:
  | 'idle'
  | 'pending_confirmation'
  | 'confirming'
  | 'confirmed'
  | 'failed';
  registeredEmail: string | null;
}
