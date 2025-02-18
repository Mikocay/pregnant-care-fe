import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/redux/features/auth/slice'; // Nếu bạn dùng Redux để quản lý auth
import config from '@/config';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate(config.routes.auth.login);
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
