import { Outlet } from 'react-router-dom';
import HeaderLayout from '../DefautLayouts/HeaderLayout';

const GuestLayout = () => {
  return (
    <HeaderLayout>
      <Outlet />
    </HeaderLayout>
  );
};

export default GuestLayout;
