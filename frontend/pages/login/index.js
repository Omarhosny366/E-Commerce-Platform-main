// Login.js

import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import styles from '../../styles/login.module.css'; // Import CSS module

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Get router object for navigation

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Login form submitted');
    // Example: Call API to authenticate user

    // Redirect to dashboard or home page after successful login
    router.push('/');
  };

  return (
   <div className={styles.background}>
    <div className={styles.container}>
      {/* Logo */}
      <h1 className={styles.logo}>Login</h1>

      {/* Login Form */}
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
        <button type="submit" className={styles.registerButton}>
          Login
        </button>
      </form>

      {/* Register Toggle */}
      <button
        className={styles.toggleButton}
        onClick={() => router.push('/register')} // Navigate to register page on click
      >
        Don't have an account? Register
      </button>

      {/* Additional Content at the Bottom */}
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
