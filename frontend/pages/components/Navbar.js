// components/Navbar.js
import React from 'react';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
        <span className={styles.logo}>Seelaz</span>
        <div className={styles.navIcons}>
          <span className={styles.icon}>Home</span>
          <span className={styles.icon}>Favorites</span>
          <span className={styles.icon}>Cart</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
