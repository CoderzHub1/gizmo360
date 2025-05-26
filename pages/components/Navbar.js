import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar({ userEmail, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking on a link
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContent}>
        <div className={styles.navHeader}>
          <Link href="/" className={styles.logo}>
            Gizmo360
          </Link>
          
          <button 
            className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
        <div className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
          <Link href="/" className={styles.navLink} onClick={closeMenu}>
            Home
          </Link>
          <Link href="/services" className={styles.navLink} onClick={closeMenu}>
            Services
          </Link>
          <Link href="/about" className={styles.navLink} onClick={closeMenu}>
            About
          </Link>
          <Link href="/contact" className={styles.navLink} onClick={closeMenu}>
            Contact
          </Link>
          {!userEmail && (
            <Link href="/login" className={styles.navLink} onClick={closeMenu}>
              Login/Signup
            </Link>
          )}
          <div className={styles.userSection}>
          {userEmail && (
            <>
              <p className={styles.userEmail}>{userEmail}</p>
              <button onClick={onLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          )}
        </div>
        </div>

      </div>
    </nav>
  );
}