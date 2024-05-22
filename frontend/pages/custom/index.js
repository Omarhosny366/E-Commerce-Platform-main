import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Adjust the path if necessary
import styles from '../../styles/Custom.module.css';
import Footer from '../components/footer'; // Import the Footer component

const CustomizationPage = () => {
  // State for selected properties
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedDimension, setSelectedDimension] = useState('');

  // Material options and prices
  const materials = [
    { name: 'HDPE', price: 100 },
    { name: 'PP', price: 120 },
    { name: 'PVC', price: 110 },
    { name: 'LDPE', price: 90 },
    { name: 'ABS', price: 130 },
    { name: 'PC', price: 150 },
  ];

  // Function to handle property selection
  const handlePropertyChange = (property, value) => {
    switch (property) {
      case 'color':
        setSelectedColor(value);
        break;
      case 'quantity':
        setSelectedQuantity(value);
        break;
      case 'material':
        setSelectedMaterial(value);
        break;
      case 'dimension':
        setSelectedDimension(value);
        break;
      default:
        break;
    }
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (selectedColor) totalPrice += 10;
    if (selectedQuantity) totalPrice += 20;
    if (selectedMaterial) {
      const material = materials.find(m => m.name === selectedMaterial);
      totalPrice += material ? material.price : 0;
    }
    if (selectedDimension) totalPrice += 40;
    return totalPrice;
  };

  // Function to handle canceling a property selection
  const cancelSelection = (property) => {
    switch (property) {
      case 'color':
        setSelectedColor('');
        break;
      case 'quantity':
        setSelectedQuantity('');
        break;
      case 'material':
        setSelectedMaterial('');
        break;
      case 'dimension':
        setSelectedDimension('');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <Navbar /> {/* Include Navbar at the top */}
      
      {/* Main content */}
      <div className={styles.mainContent}>
        {/* Left sidebar with property options */}
        <div className={styles.leftSidebar}>
          {/* Color options */}
          <div className={styles.property}>
            <div className={styles.propertyLabel}>Color:</div>
            <select
              className={styles.dropdown}
              value={selectedColor}
              onChange={(e) => handlePropertyChange('color', e.target.value)}
            >
              <option value="">Select Color</option>
              <option value="Red">Red - $10</option>
              <option value="Blue">Blue - $10</option>
              <option value="Green">Green - $10</option>
            </select>
          </div>

          {/* Quantity options */}
          <div className={styles.property}>
            <div className={styles.propertyLabel}>Quantity:</div>
            <select
              className={styles.dropdown}
              value={selectedQuantity}
              onChange={(e) => handlePropertyChange('quantity', e.target.value)}
            >
              <option value="">Select Quantity</option>
              <option value="1">1 - $20</option>
              <option value="2">2 - $40</option>
              <option value="3">3 - $60</option>
            </select>
          </div>

          {/* Material options */}
          <div className={styles.property}>
            <div className={styles.propertyLabel}>Material:</div>
            <select
              className={styles.dropdown}
              value={selectedMaterial}
              onChange={(e) => handlePropertyChange('material', e.target.value)}
            >
              <option value="">Select Material</option>
              {materials.map(material => (
                <option key={material.name} value={material.name}>
                  {material.name} - ${material.price}
                </option>
              ))}
            </select>
          </div>

          {/* Dimension options */}
          <div className={styles.property}>
            <div className={styles.propertyLabel}>Dimension:</div>
            <select
              className={styles.dropdown}
              value={selectedDimension}
              onChange={(e) => handlePropertyChange('dimension', e.target.value)}
            >
              <option value="">Select Dimension</option>
              <option value="Small">Small - $40</option>
              <option value="Medium">Medium - $40</option>
              <option value="Large">Large - $40</option>
            </select>
          </div>
        </div>

        {/* Middle content with product box */}
        <div className={styles.middleContent}>
          <div className={styles.productBox}></div>
        </div>

        {/* Right sidebar with selected choices and total price */}
        <div className={styles.rightSidebar}>
          {/* Selected choices */}
          <div className={styles.selectedChoices}>
            {/* Display selected properties */}
            {selectedColor && (
              <div className={styles.selectedProperty}>
                <span className={styles.selectedPropertyName}>Color:</span>
                <span className={styles.selectedPropertyValue}>{selectedColor}</span>
                <button onClick={() => cancelSelection('color')} className={styles.cancelButton}>
                  X
                </button>
              </div>
            )}
            {selectedQuantity && (
              <div className={styles.selectedProperty}>
                <span className={styles.selectedPropertyName}>Quantity:</span>
                <span className={styles.selectedPropertyValue}>{selectedQuantity}</span>
                <button onClick={() => cancelSelection('quantity')} className={styles.cancelButton}>
                  X
                </button>
              </div>
            )}
            {selectedMaterial && (
              <div className={styles.selectedProperty}>
                <span className={styles.selectedPropertyName}>Material:</span>
                <span className={styles.selectedPropertyValue}>{selectedMaterial}</span>
                <button onClick={() => cancelSelection('material')} className={styles.cancelButton}>
                  X
                </button>
              </div>
            )}
            {selectedDimension && (
              <div className={styles.selectedProperty}>
                <span className={styles.selectedPropertyName}>Dimension:</span>
                <span className={styles.selectedPropertyValue}>{selectedDimension}</span>
                <button onClick={() => cancelSelection('dimension')} className={styles.cancelButton}>
                  X
                </button>
              </div>
            )}
          </div>

          {/* Total price */}
          <div className={styles.totalPrice}>
            Total Price: ${calculateTotalPrice()}
          </div>

          {/* Add to cart button */}
          <button className={styles.addToCartButton}>Add to Cart</button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CustomizationPage;
