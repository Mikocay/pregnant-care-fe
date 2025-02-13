import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import axios from 'axios';

export const useLogin = () => {
  const dispatch = useDispatch();

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { email, password },
      );

      const { token, userRole } = response.data; // Giả sử BE trả về token & role

      // Lưu token vào localStorage
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userRole', userRole);

      // Cập nhật Redux
      dispatch(login({ token, userRole }));

      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: 'Đăng nhập thất bại' };
    }
  };

  return { loginUser };
};
