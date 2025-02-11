import { lazy } from 'react';
import ROUTES from '@/config/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuestLayout from '@/layouts/GuestLayout';

//* Lazy load pages
const Home = lazy(() => import('@/pages/home'));
const Counter = lazy(() => import('@/pages/counter'));

const RouterComponent = () => {
  const router = createBrowserRouter([
    //* PUBLIC routes
    {
      element: <GuestLayout />,
      children: [{ index: true, path: ROUTES.HOME, element: <Home /> }],
    },
    //! Test page
    { path: '/counter', element: <Counter /> },
    //* PRIVATE routes
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
