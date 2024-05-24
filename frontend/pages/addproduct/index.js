import React, { useState } from 'react';
import styles from '../../styles/addproduct.module.css'; // Correctly import the CSS module

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('purchase');
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');
  const [dimension, setDimension] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [error, setError] = useState('');

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleMaterialChange = (e) => {
    setMaterial(e.target.value);
  };

  const handleDimensionChange = (e) => {
    setDimension(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handlePricePerDayChange = (e) => {
    setPricePerDay(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    if (!productName || !color || !material || !dimension || !quantity || !price) {
      setError('Please fill in all fields.');
      return;
    }
    // Submit the form data
    const formData = {
      productName,
      productType,
      color,
      material,
      dimension,
      quantity,
      price: productType === 'rent' ? pricePerDay : price,
    };
    console.log('Form submitted:', formData);
    // Reset form fields
    setProductName('');
    setColor('');
    setMaterial('');
    setDimension('');
    setQuantity('');
    setPrice('');
    setPricePerDay('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add Product</h2>
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputRow}>
          <div className={styles.labelWrapper}>
            <label htmlFor="productName" className={styles.label}>Product Name:</label>
            <input type="text" id="productName" value={productName} onChange={handleProductNameChange} className={styles.inputField} />
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="productType" className={styles.label}>Product Type:</label>
            <select id="productType" value={productType} onChange={handleProductTypeChange} className={styles.inputField}>
              <option value="purchase">Purchase</option>
              <option value="rent">Rent</option>
            </select>
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.labelWrapper}>
            <label htmlFor="color" className={styles.label}>Color:</label>
            <input type="text" id="color" value={color} onChange={handleColorChange} className={styles.inputField} />
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="material" className={styles.label}>Material:</label>
            <input type="text" id="material" value={material} onChange={handleMaterialChange} className={styles.inputField} />
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.labelWrapper}>
            <label htmlFor="dimension" className={styles.label}>Dimension:</label>
            <input type="text" id="dimension" value={dimension} onChange={handleDimensionChange} className={styles.inputField} />
          </div>
          <div className={styles.labelWrapper}>
            <label htmlFor="quantity" className={styles.label}>Quantity:</label>
            <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} className={styles.inputField} />
          </div>
        </div>
        <div className={styles.inputRow}>
          <div className={styles.labelWrapper}>
            <label htmlFor="price" className={styles.label}>
              {productType === 'rent' ? 'Price per Day:' : 'Price:'}
            </label>
            <input type="number" id="price" value={productType === 'rent' ? pricePerDay : price} onChange={productType === 'rent' ? handlePricePerDayChange : handlePriceChange} className={styles.inputField} />
          </div>
        </div>
        <button type="submit" className={styles.button}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
