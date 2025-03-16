import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import config from '@/config';
import { ROLE } from '@/constants';
import PrivateRoute from '@/components/Auth/PrivateRoutes';
import PersistToken from '@/components/Auth/PeristLogin';

//* Routes
import AdminRoutes from './AdminRoutes';
import MemberRoutes from './MemberRoutes';
import AuthRoutes from './AuthRoutes';

//* Layouts
import PublicLayout from '@/layouts/PublicLayout';

//* Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const PricingPage = lazy(() => import('@/pages/Pricing'));
const AddPaymentMethod = lazy(() => import('@/pages/Payment/AddPaymentMethod'));
const Checkout = lazy(() => import('@/pages/Payment/Checkout'));

const RouterComponent = () => {
  const router = createBrowserRouter([
    //* PUBLIC routes
    {
      element: <PublicLayout />,
      children: [
        { index: true, path: config.routes.public.home, element: <Home /> },
        {
          path: config.routes.public.pricing,
          element: <PricingPage />,
        },
        {
          path: config.routes.auth.payment_method,
          element: <AddPaymentMethod />,
        },
        {
          path: config.routes.auth.checkout,
          element: <Checkout />,
        },
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
        //* Member routes *
        {
          element: <PrivateRoute allowedRoles={[ROLE.MEMBER]} />,
          children: [...MemberRoutes],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterComponent;
