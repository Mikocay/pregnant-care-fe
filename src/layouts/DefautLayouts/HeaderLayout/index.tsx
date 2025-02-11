import { Layout } from 'antd';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type HeaderLayoutProps = {
  children: JSX.Element;
};

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  const { Content } = Layout;

  return (
    <Layout>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
};

export default HeaderLayout;
