import { lazy } from 'react';
import ROUTES from '@/config/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
// import AdminRoutes from './AdminRoutes';

//* Layouts
import GuestLayout from '@/layouts/GuestLayout';
import AdminLayout from '@/layouts/AdminLayout';
import MemberHeaderLayout from '@/layouts/Member/HeaderLayout';
import MemeberSidebarLayout from '@/layouts/Member/SidebarLayout';

//* Lazy load pages
const Home = lazy(() => import('@/pages/home'));

const RouterComponent = () => {
  const router = createBrowserRouter([
    //* PUBLIC routes
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
    AdminRoutes
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
