import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/addproduct.module.css'; // Ensure this path is correct
import Navbar from '../components/navbarr'; // Ensure this path is correct

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('purchase');
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');
  const [dimension, setDimension] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');
  const [endDate, setEndDate] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (!productName || !color || !material || !dimension || !quantity || !price || (productType === 'rent' && (!startDate || !duration || !endDate))) {
      setError('Please fill in all fields.');
      toast.error('Please fill in all fields.');
      return;
    }

    // Prepare the form data
    const formData = {
      type: productType,
      name: productName,
      color,
      material,
      dimensions: dimension,
      quantity: Number(quantity),
      price: Number(price),
      review: Number(review),
      ...(productType === 'rent' && {
        start_date: new Date(startDate),
        duration: Number(duration),
        end_date: new Date(endDate),
      }),
    };

    try {
      let response;
      if (productType === 'rent') {
        response = await axios.post('http://localhost:3002/customer-rent-products', formData);
      } else {
        response = await axios.post('http://localhost:3002/customer-purchase-products', formData);
      }
      toast.success('Product added successfully!');

      // Reset form fields
      setProductName('');
      setProductType('purchase');
      setColor('');
      setMaterial('');
      setDimension('');
      setQuantity('');
      setPrice('');
      setStartDate('');
      setDuration('');
      setEndDate('');
      setReview('');
      setError('');
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('An error occurred while submitting the form. Please try again.');
      setError('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
    <Navbar/>
      <h2 className={styles.title}>Add Product</h2>
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputRow}>
          <div className={styles.labelWrapper}>
            <label htmlFor="productName" className={styles.label}>Product Name:</label>
            <input type="text" id="productName" value={productName} onChange={handleInputChange(setProductName)} className={styles.inputField} />
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="productType" className={styles.label}>Product Type:</label>
            <select id="productType" value={productType} onChange={handleInputChange(setProductType)} className={styles.inputField}>
              <option value="purchase" style={{ color: 'black' }}>Purchase</option>
              <option value="rent" style={{ color: 'black' }}>Rent</option>
            </select>
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.labelWrapper}>
            <label htmlFor="color" className={styles.label}>Color:</label>
            <input type="text" id="color" value={color} onChange={handleInputChange(setColor)} className={styles.inputField} />
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="material" className={styles.label}>Material:</label>
            <input type="text" id="material" value={material} onChange={handleInputChange(setMaterial)} className={styles.inputField} />
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.labelWrapper}>
            <label htmlFor="dimension" className={styles.label}>Dimension:</label>
            <input type="text" id="dimension" value={dimension} onChange={handleInputChange(setDimension)} className={styles.inputField} />
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="quantity" className={styles.label}>Quantity:</label>
            <input type="number" id="quantity" value={quantity} onChange={handleInputChange(setQuantity)} className={styles.inputField} />
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.labelWrapper}>
            <label htmlFor="price" className={styles.label}>
              {productType === 'rent' ? 'Price per Day:' : 'Price:'}
            </label>
            <input type="number" id="price" value={price} onChange={handleInputChange(setPrice)} className={styles.inputField} />
          </div>
          {productType === 'rent' && (
            <>
              <div className={styles.labelWrapper}>
                <label htmlFor="startDate" className={styles.label}>Start Date:</label>
                <input type="date" id="startDate" value={startDate} onChange={handleInputChange(setStartDate)} className={styles.inputField} />
              </div>
              <div className={styles.labelWrapper}>
                <label htmlFor="duration" className={styles.label}>Duration (days):</label>
                <input type="number" id="duration" value={duration} onChange={handleInputChange(setDuration)} className={styles.inputField} />
              </div>
              <div className={styles.labelWrapper}>
                <label htmlFor="endDate" className={styles.label}>End Date:</label>
                <input type="date" id="endDate" value={endDate} onChange={handleInputChange(setEndDate)} className={styles.inputField} />
              </div>
            </>
          )}
          <div className={styles.labelWrapper}>
            <label htmlFor="review" className={styles.label}>Review:</label>
            <input type="number" id="review" value={review} onChange={handleInputChange(setReview)} className={styles.inputField} />
          </div>
        </div>
        <button type="submit" className={styles.button}>Add Product</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProductPage;
