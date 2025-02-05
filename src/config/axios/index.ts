import axios, { AxiosError } from 'axios';

const axiosClient = axios.create({
  //   baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosPrivate = axios.create({
  //   baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptors cho axiosPrivate
axiosPrivate.interceptors.request.use(
  (config) => {
    // Example get token from localStorage...
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      //   window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// Xử lý lỗi toàn cục
const handleError = (error: AxiosError) => {
  if (error.response) {
    console.error('Server Error:', error.response.data);
  } else if (error.request) {
    console.error('No Response:', error.request);
  } else {
    console.error('Error:', error.message);
  }
  return Promise.reject(error);
};

axiosClient.interceptors.response.use((response) => response, handleError);
axiosPrivate.interceptors.response.use((response) => response, handleError);

export { axiosClient, axiosPrivate };
