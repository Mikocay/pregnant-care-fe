import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  DesktopOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  BellOutlined
} from '@ant-design/icons';
import './MenuSider.css';
import { Link } from 'react-router-dom';
import config from '@/config';

const { Sider } = Layout;

const MenuSider = () => {
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
      label: 'Fetal growth chart'
    },
    {
      key: '4',
      icon: <EyeOutlined />,
      label: 'Mother status'
    },
    {
      key: '5',
      icon: <BellOutlined />,
      label: 'Notification'
    }
  ];

  return (
    <Sider theme="light" width={250} className="menu-sider">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menuItems.map(item => ({
          ...item,
          className: 'menu-item'
        }))}
      />
    </Sider>
  );
};

export default MenuSider;