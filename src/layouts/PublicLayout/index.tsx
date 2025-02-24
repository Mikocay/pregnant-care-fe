import { Outlet } from 'react-router-dom';
import HeaderLayout from '../DefautLayouts/HeaderLayout';

const PublicLayout = () => {
  return (
    <HeaderLayout>
      <Outlet />
    </HeaderLayout>
  );
};

export default PublicLayout;
