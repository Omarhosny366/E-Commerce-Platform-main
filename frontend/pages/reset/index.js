import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/login.module.css';

const ResetPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3000/user/send-reset-password-email', { email });

      if (response.status === 200) {
        setSuccess('Reset password email sent successfully.');
        setStep(2);
      } else {
        setError('Failed to send reset password email.');
      }
    } catch (error) {
      console.error('Error sending reset password email:', error.response ? error.response.data : error.message);
      setError('Failed to send reset password email. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3000/user/reset-password', {
        email,
        password: newPassword,
        OTP: otp,
      });

      if (response.status === 200) {
        setSuccess('Password reset successfully.');
        router.push('/login');
      } else {
        setError('Failed to reset password.');
      }
    } catch (error) {
      console.error('Error resetting password:', error.response ? error.response.data : error.message);
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Reset Password</h1>

        {step === 1 ? (
          <form className={styles.form} onSubmit={handleRequestReset}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Enter your email"
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <button type="submit" className={styles.registerButton}>
              Request Reset
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleResetPassword}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={styles.input}
              placeholder="Enter OTP"
              required
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter new password"
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <button type="submit" className={styles.registerButton}>
              Reset Password
            </button>
          </form>
        )}

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

export default ResetPasswordPage;
