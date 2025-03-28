import { Dropdown, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import styles from './HeaderAuth.module.css';
import config from '@/config';
import { User } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { ROLE } from '@/constants';
import FetusSelector from '@/components/FetusSelector';

interface HeaderAuthProps {
  user?: User | null;
  onLogout: () => void;
}

export default function HeaderAuth({ user, onLogout }: HeaderAuthProps) {
  const { userRole } = useSelector((state: RootState) => state.auth);
  const dropdownItemsAuth: MenuProps['items'] = [
    {
      key: 'account',
      label: (
        <Link
          className={styles.menuItemLink}
          to={userRole === ROLE.MEMBER ? config.routes.member.account : ''}
        >
          <div className={styles.menuItem}>
            <UserOutlined /> Account
          </div>
        </Link>
      ),
    },
    {
      key: 'dashboard',
      label: (
        <Link
          className={styles.menuItemLink}
          to={
            userRole === ROLE.ADMIN
              ? config.routes.admin.dashboard
              : config.routes.member.dashboard
          }
        >
          <div className={styles.menuItem}>
            <DashboardOutlined /> Dashboard
          </div>
        </Link>
      ),
    },
    {
      key: 'logout',
      label: (
        <div
          className={`${styles.menuItem} ${styles.logoutItem}`}
          onClick={onLogout}
        >
          <LogoutOutlined /> Logout
        </div>
      ),
    },
  ];

  if (!user) {
    return (
      <div className={styles.authContainer}>
        <Link to={config.routes.auth.login} className={styles.authText}>
          Login
        </Link>
        |
        <Link to={config.routes.auth.signUp} className={styles.authText}>
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {userRole === ROLE.MEMBER && <FetusSelector />}
      <BellOutlined className={styles.notification} />
      <span>Welcome, {user.firstName || 'guest'}</span>
      <Dropdown
        menu={{ items: dropdownItemsAuth }}
        placement="bottomRight"
        trigger={['click']}
        overlayClassName={styles.dropdownMenu}
      >
        <Avatar
          src={user.avatarUrl}
          icon={!user.avatarUrl && <UserOutlined />}
          className={styles.userAvatar}
        />
      </Dropdown>
    </div>
  );
}
