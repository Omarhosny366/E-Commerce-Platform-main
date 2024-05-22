import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../../styles/YourCart.module.css';

const YourCart = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    { id: 1, item: 'Item 1', price: 100, quantity: 1 },
    { id: 2, item: 'Item 2', price: 200, quantity: 2 },
    { id: 3, item: 'Item 3', price: 300, quantity: 3 },
  ]);

  // Handler for updating quantity
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handler for removing item
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== id));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className={styles.container}>
      <Navbar /> {/* Include Navbar at the top */}
      <h1 className={styles.title}>Your Cart</h1>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity/Days</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.item}</td>
              <td>${item.price}</td>
              <td>
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)} 
                  className={styles.quantityInput}
                />
              </td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
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
        <h2>Total: ${calculateTotal()}</h2>
        <button className={styles.checkoutButton}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default YourCart;
