import { axiosClient, axiosPrivate } from '@/config/axios';
import { RegisterFormData } from '@/redux/features/types/authType';

import { API_ENDPOINTS } from '@/utils/api';
import { AxiosResponse } from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  userId: string;
}

export interface User {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    status: string;
    bloodType: string;
    nationality: string;
    dateOfBirth: string | null;
    avatarUrl: string | null;
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
  //* Get User Info *******************
  getUserInfoById: (userId: string): Promise<AxiosResponse<User>> => {
    return axiosPrivate.get(`${API_ENDPOINTS.users.oneUser}/${userId}`);

  },
};
