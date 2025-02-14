import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
// import AdminRoutes from './AdminRoutes';

//* Layouts
import GuestLayout from '@/layouts/GuestLayout';
import MemberHeaderLayout from '@/layouts/Member/HeaderLayout';
import MemeberSidebarLayout from '@/layouts/Member/SidebarLayout';
import config from '@/config/routes';
import ValidateEmail from '@/pages/Auth/SignUp/ConfirmEmail/emailConfirm';

//* Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Auth/Login'));
const SignUp = lazy(() => import('@/pages/Auth/SignUp'));

const RouterComponent = () => {
  const router = createBrowserRouter([
    //* PUBLIC routes
    { path: config.routes.auth.login, element: <Login /> },
    { path: config.routes.auth.signUp, element: <SignUp /> },
    { path: '/users/validate-email', element: <ValidateEmail /> },
    {
      element: <GuestLayout />,
      children: [
        { index: true, path: config.routes.public.home, element: <Home /> },
      ],
    },

    //**** PRIVATE routes ****

    //* Admin *
    AdminRoutes,

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
