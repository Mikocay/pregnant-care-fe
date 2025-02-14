import { AuthState } from '../types/authType';

export const initialState: AuthState = {
  isLoading: false,
  error: null,
  accessToken: null,
  isUser: '',
  registrationStatus: 'idle',
  registeredEmail: null,
};
