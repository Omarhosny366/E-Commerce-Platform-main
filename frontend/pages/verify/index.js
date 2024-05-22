import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/login.module.css';

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log('Sending OTP verification request with email:', email);
      const response = await axios.post('http://localhost:3000/user/verify-account', {
        otp,
        email,
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('Verification successful', response.data);
        router.push('/login');
      } else {
        setError('Invalid verification credentials');
      }
    } catch (error) {
      console.error('Error verifying:', error.response ? error.response.data : error.message);
      setError('Failed to verify. Please try again.');
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Verify Yourself</h1>

        <form className={styles.form} onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Enter your email"
            required
          />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={styles.input}
            placeholder="Received code"
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.registerButton}>
            Verify
          </button>
        </form>

        <div className={styles.bottomContent}>
          <h2 className={styles.descriptionHeading}>Welcome to Seelaz!</h2>
          <p className={styles.description}>
            Welcome to our premier destination for plastic pallets! Discover a wide selection of
            colors, sizes, and durable materials conveniently curated in one place. Whether you
            require solutions for storage, shipping, or organizational needs, we offer precisely
            what you seek. Enjoy our diverse range and competitive pricing. Start your search for
            high-quality plastic pallets from the comfort of your home today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
