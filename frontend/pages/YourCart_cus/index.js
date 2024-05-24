import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import styles from '../../styles/YourCart.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const YourCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [downpayment, setDownpayment] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/cart')
      .then(response => {
        const data = response.data;
        setCartItems(data.items);
        setTotalPrice(data.totalPrice);
        setDownpayment(data.downpayment);
      })
      .catch(error => console.error('Error fetching cart data:', error));
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/cart/item/${productId}`);
      if (response.status >= 200 && response.status < 300) {
        toast.success('Product deleted successfully');
        setCartItems(cartItems.filter(item => item.product_id !== productId));
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.title}>Your Cart</h1>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Material</th>
            <th>Dimensions</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.type}</td>
              <td>{item.material}</td>
              <td>{item.dimensions}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  onClick={() => handleRemoveItem(item.product_id)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.totalContainer}>
        <h2>Total: ${calculateTotal().toFixed(2)}</h2>
        <h3>Downpayment: ${downpayment.toFixed(2)}</h3>
        <button className={styles.checkoutButton}>Proceed to Checkout</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default YourCart;
