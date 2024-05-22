import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/footerr'; // Ensure correct import
import styles from '../../styles/purchase_ItemPage.module.css'; // Ensure correct path

const ItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`http://localhost:3002/customer-purchase-products/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    console.log('Add to cart:', item);
    // Implement add to cart functionality here
  };

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post('http://localhost:3000/wishlist/add-products', {
        ProductID: [item._id], // Sending product ID in the required format
      });
      if (response.status >= 200 && response.status < 300) {
        console.log('Product added to favorites:', response.data);
        alert('Product added to favorites!');
      } else {
        console.error('Failed to add product to favorites:', response.data);
        alert('Failed to add product to favorites.');
      }
    } catch (error) {
      console.error('Error adding product to favorites:', error);
      alert('Error adding product to favorites. Please try again.');
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.itemContainer}>
        <img src="/placeholder.jpg" alt={item.name} className={styles.itemImage} />
        <div className={styles.itemDetails}>
          <h1 className={styles.itemName}>{item.name}</h1>
          <p className={styles.itemPrice}><strong>${item.price}</strong></p>
          <p className={styles.productMaterial}><strong>Material:</strong> {item.material}</p>
          <p className={styles.productColor}><strong>Color:</strong> {item.color}</p>
          <p className={styles.productDimensions}><strong>Dimensions:</strong> {item.dimensions}</p>
          <p className={styles.productReview}><strong>Review:</strong> {item.review}</p>
          <p className={styles.productType}><strong>Type:</strong> {item.type}</p>
          <p className={styles.productQuantity}><strong>Quantity:</strong> {item.quantity}</p>

          <button className={styles.favoritesButton} onClick={handleAddToFavorites}>Add to Favorites</button>
          <button className={styles.cartButton} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemPage;
