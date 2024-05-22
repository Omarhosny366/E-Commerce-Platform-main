// pages/Home.js

import React from 'react';
import styles from '../../styles/Home.module.css';
import Navbar from '../components/Navbar';

function Home() {
  const handleBuyButtonClick = () => {
    // Add your logic here for the BUY button
  };

  const handleRentButtonClick = () => {
    // Add your logic here for the RENT button
  };

  return (
    <div className={styles.pageWrapper}> {/* Add a wrapper */}
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card1}>
          <img src="assets/card_image1.jpeg" alt="Image 1" />
          <div className={styles.buttonsContainer}>
            <button className={styles.button1} onClick={handleBuyButtonClick}>BUY</button>
            <button className={styles.button4} onClick={handleRentButtonClick}>RENT</button>
          </div>
          <span className={styles.ReadyMade}>Ready Made</span>
        </div>
        <div className={styles.card2}>
          <img src="assets/card_image2.jpg" alt="Image 2" />
          <div className={styles.buttonsContainer}>
            <button className={styles.button5}>Make</button>
            <button className={styles.button2}>Your</button>
            <button className={styles.button3}>Own</button>
          </div>
          <span className={styles.customize}>Customize</span>
        </div>
      </div>
      <div className={styles.footer}>
  Welcome to our premier destination for plastic pallets! Discover a wide selection of colors, sizes, and durable materials conveniently curated in one place. Whether you require solutions for storage, shipping, or organizational needs, we offer precisely what you seek. Enjoy our diverse range and competitive pricing. Start your search for high-quality plastic pallets from the comfort of your home today!
  <div className={styles.email}>Contact us: theseelaz@info.com</div>
</div>

    </div>
  );
}

export default Home;
