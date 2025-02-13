import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './state';
import { LOCAL_STOREAGE } from '@/constants';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; userRole: string }>,
    ) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem(LOCAL_STOREAGE.USER_ROLE, action.payload.userRole);
      localStorage.setItem(
        LOCAL_STOREAGE.ACCESS_TOKEN,
        action.payload.accessToken,
      );
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.userRole = null;
      localStorage.removeItem(LOCAL_STOREAGE.USER_ROLE);
      localStorage.removeItem(LOCAL_STOREAGE.ACCESS_TOKEN);
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
