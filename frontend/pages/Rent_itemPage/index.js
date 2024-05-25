import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/footerr'; // Ensure correct import
import styles from '../../styles/purchase_ItemPage.module.css'; // Ensure correct path
import style from '../../styles/custom.module.css'; // Ensure correct path
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [cartProductId, setCartProductId] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`http://localhost:3002/customer-rent-products/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCartClick = () => {
    setCartProductId(item._id);
  };

  const handleCartSubmit = async () => {
    if (!startTime || !endTime) {
      toast.error('Start date and end date must be provided for rental items.');
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      toast.error('Start time must be before end time.');
      return;
    }

    const duration = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60 * 24);
    if (item && item.duration && duration > item.duration) {
      toast.error(`Maximum rental duration is ${item.duration} days.`);
      return;
    }

    try {
      const response = await axios.patch('http://localhost:3001/cart', {
        productId: cartProductId,
        quantity: cartQuantity,
        startDate: startTime,
        endDate: endTime,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success('Product added to cart successfully!');
        setCartProductId(null);
        setCartQuantity(1);
        setStartTime('');
        setEndTime('');
      } else {
        toast.error('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Error adding product to cart. Please try again.');
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post('http://localhost:3000/wishlist/add-products', {
        ProductID: [item._id], 
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success('Product added to favorites!');
      } else {
        console.error('Failed to add product to favorites:', response.data);
        toast.error('Failed to add product to favorites.');
      }
    } catch (error) {
      console.error('Error adding product to favorites:', error);
      toast.error('Error adding product to favorites. Please try again.');
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.itemContainer}>
        <img src="/assets/product.jpg" alt={item.name} className={styles.itemImage} />
        <div className={styles.itemDetails}>
          <h1 className={styles.itemName}>{item.name}</h1>
          <p className={styles.itemPrice}><strong>${item.price}</strong></p>
          <p className={styles.productMaterial}><strong>Material:</strong> {item.material}</p>
          <p className={styles.productcolor}><strong>Color:</strong> {item.color}</p>
          <p className={styles.productdimensions}><strong>Dimensions:</strong> {item.dimensions}</p>
          <p className={styles.productreview}><strong>Review:</strong> {item.review}</p>
          <p className={styles.producttype}><strong>Type:</strong> {item.type}</p>
          <p className={styles.productquantity}><strong>Quantity:</strong> {item.quantity}</p>

          <button className={styles.favoritesButton} onClick={handleAddToFavorites}>Add to Favorites</button>
          <button className={styles.cartButton} onClick={handleAddToCartClick}>Add to Cart</button>
        </div>
      </div>
      <Footer />

      {cartProductId && (
        <div className={style.cartModal}>
          <div className={style.modalContent}>
            <h2>Enter Quantity and Rental Period</h2>
            <input
              type="number"
              value={cartQuantity}
              onChange={(e) => setCartQuantity(e.target.value)}
              min="1"
              className={style.quantityInput}
            />
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={style.quantityInput}
            />
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className={style.quantityInput}
            />
            <button className={style.submitButton} onClick={handleCartSubmit}>Submit</button>
            <button className={style.cancelButton} onClick={() => setCartProductId(null)}>Cancel</button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ItemPage;
  