import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/changepass.module.css';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password must match.');
      return;
    }
    // Add logic to submit the form with the new password
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Change Password</h2>
        {error && <div className={styles.error}>{error}</div>}
        <ToastContainer />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <label htmlFor="oldPassword" className={styles.label}>Old Password:</label>
            <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className={styles.inputField} />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="newPassword" className={styles.label}>New Password:</label>
            <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={styles.inputField} />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm New Password:</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={styles.inputField} />
          </div>
          <button type="submit" className={styles.button}>Change Password</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePasswordPage;
