import { Layout } from 'antd';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Outlet } from 'react-router-dom';

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Community', href: '/community' },
  { label: 'Contact us', href: '/contact' },
];

const HeaderLayout = () => {
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

export default HeaderLayout;
