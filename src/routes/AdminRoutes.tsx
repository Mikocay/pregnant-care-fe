import config from '@/config/routes/index';
import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/Admin/Dashboard';
import GrowthMetrics from '@/pages/Admin/GrowthMetrics';
import ManageMember from '@/pages/Admin/ManageMember';

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
    { path: config.routes.admin.dashboard, element: <Dashboard /> },
    { path: config.routes.admin.manageMember, element: <ManageMember /> },
    { path: config.routes.admin.growthMatrics, element: <GrowthMetrics /> },
  ],
};

export default AdminRoutes;
