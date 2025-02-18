import { Dropdown, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  CalendarOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import styles from './HeaderAuth.module.css';
import config from '@/config';
import { User } from '@/types';


interface HeaderAuthProps {
  user?: User | null;
  onLogout: () => void;
}

export default function HeaderAuth({ user, onLogout }: HeaderAuthProps) {
  const dropdownItemsAuth: MenuProps['items'] = [

    {
      key: 'profile',
      label: (
        <Link to="">
          <div className={styles.menuItem}>
            <UserOutlined /> My Profile
          </div>
        </Link>
      ),
    },
    {
      key: 'settings',
      label: (
        <Link to="">
          <div className={styles.menuItem}>
            <SettingOutlined /> Settings
          </div>
        </Link>
      ),
    },
    {
      key: 'schedule',
      label: (
        <Link to="">
          <div className={styles.menuItem}>
            <CalendarOutlined /> My Schedule
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
