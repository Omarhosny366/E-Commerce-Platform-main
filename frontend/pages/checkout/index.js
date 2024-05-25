import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footerr';
import styles from '../../styles/checkout.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const CheckoutPage = () => {
  const router = useRouter();
  const [deliveryMethod, setDeliveryMethod] = useState('store');
  const [address, setAddress] = useState({
    city: '',
    street: '',
    buildingNumber: '',
    floor: '',
    flatNumber: '',
    buildingType: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [showSavedAddressOption, setShowSavedAddressOption] = useState(false);
  const [userId, setUserId] = useState(''); // Placeholder for user ID
  const [userEmail, setUserEmail] = useState(''); // Placeholder for user email

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await axios.get('http://localhost:3001/cart');
        setCart(cartResponse.data);

        const addressesResponse = await axios.get('http://localhost:3000/addresses');
        setSavedAddresses(addressesResponse.data);

        const userResponse = await axios.get('http://localhost:3000/user'); // Adjust this based on your endpoint
        setUserId(userResponse.data._id);
        setUserEmail(userResponse.data.email);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddAddress = async () => {
    try {
      const addAddressData = {
        city: address.city,
        street: address.street,
        buildingNumber: address.buildingNumber,
        floor: address.floor,
        flatNumber: address.flatNumber,
        buildingType: address.buildingType,
      };

      await axios.post('http://localhost:3000/addresses', addAddressData);

      // Optionally, you can reset the address fields after successfully adding the address
      setAddress({
        city: '',
        street: '',
        buildingNumber: '',
        floor: '',
        flatNumber: '',
        buildingType: '',
      });

      window.location.reload();

      console.log('Address added successfully!');
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
    if (method === 'home') {
      setShowSavedAddressOption(true);
    } else {
      setShowSavedAddressOption(false);
    }
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
    if (!saveAddress) {
      setSelectedAddress(null); // Unselect the address if user toggles the save address option off
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      console.log(addressId);
      await axios.delete(`http://localhost:3000/addresses/${addressId}`);
      setSavedAddresses(savedAddresses.filter((address) => address.id !== addressId));
      window.location.reload(); // Reload the page after deletion

    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleSavedAddressSelect = (selectedAddress) => {
    setSelectedAddress(selectedAddress);
    setAddress(selectedAddress); // Autofill the address fields when a saved address is selected
  };

  const handleProceedToPayment = async () => {
    try {
      const orderData = {
        addressId: selectedAddress ? selectedAddress._id : null,
        userId,
        email: userEmail,
        items: cart.items.map(item => ({
          product_id: item._id,
          quantity: item.quantity,
          price: item.price,
          type: item.type,
          material: item.material,
          dimensions: item.dimensions,
        })),
        total: calculateTotalWithVATAndDelivery(),
      };

      const response = await axios.post('http://localhost:3001/orders', orderData);

      if (response.data.success) {
        const orderNumber = response.data.order._id;
        router.push({
          pathname: '/orderConfirmation',
          query: { orderNumber },
        });
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const calculateTotalWithVATAndDelivery = () => {
    const vat = cart.totalPrice * 0.1;
    const delivery = 5;
    return cart.totalPrice + vat + delivery;
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
            {showSavedAddressOption && (
              <div>
                {savedAddresses.length > 0 && (
                  <label>
                    <input
                      type="radio"
                      value="saved"
                      checked={saveAddress}
                      onChange={() => setSaveAddress(true)}
                    />
                    Select from your saved addresses
                  </label>
                )}
                <label>
                  <input
                    type="radio"
                    value="new"
                    checked={!saveAddress}
                    onChange={() => setSaveAddress(false)}
                  />
                  Enter new address
                </label>
                {savedAddresses.map((savedAddress) => (
                  <div key={savedAddress._id}>
                    <label>
                      <input
                        type="radio"
                        value={savedAddress._id}
                        checked={selectedAddress && selectedAddress._id === savedAddress._id}
                        onChange={() => handleSavedAddressSelect(savedAddress)}
                      />
                      city:{savedAddress.city}, street:{savedAddress.street}, buildingNo.:{savedAddress.buildingNumber}, floor:{savedAddress.floor}, flatNo.{savedAddress.flatNumber}, building type:{savedAddress.buildingType}
                    </label>

                    <button onClick={() => handleDeleteAddress(savedAddress._id)}>Delete</button>
                  </div>
                ))}
              </div>
            )}
            {deliveryMethod === 'home' && !saveAddress && (
              <div className={styles.addressInputs}>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={address.street}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="buildingNumber"
                  placeholder="Building Number"
                  value={address.buildingNumber}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="floor"
                  placeholder="Floor"
                  value={address.floor}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="flatNumber"
                  placeholder="Flat Number"
                  value={address.flatNumber}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="buildingType"
                  placeholder="Building Type"
                  value={address.buildingType}
                  onChange={handleInputChange}
                />
                {/* Remaining address input fields */}
                <button onClick={handleAddAddress}>Add Address</button>
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
            {cart.items.map((item) => (
              <li key={item._id}>
                <strong>{item.quantity}</strong>x <strong>{item.name}</strong> | ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p>VAT: ${cart.totalPrice * 0.1}</p>
          <p>Delivery: $5</p>
          <h4>TOTAL: ${calculateTotalWithVATAndDelivery()}</h4>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
