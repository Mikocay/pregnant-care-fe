import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import config from '@/config';
// import AdminRoutes from './AdminRoutes';

//* Layouts
import MemberHeaderLayout from '@/layouts/Member/HeaderLayout';
import MemeberSidebarLayout from '@/layouts/Member/SidebarLayout';
import PublicLayout from '@/layouts/PublicLayout';
import Logout from '@/components/Logout';

//* Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Auth/Login'));
const SignUp = lazy(() => import('@/pages/Auth/SignUp'));
const ValidateEmail = lazy(
  () => import('@/pages/Auth/SignUp/ConfirmEmail/emailConfirm'),
);
const ForgetPassword = lazy(() => import('@/pages/Auth/ForgotPassword'));

const RouterComponent = () => {
  const router = createBrowserRouter([
    //* PUBLIC routes
    {
      element: <PublicLayout />,
      children: [
        { index: true, path: config.routes.public.home, element: <Home /> },
      ],
    },

    //* AUTH routes
    { path: config.routes.auth.login, element: <Login /> },
    { path: config.routes.auth.signUp, element: <SignUp /> },
    { path: config.routes.auth.logout, element: <Logout /> },
    { path: config.routes.auth.validateEmail, element: <ValidateEmail /> },
    { path: config.routes.auth.forgotPassword, element: <ForgetPassword /> },

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
