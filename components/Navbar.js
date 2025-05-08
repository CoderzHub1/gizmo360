import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.logo}>
                    Gizmo360
                </Link>

                <button 
                    className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>

                <div className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
                    <Link href="/" className={styles.navLink}>
                        Home
                    </Link>
                    <Link href="/blog" className={styles.navLink}>
                        Blog
                    </Link>
                    <Link href="/topics" className={styles.navLink}>
                        Topics
                    </Link>
                    <Link href="/about" className={styles.navLink}>
                        About
                    </Link>
                    <Link href="/contact" className={styles.navLink}>
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
}