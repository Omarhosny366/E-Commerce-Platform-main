import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Adjust the import according to your project structure
import Footer from '../components/Footer'; // Adjust the import according to your project structure
import styles from '../../styles/checkout.module.css'; // Adjust the path

const CheckoutPage = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('store');
  const [address, setAddress] = useState({
    street: '',
    building: '',
    apartment: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cart data from the API
    const fetchCartData = async () => {
      try {
        const response = await fetch('http://localhost:3001/cart');
        const data = await response.json();
        setCart(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSaveAddressChange = () => {
    setSaveAddress(!saveAddress);
  };

  const handleProceedToPayment = () => {
    // Implement the functionality for proceeding to payment
    console.log('Proceeding to payment with data:', {
      deliveryMethod,
      address,
      phoneNumber,
      saveAddress,
    });
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.checkoutContainer}>
        <div className={styles.deliveryOptions}>
          <h2>Check-out</h2>
          <div>
            <label>
              <input
                type="radio"
                value="store"
                checked={deliveryMethod === 'store'}
                onChange={() => handleDeliveryMethodChange('store')}
              />
              Collect from Store
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="home"
                checked={deliveryMethod === 'home'}
                onChange={() => handleDeliveryMethodChange('home')}
              />
              Home delivery
            </label>
            {deliveryMethod === 'home' && (
              <div className={styles.addressInputs}>
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={address.street}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="building"
                  placeholder="Building"
                  value={address.building}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment"
                  value={address.apartment}
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                <div className={styles.saveAddressContainer}>
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={handleSaveAddressChange}
                  />
                  <label>Save Address</label>
                </div>
              </div>
            )}
          </div>
          <button
            className={styles.proceedButton}
            onClick={handleProceedToPayment}
          >
            Proceed to payment
          </button>
        </div>
        <div className={styles.cartSummary}>
          <h3>Cart Summary</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.quantity}x {item.name} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p>VAT: ${calculateTotal() * 0.1}</p>
          <p>Delivery: $5</p>
          <h4>TOTAL: ${calculateTotal() + calculateTotal() * 0.1 + 5}</h4>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
