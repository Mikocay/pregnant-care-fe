import config from '@/config/index';
import { lazy } from 'react';

import AdminLayout from '@/layouts/AdminLayout';

//* Lazy load pages
const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'));
const GrowthMetrics = lazy(() => import('@/pages/Admin/GrowthMetrics'));
const ManageMember = lazy(() => import('@/pages/Admin/ManageMember'));
const FormPlan = lazy(
  () => import('@/pages/Admin/ManagePlans/FormPlan/FormPlan'),
);
const ManagePlans = lazy(() => import('@/pages/Admin/ManagePlans/ManagePlans'));

// Authorization
const AdminRouter = () => {
  // const { role } = useAuth();
  // return role === Role.ADMIN ? <AdminLayout /> : <Navigate to="/" />;
  return <AdminLayout />;
};

// Define routes for admin
const AdminRoutes = {
  path: config.routes.admin.dashboard,
  element: <AdminRouter />,
  children: [
    //* Admin common routes
    { path: config.routes.admin.dashboard, element: <Dashboard /> },
    { path: config.routes.admin.manageMember, element: <ManageMember /> },
    { path: config.routes.admin.growthMatrics, element: <GrowthMetrics /> },
    { path: config.routes.admin.managePlans, element: <ManagePlans /> },
    //* Admin create routes
    { path: config.routes.admin.formPlan, element: <FormPlan /> },
  ],
};

export default AdminRoutes;
