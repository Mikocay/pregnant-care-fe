import { AuthState } from '../types/authType';

export const initialState: AuthState = {
  isLoading: false,
  error: null,
  accessToken: localStorage.getItem('accessToken'),
  userId: localStorage.getItem('userId') || '',
  userRole: localStorage.getItem('userRole') || '',
  registrationStatus: 'idle',
  registeredEmail: null,
  // waitingForConfirmation: false,
};
