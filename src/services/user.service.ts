import axios from 'axios';
import { axiosClient } from '@/config/axios';
import { API_ENDPOINTS } from '@/utils/api';

type LoginResponse = {
  email: string;
  password: string;
};

export const userService = {
  postLogin: async (data: LoginResponse) => {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.auth.login, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log('Error login: ', error.response.data);
        return error.response.data;
      }
      return { success: false, message: 'Error from server' };
    }
  },
};
