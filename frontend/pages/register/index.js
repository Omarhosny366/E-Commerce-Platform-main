// Register.js

import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import styles from '../../styles/register.module.css'; // Import CSS module

const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Get router object for navigation

  const handleRegister = (e) => {
    e.preventDefault();
    // Perform registration logic here
    console.log('Registration form submitted');
    // Example: Call API to register user

    // Redirect to login page after registration
    router.push('/login');
  };

  return (
   <div className={styles.background}>
    <div className={styles.container}>
      {/* Logo */}
      <h1 className={styles.logo}>Register</h1>

      {/* Registration Form */}
      <form className={styles.form} onSubmit={handleRegister}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="Email or phone number"
          required
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={styles.input}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={styles.input}
          placeholder="Last Name"
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
          Register
        </button>
      </form>

      {/* Login Toggle */}
      <button
        className={styles.toggleButton}
        onClick={() => router.push('/login')} // Navigate to login page on click
      >
        Already have an account? Login
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

export default Register;
