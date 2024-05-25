import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/footerr'; // Corrected the import spelling
import styles from '../../styles/purchase_ItemPage.module.css'; // Ensure correct path
import style from '../../styles/custom.module.css'; // Ensure correct path
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [cartProductId, setCartProductId] = useState(null);
  const [cartQuantity, setCartQuantity] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:3002/customer-purchase-products/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
        toast.error('Error fetching item details.');
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    setCartProductId(item._id);
  };

  const handleCartSubmit = async () => {
    if (!cartQuantity || isNaN(cartQuantity) || parseInt(cartQuantity) <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    const cartDetails = {
      productId: cartProductId,
      quantity: parseInt(cartQuantity),
    };

    try {
      const response = await axios.patch('http://localhost:3001/cart', cartDetails);
      if (response.status >= 200 && response.status < 300) {
        toast.success('Product added to cart successfully!');
        setCartProductId(null);
        setCartQuantity('');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart. Please try again.');
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post('http://localhost:3000/wishlist/add-products', {
        ProductID: item._id, // Assuming array is not needed
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success('Product added to favorites!');
      } else {
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
        <img src="./assets/product.jpg" alt={item.name} className={styles.itemImage} />
        <div className={styles.itemDetails}>
          <h1 className={styles.itemName}>{item.name}</h1>
          <p className={styles.itemPrice}><strong>${item.price.toFixed(2)}</strong></p>
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

      {/* Add to Cart Modal */}
      {cartProductId && (
        <div className={style.cartModal}>
          <div className={style.modalContent}>
            <h2>Enter Quantity</h2>
            <input
              type="number"
              value={cartQuantity}
              onChange={(e) => setCartQuantity(e.target.value)}
              min="1"
              className={style.quantityInput}
            />
            <button className={style.submitButton} onClick={handleCartSubmit}>Submit</button>
            <button className={style.cancelButton} onClick={() => setCartProductId(null)}>Cancel</button>
          </div>
        </div>
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ItemPage;
