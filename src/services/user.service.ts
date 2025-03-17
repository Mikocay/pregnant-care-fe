import { axiosClient, axiosPrivate } from '@/config/axios';
import { RegisterFormData } from '@/redux/features/types/authType';
import { User } from '@/types';

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

export interface Data {
  data: User;
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

  //* Get Payment Methods *******************
  getPaymentMethods: () => {
    return axiosPrivate.get(`${API_ENDPOINTS.users.payment_method}`);
  },

  postPaymentMethod: (payload: any) => {
    return axiosPrivate.post(`${API_ENDPOINTS.users.payment_method}`, payload);
  },

  postPaymentIntent: (payload: any) => {
    return axiosPrivate.post(`${API_ENDPOINTS.users.payment_intent}`, payload);
  },

  postPaymentIntentConfirm: (payload: any) => {
    return axiosPrivate.post(
      `${API_ENDPOINTS.users.payment_intent_confirm}`,
      payload,
    );
  },

  //* Get User Self Info *******************
  getUserSelfInfo: (): Promise<AxiosResponse<Data>> => {
    return axiosPrivate.get(API_ENDPOINTS.users.selfUser);
  },
};
