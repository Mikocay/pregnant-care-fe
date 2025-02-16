import { axiosClient } from '@/config/axios';
import {
  RegisterFormData,
  ResetPasswordForm,
} from '@/redux/features/types/authType';
import { API_ENDPOINTS } from '@/utils/api';
import { AxiosResponse } from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    // thêm các trường khác của user nếu cần
  };
}

export const userService = {
  //* Login *******************
  postLogin: (payload: LoginPayload): Promise<AxiosResponse<AuthResponse>> => {
    return axiosClient.post(API_ENDPOINTS.auth.login, payload);
  },
  //* Register *******************
  postRegister: (
    payload: RegisterFormData,
  ): Promise<AxiosResponse<{ message: string }>> => {
    return axiosClient.post(API_ENDPOINTS.auth.signUp, payload);
  },
  //* Confirm Email *******************
  confirmEmail: (token: string): Promise<AxiosResponse<AuthResponse>> => {
    return axiosClient.post(API_ENDPOINTS.auth.comfirmEmail, { token });
  },
  //* Reset Password *******************
  requestResetPassword: (
    email: string,
  ): Promise<AxiosResponse<{ message: string }>> => {
    return axiosClient.post(API_ENDPOINTS.auth.resetPasswordRequest, { email });
  },
  resetPassword: (
    payload: ResetPasswordForm,
  ): Promise<AxiosResponse<{ message: string }>> => {
    return axiosClient.post(API_ENDPOINTS.auth.resetPassword, {
      payload,
    });
  },
};
