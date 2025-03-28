import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import ASSETS from '@/assets';

const navigationLinks = [
  { label: 'About us', href: '/about' },
  { label: 'Contact us', href: '/contact' },
  { label: 'Features', href: '/features' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Testimonials', href: '/testimonials' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Brand Section */}
      <div className={styles.brand}>
        <div className={styles.logo}>
          <img
            src={ASSETS.logo}
            alt="PregnaCare Logo"
            className={styles.logoImage}
          />
          <span className={styles.logoText}>PregnaCare</span>
        </div>
        <p className={styles.subtitle}>
          Pregnancy tracker and woman health website
        </p>
      </div>

      {/* Navigation Section */}
      <div className={styles.navigation}>
        <h3>Quick Links</h3>
        <div className={styles.navLinks}>
          {navigationLinks.map((link) => (
            <Link key={link.label} to={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Download Section */}
      <div className={styles.download}>
        <p className={styles.downloadText}>Get the App</p>
        <div className={styles.storeButtons}>
          <Link
            to="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/app-store-badge.png"
              alt="Download on App Store"
              className={styles.storeButton}
            />
          </Link>
          <Link
            to="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/google-play-badge.png"
              alt="Get it on Google Play"
              className={styles.storeButton}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
