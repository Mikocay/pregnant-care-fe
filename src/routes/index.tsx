import { lazy } from 'react';
import ROUTES from '@/config/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//* Layouts
import GuestLayout from '@/layouts/GuestLayout';
import AdminLayout from '@/layouts/AdminLayout';
import MemberHeaderLayout from '@/layouts/Member/HeaderLayout';
import MemeberSidebarLayout from '@/layouts/Member/SidebarLayout';

//* Lazy load pages
const Home = lazy(() => import('@/pages/home'));
const Login = lazy(() => import('@/pages/auth/Login'));
const SignUp = lazy(() => import('@/pages/auth/SignUp'));

const RouterComponent = () => {
  const router = createBrowserRouter([
    //* PUBLIC routes
    { path: ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.SIGNUP, element: <SignUp /> },
    {
      element: <GuestLayout />,
      children: [{ index: true, path: ROUTES.HOME, element: <Home /> }],
    },

    //**** PRIVATE routes ****

    //* Admin *
    {
      element: <AdminLayout />,
      children: [],
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
