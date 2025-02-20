import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import config from '@/config';
import LoadingPage from '@/pages/Loading';

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { userId, userRole } = useSelector((state: RootState) => state.auth);

  const isLoading = userId === null;

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={config.routes.auth.unauthorized} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
