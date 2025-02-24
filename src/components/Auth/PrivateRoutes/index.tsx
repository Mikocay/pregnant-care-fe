import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import config from '@/config';
import LoadingPage from '@/pages/Loading';
import { ROLE } from '@/constants';

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { userId, userRole } = useSelector((state: RootState) => state.auth);

  const isLoading = userId === null;

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!allowedRoles.includes(userRole) && userRole !== ROLE.ADMIN) {
    return <Navigate to={config.routes.auth.unauthorized} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
