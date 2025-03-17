import config from '@/config/index';
import { lazy } from 'react';

import AdminLayout from '@/layouts/AdminLayout';

//* Lazy load pages
const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'));
const GrowthMetrics = lazy(() => import('@/pages/Admin/GrowthMetrics'));
const FormCreateGrowthMetrics = lazy(
  () =>
    import(
      '@/pages/Admin/GrowthMetrics/FormGrowthMetrics/FormCreateGrowthMetrics'
    ),
);
const FormEditGrowthMetrics = lazy(
  () =>
    import(
      '@/pages/Admin/GrowthMetrics/FormGrowthMetrics/FormEditGrowthMetrics'
    ),
);
const ManageMember = lazy(() => import('@/pages/Admin/ManageMember'));
const FormPlan = lazy(
  () => import('@/pages/Admin/ManagePlans/FormPlan/FormPlan'),
);
const ManagePlans = lazy(() => import('@/pages/Admin/ManagePlans/ManagePlans'));
const ManageBlogs = lazy(() => import('@/pages/Admin/ManageBlogs'));
const BlogDetail = lazy(() => import('@/pages/Admin/ManageBlogs/BlogDetail'));
const FormCreateBlog = lazy(
  () => import('@/pages/Admin/ManageBlogs/components/FormCreateBlog'),
);
const Transaction = lazy(() => import('@/pages/Admin/Transactions'));

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
    { path: config.routes.admin.blog, element: <ManageBlogs /> },
    { path: config.routes.admin.blogDetail, element: <BlogDetail /> },
    { path: config.routes.admin.transactions, element: <Transaction /> },
    //* Admin create routes
    { path: config.routes.admin.formPlan, element: <FormPlan /> },
    {
      path: config.routes.admin.formGrwothMatrics,
      element: <FormCreateGrowthMetrics />,
    },
    //* Admin edit routes
    {
      path: config.routes.admin.formGrwothMatrics,
      element: <FormEditGrowthMetrics />,
    },
    { path: config.routes.admin.createBlog, element: <FormCreateBlog /> },
  ],
};

export default AdminRoutes;
