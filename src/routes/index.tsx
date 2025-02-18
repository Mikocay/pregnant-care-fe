import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import config from '@/config';
import { ROLE } from '@/constants';
// import AdminRoutes from './AdminRoutes';

//* Layouts
import MemberHeaderLayout from '@/layouts/Member/HeaderLayout';
import MemeberSidebarLayout from '@/layouts/Member/SidebarLayout';
import PublicLayout from '@/layouts/PublicLayout';
import PrivateRoute from '@/components/Auth/PrivateRoutes';
import AuthRoutes from './AuthRoutes';
import PersistToken from '@/components/Auth/PeristLogin';

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
      ],
    },

    //* Member *
    {
      element: <MemberHeaderLayout />,
      children: [],
    },
    {
      element: <MemeberSidebarLayout />,
      children: [],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
