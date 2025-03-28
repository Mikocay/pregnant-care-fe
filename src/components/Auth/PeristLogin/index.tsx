import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store'; // Đảm bảo đường dẫn đúng
import config from '@/config';
import LoadingPage from '@/pages/Loading';
import { logout } from '@/redux/features/auth/slice';
import { isTokenExpired } from '@/utils/token/isTokenExpired';

const PersistToken = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

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
