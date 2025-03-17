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

  // Get User by Admin
  getUser: (page: number, limit: number): Promise<AxiosResponse> => {
    console.log('page', page);
    console.log('limit', limit);
    const response = axiosPrivate.get(`${API_ENDPOINTS.users.allUsers}?page=${page}&limit=${limit}`);
    console.log("response", response);
    return response;
  },

  // Create User by Admin
  createUser: (email: string, password: string): Promise<AxiosResponse> => {
    return axiosPrivate.post(API_ENDPOINTS.users.allUsers, { email, password });
  },

  // Edit User by Admin
  editUser: (id: string, body: User): Promise<AxiosResponse> => {
    return axiosPrivate.put(`${API_ENDPOINTS.users.allUsers}/${id}`, body);
  },

  // Delete User by Admin
  deleteUser: (id: string): Promise<AxiosResponse> => {
    return axiosPrivate.delete(`${API_ENDPOINTS.users.allUsers}/${id}`);
  }
};
