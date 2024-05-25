import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGuestLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/guest');

      // Check for successful status range
      if (response.status >= 200 && response.status < 300) {
        console.log('Guest login successful', response.data);
        router.push('/Home');
      } else {
        setError('Failed to continue as guest. Please try again.');
      }
    } catch (error) {
      console.error('Error continuing as guest:', error);
      setError('Failed to continue as guest. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful', response.data);
        router.push('/Home');
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Login</h1>

        <form className={styles.form} onSubmit={handleLogin}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Email or phone number"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Password"
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.registerButton}>
            Login
          </button>
        </form>

        <button
          className={styles.toggleButton}
          onClick={() => router.push('/register')}
        >
          Don't have an account? Register
        </button>
        <button
          className={styles.toggleButton}
          onClick={() => router.push('/reset')}
        >
                    Forgot your password? again? LOL, Go reset it
        </button>
        <button
          className={styles.toggleButton}
          onClick={handleGuestLogin}
        >
          Wants to continue as a Guest?
        </button>

        <div className={styles.bottomContent}>
          <h2 className={styles.descriptionHeading}>Welcome to Seelaz!</h2>
          <p className={styles.description}>
            Welcome to our premier destination for plastic pallets! Discover a wide selection of
            colors, sizes, and durable materials conveniently curated in one place. Whether you
            require solutions for storage, shipping, or organizational needs, we offer precisely what
            you seek. Enjoy our diverse range and competitive pricing. Start your search for
            high-quality plastic pallets from the comfort of your home today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
