import { axiosClient } from '@/config/axios';
import { API_ENDPOINTS } from '@/utils/api';
import { AxiosResponse } from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    // thêm các trường khác của user nếu cần
  };
}

export const userService = {
  postLogin: (payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> => {
    console.log(API_ENDPOINTS.auth.login);

    return axiosClient.post(API_ENDPOINTS.auth.login, payload);
  },
};
