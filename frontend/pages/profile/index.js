import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../../styles/profile.module.css'; // Import CSS module
import Navbar from '../components/Navbar'; // Adjust the path if necessary
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
    profilePhoto: './assets/rambo.jpeg', // Set initial profile photo
    PhoneNumber: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [myOrders, setMyOrders] = useState([]);
  const [myRents, setMyRents] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/user/profile')
      .then(response => {
        setUserData(prevData => ({
          ...prevData,
          ...response.data,
          profilePhoto: response.data.profilePhoto || './assets/rambo.jpeg', // Ensure profile photo is set
        }));
        toast.success("User data loaded successfully!");
      })
      .catch(error => {
        toast.error("Failed to fetch user data: " + error.message);
      });

    axios.get('http://localhost:3000/addresses')
      .then(response => {
        setAddresses(response.data);
        toast.success("Addresses loaded successfully!");
      })
      .catch(error => {
        toast.error("Failed to fetch addresses: " + error.message);
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
        profilePhoto: userData.profilePhoto, // Include profile photo in update
      });
      toast.success('Profile updated successfully!');
      setUserData({ ...userData, ...response.data }); // Update local data with response
    } catch (error) {
      toast.error('Failed to update profile: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Optionally, revert changes
  };

  const handleChangePassword = () => {
    router.push('/changepass'); // Navigate to change password page
  };

  const handleEditPayment = (endpoint) => {
    axios.get(`http://localhost:3001/orders/${endpoint}`)
      .then(response => {
        if (endpoint === 'my-orders') {
          router.push('/myorder')
        } else if (endpoint === 'my-rents') {
          router.push('/myrent')
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
            <button className={styles.sidebarButton} onClick={handleChangePassword}>Change Password</button>
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
                    <input type="text" id="name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
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
                    <input type="text" id="phoneNumber" value={userData.PhoneNumber} onChange={(e) => setUserData({ ...userData, PhoneNumber: e.target.value })} />
                  </>
                ) : (
                  <p><strong>Phone Number:</strong> {userData.PhoneNumber}</p>
                )}
              </div>
            </div>
          </div>
          {/* Display fetched addresses */}
          <div className={styles.addressSection}>
            {addresses.map((address, index) => (
              <div key={index} className={styles.addressCard}>
                
              </div>
            ))}
          </div>
        </div>
        {/* My Orders and My Rents Section */}
        <div className={styles.ordersAndRentsContainer}>
          <div className={styles.ordersAndRents}>
            <div className={styles.myOrders}>
             
                  
            </div>
            <div className={styles.myRents}>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
