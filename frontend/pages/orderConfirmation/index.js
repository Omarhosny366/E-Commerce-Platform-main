import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../../styles/orderConfirmation.module.css';

const OrderConfirmationPage = () => {
  // Placeholder for fetched email
  const userEmail = "user@example.com";
  // Placeholder for order number
  const orderNumber = ""; // Initialize as empty string

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.message}>
          <h2>Congratulations!</h2>
          <p>Your order {orderNumber} has been placed successfully!</p>
          <p>Order details have been sent to the email: {userEmail}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
