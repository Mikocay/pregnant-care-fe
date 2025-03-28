import ASSETS from '@/assets';
import Sider from 'antd/es/layout/Sider';
import { Menu } from 'antd';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import config from '@/config';

type SidebarItem = {
  key: string;
  icon: JSX.Element;
  label: string | JSX.Element;
};

type SidebarBody = SidebarItem[];

export default function Sidebar({ sidebarBody }: { sidebarBody: SidebarBody }) {
  const location = useLocation();

  return (
    <Sider theme="light" width={260} className="sidebar">
      <Link className="sidebar-top" to={config.routes.public.home}>
        <div className="logo">
          <img src={ASSETS.logo} alt="PregnaCare" width={30} />
        </div>
        <div>
          <p className="sidebar-title">PregnaCare</p>
          <p className="sidebar-subtitle">Modern Member Dashboard</p>
        </div>
      </Link>

      <Sider theme="light" width={250} className="menu-sider">
        <Menu
          mode="inline"
          defaultSelectedKeys={[location.pathname ? location.pathname : '1']}
          // defaultSelectedKeys={['fetuses']}
          // defaultOpenKeys={['3']}
          items={sidebarBody.map((item, index) => ({
            ...item,
            key: item.key || index,
          }))}
        />
      </Sider>
    </Sider>
  );
}
