import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/footer'; // Ensure correct import
import styles from '../../styles/ItemPage.module.css'; // Ensure correct path

// Mock data for demonstration purposes
const mockItem = {
  id: 1,
  name: 'Sample Item',
  description: 'This is a sample item description.',
  price: 150,
  image: '/sample_item.jpg'
};

const ItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Fetch item data based on the ID
    // Here we use mock data, but you can replace it with a real API call
    setItem(mockItem);
  }, [id]);

  // Handler for adding to cart
  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log('Add to cart:', item);
  };

  // Handler for adding to favorites
  const handleAddToFavorites = () => {
    // Implement add to favorites functionality
    console.log('Add to favorites:', item);
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.itemContainer}>
        <img src={item.image} alt={item.name} className={styles.itemImage} />
        <div className={styles.itemDetails}>
          <h1 className={styles.itemName}>{item.name}</h1>
          <p className={styles.itemPrice}>${item.price}</p>
          <button className={styles.favoritesButton} onClick={handleAddToFavorites}>Add to Favorites</button>
          <p className={styles.itemDescription}>{item.description}</p>
          <button className={styles.cartButton} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemPage;
