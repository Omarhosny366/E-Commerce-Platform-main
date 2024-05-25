import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar'; // Adjust the path if necessary
import styles from '../../styles/myrent.module.css'; // Import CSS module

const MyRentsPage = () => {
  const [myRents, setMyRents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/orders/my-rents')
      .then(response => {
        setMyRents(response.data);
        toast.success('Fetched My Rents successfully!');
      })
      .catch(error => {
        toast.error(`Failed to fetch My Rents: ${error.message}`);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.myRentsContainer}>
        <h2>My Rents</h2>
        {myRents.map(rent => (
          <div key={rent._id} className={styles.rentCard}>
            <div className={styles.rentCardBody}>
              <p><strong>Status:</strong> {rent.status}</p>
              <p><strong>Rent ID:</strong> {rent._id}</p>
              <div>
                <p><strong>Address:</strong></p>
                <p>{rent.address.buildingNumber}, {rent.address.buildingType}</p>
                <p>{rent.address.street}, {rent.address.flatNumber}</p>
                <p>{rent.address.city}, {rent.address.floor}</p>
              </div>
              <div>
                <p><strong>Items:</strong></p>
                {rent.items.map(item => (
                  <div key={item._id}>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                    <p>Type: {item.type}</p>
                    <p>Material: {item.material}</p>
                    <p>Dimensions: {item.dimensions}</p>
                  </div>
                ))}
              </div>
              <p><strong>Total Amount:</strong> ${rent.total}</p>
              <p><strong>Downpayment:</strong> ${rent.downpayment}</p>
              <p><strong>Created At:</strong> {new Date(rent.createdAt).toLocaleString()}</p>
              <p><strong>Start Date:</strong> {new Date(rent.startDate).toLocaleString()}</p>
              <p><strong>End Date:</strong> {new Date(rent.endDate).toLocaleString()}</p>
              <p><strong>Remaining Amount:</strong> ${rent.remainingAmount}</p>
              <p><strong>Days Left:</strong> {rent.daysLeft}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRentsPage;
