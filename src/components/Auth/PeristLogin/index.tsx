import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store'; // Đảm bảo đường dẫn đúng
import config from '@/config';
import LoadingPage from '@/pages/Loading';
import { jwtDecode } from 'jwt-decode';
import { UserToken } from '@/types';
import { logout } from '@/redux/features/auth/slice';

const PersistToken = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  //* Check if token is expired
  const isTokenExpired = (token: string | null) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode<UserToken>(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  useEffect(() => {
    const checkAccessToken = () => {
      if (!accessToken || isTokenExpired(accessToken)) {
        console.log('Token is expired or not found');
        dispatch(logout());
        navigate(config.routes.auth.login);
      } else {
        setIsLoading(false);
      }
    };

    checkAccessToken();
  }, [accessToken, navigate, dispatch]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <Outlet />;
};

export default PersistToken;
