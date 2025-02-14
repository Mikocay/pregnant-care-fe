import { Layout } from 'antd';
import MenuSider from '@/components/MenuSider';
import logo from '@/assets/logo.png';
import MiniAvatar from '@/components/MiniAvatar';
import './AdminLayout.css'
import { Outlet } from 'react-router-dom';
const { Header, Sider } = Layout;

const AdminLayout = () => {
  return (
    <Layout className="admin-layout">
      <Sider theme="light" width={260} className="sidebar">
        <div className='sidebar-top'>
          <div className="logo">
            <img src={logo} alt="PregnaCare" width={30} />
          </div>
          <div>
            <p className="sidebar-title">PregnaCare</p>
            <p className='sidebar-subtitle'>
              Modern Member Dashboard
            </p>
          </div>
        </div>

        <MenuSider />
      </Sider>

      <Layout className="main-content">
        <Header className="header">
          <div className="header-right">
            <p className='header-name'>Hello <span className=''> UserName</span> </p>
            <MiniAvatar />

          </div>
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;