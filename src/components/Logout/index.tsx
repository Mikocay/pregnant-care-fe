import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/redux/features/auth/slice'; // Nếu bạn dùng Redux để quản lý auth
import config from '@/config';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout()); // Cập nhật trạng thái redux nếu cần

    // Điều hướng về trang login hoặc trang home
    navigate(config.routes.auth.login);
  }, [dispatch, navigate]);

  return null; // Hoặc có thể không render gì cả
};

export default Logout;
