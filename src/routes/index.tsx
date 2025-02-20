import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import config from '@/config';
import { ROLE } from '@/constants';
import MemberHeaderLayout from '@/layouts/Member/HeaderLayout';
import MemeberSidebarLayout from '@/layouts/Member/SidebarLayout';
import ValidateEmail from '@/pages/Auth/SignUp/ConfirmEmail/emailConfirm';
import PublicLayout from '@/layouts/PublicLayout';
import PrivateRoute from '@/components/Auth/PrivateRoutes';
import AuthRoutes from './AuthRoutes';
import PersistToken from '@/components/Auth/PeristLogin';

//* Lazy load pages
const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/Auth/Login'));
const SignUp = lazy(() => import('@/pages/Auth/SignUp'));

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
