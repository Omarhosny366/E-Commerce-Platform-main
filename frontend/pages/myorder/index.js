import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar'; // Adjust the path if necessary
import styles from '../../styles/myorder.module.css'; // Import CSS module

const MyOrdersPage = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/orders/my-orders')
      .then(response => {
        setMyOrders(response.data);
        toast.success('Fetched My Orders successfully!');
      })
      .catch(error => {
        toast.error(`Failed to fetch My Orders: ${error.message}`);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.myOrdersContainer}>
        <h2>My Orders</h2>
        {myOrders.map(order => (
          <div key={order._id} className={styles.orderCard}>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Order ID:</strong> {order._id}</p>
            <div>
              <p><strong>Address:</strong></p>
              <p>{order.address.buildingNumber}, {order.address.buildingType}</p>
              <p>{order.address.street}, {order.address.flatNumber}</p>
              <p>{order.address.city}, {order.address.floor}</p>
            </div>
            <div>
              <p><strong>Items:</strong></p>
              {order.items.map(item => (
                <div key={item._id}>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                  <p>Type: {item.type}</p>
                  <p>Material: {item.material}</p>
                  <p>Dimensions: {item.dimensions}</p>
                </div>
              ))}
            </div>
            <p><strong>Total Amount:</strong> ${order.total}</p>
            <p><strong>Downpayment:</strong> ${order.downpayment}</p>
            <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Start Date:</strong> {new Date(order.startDate).toLocaleString()}</p>
            <p><strong>End Date:</strong> {new Date(order.endDate).toLocaleString()}</p>
            <p><strong>Remaining Amount:</strong> ${order.remainingAmount}</p>
            <p><strong>Days Left:</strong> {order.daysLeft}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;