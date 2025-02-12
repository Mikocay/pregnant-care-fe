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
import ROUTES from '@/config/routes';

interface User {
  name: string;
  avatar?: string;
}

interface HeaderAuthProps {
  user?: User | null;
  onLogout: () => void;
}

export default function HeaderAuth({ user, onLogout }: HeaderAuthProps) {
  const navigate = useNavigate();

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <Link to={ROUTES.PROFILE}>
          <div className={styles.menuItem}>
            <UserOutlined /> My Profile
          </div>
        </Link>
      ),
    },
    {
      key: 'settings',
      label: (
        <Link to={ROUTES.PROFILE}>
          <div className={styles.menuItem}>
            <SettingOutlined /> Settings
          </div>
        </Link>
      ),
    },
    {
      key: 'schedule',
      label: (
        <Link to={ROUTES.SCHEDULE}>
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
      <div className={styles.container}>
        {/* <Button
          className={styles.signUpButton}
          onClick={() => navigate(ROUTES.REGISTER)}
        >
          Sign Up
        </Button> */}
        <Button
          className={styles.signInButton}
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BellOutlined className={styles.notification} />
      <span>Welcome, {user.name}</span>
      <Dropdown
        menu={{ items: dropdownItems }}
        placement="bottomRight"
        trigger={['click']}
        overlayClassName={styles.dropdownMenu}
      >
        <Avatar
          src={user.avatar}
          icon={!user.avatar && <UserOutlined />}
          className={styles.userAvatar}
        />
      </Dropdown>
    </div>
  );
}
