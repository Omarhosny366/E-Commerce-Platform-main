import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Import axios for making HTTP requests
import styles from '../../styles/register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle error messages
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/user', {
        email,
        username,
        phoneNumber,
        password,
      });

      // Check for successful status range
      if (response.status >= 200 && response.status < 300) {
        console.log('Registration successful', response.data);
        router.push('/verify');
      } else {
        setError('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Register</h1>

        <form className={styles.form} onSubmit={handleRegister}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            placeholder="Username"
            required
          />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={styles.input}
            placeholder="Phone Number"
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
          {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>

        <button
          className={styles.toggleButton}
          onClick={() => router.push('/login')}
        >
          Already have an account? Login
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

export default Register;
