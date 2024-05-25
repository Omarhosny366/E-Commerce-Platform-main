import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footerr';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/changepass.module.css';
import { useRouter } from 'next/router';
const ChangePasswordPage = () => {
    const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password must match.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword: oldPassword, newPassword }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update password');
      }
      router.push(`/`);
      const data = await response.json();
      toast.success('Password updated successfully!');
      console.log('Password update response:', data);
      
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(error.message || 'Failed to update password.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Change Password</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <label htmlFor="oldPassword" className={styles.label}>Old Password:</label>
            <input 
              type="password" 
              id="oldPassword" 
              value={oldPassword} 
              onChange={(e) => setOldPassword(e.target.value)} 
              className={styles.inputField} 
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="newPassword" className={styles.label}>New Password:</label>
            <input 
              type="password" 
              id="newPassword" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              className={styles.inputField} 
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm New Password:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className={styles.inputField} 
              required
            />
          </div>
          <button type="submit" className={styles.button}>Change Password</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePasswordPage;
