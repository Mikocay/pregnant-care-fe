import { Layout, Button, Input } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  HomeOutlined,
  DesktopOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  BellOutlined,
} from '@ant-design/icons';
import MiniAvatar from '@/components/MiniAvatar';
import './AdminLayout.css';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import config from '@/config';
const { Header, Content } = Layout;

const AdminLayout = () => {
  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: <Link to={config.routes.admin.dashboard}>Dashboard</Link>,
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: <Link to={config.routes.admin.manageMember}>Manage Member</Link>,
    },
    {
      key: '3',
      icon: <ClockCircleOutlined />,
      label: 'Fetal growth chart',
    },
    {
      key: '4',
      icon: <EyeOutlined />,
      label: 'Mother status',
    },
    {
      key: '5',
      icon: <BellOutlined />,
      label: 'Notification',
    },
  ];

  return (
    <Layout className="admin-layout">
      <Sidebar sidebarBody={menuItems} />
      <Layout className="main-content">
        <Header className="header">
          <div className="header-right">
            <p className="header-name">
              Hello <span className=""> UserName</span>{' '}
            </p>
            <MiniAvatar />
          </div>
        </Header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '10px 20px',
          }}
        >
          <Button type="primary" className="create-button">
            Create <EditOutlined />
          </Button>
        </div>

        <Content className="content">
          <div className="content-header">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              className="search-input"
            />
            <div className="sort-dropdown">Sort by: Newest</div>
          </div>

          {/* Admin Content */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
