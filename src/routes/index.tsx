import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import config from '@/config';
import { ROLE } from '@/constants';
import MemberHeaderLayout from '@/layouts/Member/HeaderLayout';
import MemeberSidebarLayout from '@/layouts/Member/SidebarLayout';
import PrivateRoute from '@/components/Auth/PrivateRoutes';
import PersistToken from '@/components/Auth/PeristLogin';

//* Routes
import AdminRoutes from './AdminRoutes';
import MemberRoutes from './MemberRoutes';
import AuthRoutes from './AuthRoutes';

//* Layouts
import PublicLayout from '@/layouts/PublicLayout';

//* Lazy load pages
const Home = lazy(() => import('@/pages/Home'));

const RouterComponent = () => {
  const router = createBrowserRouter([
    //* PUBLIC routes
    {
      element: <PublicLayout />,
      children: [
        { index: true, path: config.routes.public.home, element: <Home /> },
      ],
    },

    //* AUTH routes *
    ...AuthRoutes,

    //**** PRIVATE routes ****
    {
      element: <PersistToken />,
      children: [
        //* Admin routes *
        {
          element: <PrivateRoute allowedRoles={[ROLE.ADMIN]} />,
          children: [AdminRoutes],
        },
        //* Member routes *
        {
          element: <PrivateRoute allowedRoles={[ROLE.MEMBER]} />,
          children: [MemberRoutes],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
