import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Adjust the path if necessary
import styles from '../../styles/custom.module.css';
import Footer from '../components/footerr'; // Import the Footer component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomizationPage = () => {
  // State for selected properties
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedDimension, setSelectedDimension] = useState('');

  // State for customized products
  const [customizedProducts, setCustomizedProducts] = useState([]);
  const [cartProductId, setCartProductId] = useState(null);
  const [cartQuantity, setCartQuantity] = useState('');

  // Material options
  const materials = [
    { name: 'HDPE' },
    { name: 'PP' },
    { name: 'PVC' },
    { name: 'LDPE' },
    { name: 'ABS' },
    { name: 'PC' },
  ];

  useEffect(() => {
    // Fetch customized products on component mount
    const fetchCustomizedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3002/customized-products');
        setCustomizedProducts(response.data);
      } catch (error) {
        console.error('Error fetching customized products:', error);
        toast.error('Failed to load customized products');
      }
    };

    fetchCustomizedProducts();
  }, []);

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
    if (selectedColor) totalPrice += 50;
    if (selectedQuantity) totalPrice += 50 * selectedQuantity;
    if (selectedMaterial) totalPrice += 50;
    if (selectedDimension) totalPrice += 50;
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

  // Function to handle adding the customized product to the cart
  const handleAddProduct = async () => {
    const totalPrice = calculateTotalPrice();
    const downpayment = totalPrice * 0.3;
    const productDetails = {
      color: selectedColor,
      quantity: 200,
      
      material: selectedMaterial,
      dimensions: selectedDimension,
      price: totalPrice,
      type: "customized",
      name: "Customized Product",
      customizing_status: "Preparing",
      downpayment: downpayment
    };

    try {
      const response = await axios.post('http://localhost:3002/customized-products', productDetails);
      if (response.status >= 200 && response.status < 300) {
        toast.success('Product added successfully!');
        setCustomizedProducts([...customizedProducts, response.data]);
window.location.reload();
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };

  // Function to handle adding a product to the cart
  const handleAddToCart = (productId) => {
    setCartProductId(productId);
  };

  // Function to handle cart submission
  const handleCartSubmit = async () => {
    if (!cartQuantity || isNaN(cartQuantity) || cartQuantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    const cartDetails = {
      productId: cartProductId,
      quantity: parseInt(cartQuantity)
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
      toast.error('Failed to add product to cart, LogIn');
    }
  };

  // Function to handle deleting a customized product
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3002/customized-products/${productId}`);
      if (response.status >= 200 && response.status < 300) {
        toast.success('Product deleted successfully');
        setCustomizedProducts(customizedProducts.filter(product => product._id !== productId));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
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
              <option value="Red">Red - $50</option>
              <option value="Blue">Blue - $50</option>
              <option value="Green">Green - $50</option>
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
                  {material.name} - $50
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
              <option value="Small">Small - $50</option>
              <option value="Medium">Medium - $50</option>
              <option value="Large">Large - $50</option>
            </select>
          </div>

          {/* Add product button */}
          {/* <button className={styles.addProductButton} onClick={handleAddProduct}>Add Product</button> */}
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
          <button className={styles.addToCartButton} onClick={handleAddProduct}>Add Product</button>
        </div>
      </div>

      {/* Add to Cart Modal */}
      {cartProductId && (
        <div className={styles.cartModal}>
          <div className={styles.modalContent}>
            <h2>Enter Quantity</h2>
            <input
              type="number"
              value={cartQuantity}
              onChange={(e) => setCartQuantity(e.target.value)}
              min="1"
              className={styles.quantityInput}
              style={{ width: '40px' }} // Set the width to 40px
            />
            <button className={styles.submitButton} onClick={handleCartSubmit}>Submit</button>
            <button className={styles.cancelButton} onClick={() => setCartProductId(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Customized products */}
      <div className={styles.customizedProducts}>
        {customizedProducts.map(product => (
          <div key={product._id} className={styles.productCard}>
            <div className={styles.productDetails}>
              <div><strong>{product.name}</strong></div>
              <div>Price: ${product.price}</div>
            </div>
            <div className={styles.productActions}>
              <button className={styles.addToCartButton} onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
              <button className={styles.deleteButton} onClick={(e) => {e.stopPropagation(); handleDeleteProduct(product._id);}}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />

      <ToastContainer />
    </div>
  );
};

export default CustomizationPage;
