import { Menu } from 'antd';
import styles from './Sidebar.module.css';
import ASSETS from '@/assets';

type SidebarItem = {
  key: string;
  icon: JSX.Element;
  label: string;
};

type SidebarBody = SidebarItem[];

export default function Sidebar({ sidebarBody }: { sidebarBody: SidebarBody }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={ASSETS.logo} alt="PregnaCare Logo" width={40} height={40} />
        <div className={styles.logoText}>
          <h1 className={styles.logoTitle}>PregnaCare</h1>
          <p className={styles.logoSubtitle}>Modern Admin Dashboard</p>
        </div>
      </div>

      <Menu
        className={styles.menu}
        mode="inline"
        defaultSelectedKeys={['mother-status']}
        items={sidebarBody}
      />
    </div>
  );
}
