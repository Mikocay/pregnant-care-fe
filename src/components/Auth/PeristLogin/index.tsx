import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store'; // Đảm bảo đường dẫn đúng
import config from '@/config';
import LoadingPage from '@/pages/Loading';

const PersistToken = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAccessToken = () => {
      if (!accessToken) {
        navigate(config.routes.auth.login);
      } else {
        setIsLoading(false);
      }
    };

    checkAccessToken();
  }, [accessToken, navigate]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <Outlet />;
};

export default PersistToken;
