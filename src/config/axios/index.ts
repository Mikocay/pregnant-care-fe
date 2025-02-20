import axios, { AxiosError } from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
// Interceptors cho axiosPrivate
axiosPrivate.interceptors.request.use(
  (config) => {
    // ********** Example **********
    //! lấy token & userRole từ redux store
    const token = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('userRole');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (userRole) {
      config.headers['X-User-Role'] = userRole;
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
      // Xử lý khi bị unauthorized
      console.error('Unauthorized! Redirecting to login...');
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
