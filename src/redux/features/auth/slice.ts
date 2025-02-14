import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './state';
import { LoginFormData, RegisterFormData } from '../types/authType';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //* Login *******************************************************
    loginRequest: (state, _action: PayloadAction<LoginFormData>) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; userId: string }>,
    ) => {
      console.log('Login success:', action.payload.accessToken);

      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.isUser = action.payload.userId;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.isUser = null;
      state.error = null;
    },
    //* Register *******************************************************
    registerRequest: (state, _action: PayloadAction<RegisterFormData>) => {
      state.isLoading = true;
      state.error = null;
      state.registrationStatus = 'idle';
    },
    registerPendingConfirmation: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.registrationStatus = 'pending_confirmation';
      state.registeredEmail = action.payload;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //* Confirm Email *******************************************************
    confirmEmailRequest: (state, _action: PayloadAction<string>) => {
      state.isLoading = true;
      state.registrationStatus = 'confirming';
      state.error = null;
    },
    confirmEmailSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; userId: string }>,
    ) => {
      console.log('Confirm email success:', action.payload.accessToken);

      state.isLoading = false;
      state.registrationStatus = 'confirmed';
      state.accessToken = action.payload.accessToken;
      state.isUser = action.payload.userId;
      state.registeredEmail = null;
      state.error = null;
    },
    confirmEmailFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.registrationStatus = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registerPendingConfirmation,
  registerRequest,
  registerFailure,
  confirmEmailFailure,
  confirmEmailRequest,
  confirmEmailSuccess,
} = authSlice.actions;
export default authSlice.reducer;
