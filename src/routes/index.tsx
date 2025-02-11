import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
