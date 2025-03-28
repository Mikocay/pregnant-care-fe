import HeaderAuth from './HeaderAuth/HeaderAuth';
import styles from './Header.module.css';
import ASSETS from '@/assets';
import { Link } from 'react-router-dom';
import { useHeader } from './useHeader';
import config from '@/config';

type NavigationItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  items?: NavigationItem[];
};

function Header({ items }: HeaderProps) {
  //   Example user state and logout handler
  const { user, handleLogout } = useHeader();

  return (
    <header className={styles.header}>
      {/* Logo Section */}
      <div className={styles.logo}>
        <Link className={styles.itemsLink} to={config.routes.public.home}>
          <img src={ASSETS.logo} alt="PregnaCare Logo" />
          <span>PregnaCare</span>
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className={styles.navigation}>
        {items?.map((item) => (
          <Link key={item.label} to={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className={styles.userSection}>
        <HeaderAuth user={user} onLogout={handleLogout} />
      </div>
    </header>
  );
}

export default Header;
