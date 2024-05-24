// components/Navbar.js
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
        <img src="/seelaz_logo.png" alt="Seelaz" className={styles.logo} />
        <div className={styles.navIcons}>
          {/* Use image buttons for navigation */}
          <button className={styles.toggleButton} onClick={() => handleNavigation('/Home')}>
            <img src="./assets/HH.png" alt="Home" />
          </button>
          <button className={styles.toggleButton} onClick={() => handleNavigation('/profile')}>
            <img src="./assets/PP.png" alt="Profile" />
          </button>
          <button className={styles.toggleButton} onClick={() => handleNavigation('/wishlist')}>
            <img src="./assets/FF.png" alt="Wishlist" />
          </button>
          <button className={styles.toggleButton} onClick={() => handleNavigation('/YourCart')}>
            <img src="./assets/CC.png" alt="Cart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;