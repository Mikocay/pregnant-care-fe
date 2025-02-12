import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
// import AdminRoutes from './AdminRoutes';

//* Layouts
import GuestLayout from '@/layouts/GuestLayout';
import MemberHeaderLayout from '@/layouts/Member/HeaderLayout';
import MemeberSidebarLayout from '@/layouts/Member/SidebarLayout';
import config from '@/config/routes';

//* Lazy load pages
const Home = lazy(() => import('@/pages/home'));

const RouterComponent = () => {
  const router = createBrowserRouter([
    //* PUBLIC routes
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
