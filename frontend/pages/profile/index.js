import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../../styles/profile.module.css'; // Import CSS module
import Navbar from '../components/Navbar'; // Adjust the path if necessary

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    profilePhoto: '',
    PhoneNumber: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [myOrders, setMyOrders] = useState([]);
  const [myRents, setMyRents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/user/profile')
      .then(response => {
        setUserData(response.data);
        toast.success("User data loaded successfully!");
      })
      .catch(error => {
        toast.error("Failed to fetch user data: " + error.message);
      });
  }, []);

  const handleEditPhoto = () => {
    document.getElementById('fileInput').click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserData({ ...userData, profilePhoto: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditInfo = () => {
    setIsEditing(true);
  };

  const handleSaveInfo = async () => {
    setIsEditing(false);
    try {
      const response = await axios.put('http://localhost:3000/user/update', {
        username: userData.username,
        email: userData.email,
        PhoneNumber: userData.PhoneNumber,
      });
      toast.success('Profile updated successfully!');
      setUserData({...userData, ...response.data}); // Update local data with response
    } catch (error) {
      toast.error('Failed to update profile: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Optionally, revert changes
  };

  const handleEditPayment = (endpoint) => {
    axios.get(`http://localhost:3001/orders/${endpoint}`)
      .then(response => {
        if (endpoint === 'my-orders') {
          setMyOrders(response.data);
        } else if (endpoint === 'my-rents') {
          setMyRents(response.data);
        }
        toast.success(`Fetched ${endpoint.replace('-', ' ')} successfully!`);
      })
      .catch(error => {
        toast.error(`Failed to fetch ${endpoint.replace('-', ' ')}: ${error.message}`);
      });
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.profileContent}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarBox}>
            <button className={styles.sidebarButton} onClick={handleEditPhoto}>Edit Photo</button>
            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handlePhotoChange} />
            {isEditing ? (
              <>
                <button className={styles.sidebarButton} onClick={handleSaveInfo}>Save</button>
                <button className={styles.sidebarButton} onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <button className={styles.sidebarButton} onClick={handleEditInfo}>Edit Info</button>
            )}
            <button className={styles.sidebarButton} onClick={() => handleEditPayment('my-orders')}>My Orders</button>
            <button className={styles.sidebarButton} onClick={() => handleEditPayment('my-rents')}>My Rents</button>
          </div>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.profileHeader}>
            <div className={styles.profilePhoto} style={{ backgroundImage: `url(${userData.profilePhoto})` }}></div>
            <div className={styles.userInfo}>
              <div className={styles.userInfoBox}>
                {isEditing ? (
                  <>
                    <label htmlFor="name"></label>
                  </>
                ) : (
                  <p><strong></strong> {userData.name}</p>
                )}
              </div>
              <div className={styles.userInfoBox}>
                {isEditing ? (
                  <>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                  </>
                ) : (
                  <p><strong>Email:</strong> {userData.email}</p>
                )}
              </div>
              <div className={styles.userInfoBox}>
                {isEditing ? (
                  <>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                  </>
                ) : (
                  <p><strong>Username:</strong> {userData.username}</p>
                )}
              </div>
              <div className={styles.userInfoBox}>
                {isEditing ? (
                  <>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" value={userData.PhoneNumber} onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })} />
                  </>
                ) : (
                  <p><strong>Phone Number:</strong> {userData.PhoneNumber}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* My Orders and My Rents Section */}
        <div className={styles.ordersAndRentsContainer}>
          <div className={styles.ordersAndRents}>
            <div className={styles.myOrders}>
              <h2>My Orders</h2>
              {myOrders.map(order => (
                <div key={order._id} className={styles.orderCard}>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>User ID:</strong> {order.userId}</p>
                  <div>
                    <p><strong>Address:</strong></p>
                    <p>{order.address.buildingNumber}, {order.address.buildingType}</p>
                    <p>{order.address.street}, {order.address.flatNumber}</p>
                    <p>{order.address.city}, {order.address.floor}</p>
                  </div>
                  <div>
                    <p><strong>Items:</strong></p>
                    {order.items.map(item => (
                      <div key={item._id}>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price}</p>
                        <p>Type: {item.type}</p>
                        <p>Material: {item.material}</p>
                        <p>Dimensions: {item.dimensions}</p>
                      </div>
                    ))}
                  </div>
                  <p><strong>Total Amount:</strong> ${order.total}</p>
                  <p><strong>Downpayment:</strong> ${order.downpayment}</p>
                  <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                  <p><strong>Start Date:</strong> {new Date(order.startDate).toLocaleString()}</p>
                  <p><strong>End Date:</strong> {new Date(order.endDate).toLocaleString()}</p>
                  <p><strong>Remaining Amount:</strong> ${order.remainingAmount}</p>
                  <p><strong>Days Left:</strong> {order.daysLeft}</p>
                </div>
              ))}
            </div>
            <div className={styles.myRents}>
              <h2>My Rents</h2>
              {myRents.map(rent => (
                <div key={rent._id} className={styles.rentCard}>
                  <div className={styles.rentCardBody}>
                    <p><strong>Status:</strong> {rent.status}</p>
                    <p><strong>Rent ID:</strong> {rent._id}</p>
                    <p><strong>User ID:</strong> {rent.userId}</p>
                    <div>
                      <p><strong>Address:</strong></p>
                      <p>{rent.address.buildingNumber}, {rent.address.buildingType}</p>
                      <p>{rent.address.street}, {rent.address.flatNumber}</p>
                      <p>{rent.address.city}, {rent.address.floor}</p>
                    </div>
                    <div>
                      <p><strong>Items:</strong></p>
                      {rent.items.map(item => (
                        <div key={item._id}>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ${item.price}</p>
                          <p>Type: {item.type}</p>
                          <p>Material: {item.material}</p>
                          <p>Dimensions: {item.dimensions}</p>
                        </div>
                      ))}
                    </div>
                    <p><strong>Total Amount:</strong> ${rent.total}</p>
                    <p><strong>Downpayment:</strong> ${rent.downpayment}</p>
                    <p><strong>Created At:</strong> {new Date(rent.createdAt).toLocaleString()}</p>
                    <p><strong>Start Date:</strong> {new Date(rent.startDate).toLocaleString()}</p>
                    <p><strong>End Date:</strong> {new Date(rent.endDate).toLocaleString()}</p>
                    <p><strong>Remaining Amount:</strong> ${rent.remainingAmount}</p>
                    <p><strong>Days Left:</strong> {rent.daysLeft}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
