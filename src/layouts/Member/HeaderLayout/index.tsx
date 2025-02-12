import HeaderLayout from '@/layouts/DefautLayouts/HeaderLayout';
import { Outlet } from 'react-router-dom';

const MemberHeaderLayout = () => {
  return (
    <HeaderLayout>
      <Outlet />
    </HeaderLayout>
  );
};

export default MemberHeaderLayout;
