import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/footerr'; // Corrected import path
import styles from '../../styles/purchase_product.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/wishlist');
        console.log('Fetched wishlist:', response.data); // Debugging line
        setProducts(response.data[0].products); // Assuming response.data[0] contains the wishlist with products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    if (product.type === "Rent") {
      router.push(`/Rent_itemPage?id=${product.productId}`);
    } else if (product.type === "Purchase") {
      router.push(`/purchase_itemPage?id=${product.productId}`);
    }
  };

  const handleDelete = async (productId, e) => {
    e.stopPropagation(); // Prevent event propagation to the card
    try {
      await axios.delete('http://localhost:3000/wishlist/remove-product', 
      { data: { productId } });
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.background}>
        <p className={styles.heading}><strong>Favorite Items</strong></p>
        <div className={styles.gridContainer}>
          {products.length > 0 ? (
            products.map(product => (
              <div
                key={product.productId}
                className={styles.card}
                onClick={() => handleCardClick(product)}
              >
                <img src="/placeholder.jpg" alt={product.name} className={styles.productImage} />
                <div className={styles.productDetails}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productPrice}>${product.price}</p>
                  <button className={styles.deleteButton} onClick={(e) => handleDelete(product.productId, e)}>
  <img src="./assets/delete.png" alt="Delete" />
</button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
