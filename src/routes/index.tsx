import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
// import AdminRoutes from './AdminRoutes';

//* Lazy load pages
const Home = lazy(() => import('@/pages/home'));
const Counter = lazy(() => import('@/pages/counter'));


const RouterComponent = () => {
  const router = createBrowserRouter([
    //* PUBLIC routes
    { index: true, path: '/', element: <Home /> },

    //! Test page
    { path: '/counter', element: <Counter /> },
    //* PRIVATE routes
    AdminRoutes
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
