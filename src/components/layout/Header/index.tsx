import HeaderAuth from './HeaderAuth/HeaderAuth';
import styles from './Header.module.css';
import ASSETS from '@/assets';
import { Link } from 'react-router-dom';
import { useHeader } from './useHeader';

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Community', href: '/community' },
  { label: 'Contact us', href: '/contact' },
];

function Header() {
  //   Example user state and logout handler
  const { user, handleLogout } = useHeader();

  return (
    <header className={styles.header}>
      {/* Logo Section */}
      <div className={styles.logo}>
        <img src={ASSETS.logo} alt="PregnaCare Logo" />
        <span>PregnaCare</span>
      </div>

      {/* Navigation Section */}
      <nav className={styles.navigation}>
        {navigationItems.map((item) => (
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
