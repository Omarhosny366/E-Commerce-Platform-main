
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
  const router = useRouter();

  // Function to handle navigation
  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
      <span className={styles.logo}>Seelaz</span>
        <div className={styles.navIcons}>
          {/* Use image buttons for navigation */}
          <button className={styles.toggleButton} onClick={() => handleNavigation('/')}>
            <img src="./assets/door.png" alt="Logout" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;