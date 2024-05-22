import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/footerr'; // Ensure this path is correct
import styles from '../../styles/purchase_product.module.css'; // Ensure this path is correct

const Products = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3002/customer-rent-products');
        console.log('Fetched products:', response.data); // Debugging line
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/Rent_itemPage?id=${id}`);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.background}>
      <p ><strong>Rent Items</strong></p>

        <div className={styles.gridContainer}>
          {products.length > 0 ? (
            products.map(product => (
              <div
                key={product._id}
                className={styles.card}
                onClick={() => handleCardClick(product._id)}
              >
                <img src="/placeholder.jpg" alt={product.name} className={styles.productImage} />
                <div className={styles.productDetails}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productPrice}>${product.price}</p>

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
