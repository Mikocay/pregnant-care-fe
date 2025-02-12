import HeaderAuth from './HeaderAuth';
import styles from './Header.module.css';
import ASSETS from '@/assets';

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Community', href: '/community' },
  { label: 'Contact us', href: '/contact' },
];

export default function Header() {
  //   Example user state and logout handler
  const user = {
    name: 'Tina',
    avatar: ASSETS.logo,
  };

  const handleLogout = () => {
    console.log('Logout');

    // Add your logout logic here
  };

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
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      {/* User Section */}
      <div className={styles.userSection}>
        <HeaderAuth user={user} onLogout={handleLogout} />
      </div>
    </header>
  );
}
