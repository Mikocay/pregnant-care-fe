import SidebarLayout from '../DefautLayouts/SidebarLayout';
import { Outlet } from 'react-router-dom';

//! add sidebar body props to sidebarlayout

const AdminLayout = () => {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
};

export default AdminLayout;
