import { UserState } from '../types/authType';

export const initialState: UserState = {
  accessToken: localStorage.getItem('accessToken') || null,
  userRole: localStorage.getItem('role') || null,
  loading: false,
  error: null,
};
