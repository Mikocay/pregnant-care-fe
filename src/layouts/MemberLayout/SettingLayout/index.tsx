import { Layout } from 'antd';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Outlet } from 'react-router-dom';

const navigationItems = [{ label: 'Home', href: '/' }];

const MemberSettingLayout = () => {
  const { Content } = Layout;

  return (
    <Layout>
      <Header items={navigationItems} />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default MemberSettingLayout;
