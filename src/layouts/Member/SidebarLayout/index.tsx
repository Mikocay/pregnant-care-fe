import SidebarLayout from '@/layouts/DefautLayouts/SidebarLayout';
import { Outlet } from 'react-router-dom';

const MemeberSidebarLayout = () => {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
};

export default MemeberSidebarLayout;
