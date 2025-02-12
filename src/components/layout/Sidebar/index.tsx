import ASSETS from '@/assets';
import Sider from 'antd/es/layout/Sider';
import { Menu } from 'antd';
import './Sidebar.css';

type SidebarItem = {
  key: string;
  icon: JSX.Element;
  label: string | JSX.Element;
};

type SidebarBody = SidebarItem[];

export default function Sidebar({ sidebarBody }: { sidebarBody: SidebarBody }) {
  return (
    <Sider theme="light" width={260} className="sidebar">
      <div className="sidebar-top">
        <div className="logo">
          <img src={ASSETS.logo} alt="PregnaCare" width={30} />
        </div>
        <div>
          <p className="sidebar-title">PregnaCare</p>
          <p className="sidebar-subtitle">Modern Member Dashboard</p>
        </div>
      </div>

      <Sider theme="light" width={250} className="menu-sider">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={sidebarBody.map((item) => ({
            ...item,
            className: 'menu-item',
          }))}
        />
      </Sider>
    </Sider>
  );
}
