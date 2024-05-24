import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import Navbar from '../components/Navbar'; // Import Navbar component
import styles from '../../styles/profile.module.css'; // Import CSS module

const Profile = () => {
  const router = useRouter(); // Initialize useRouter
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    profilePhoto: '',
  });

  const [isEditing, setIsEditing] = useState(false); // State to track editing mode

  useEffect(() => {
    // Fetch user data from backend
    // Example:
    // fetchUserData().then(data => setUserData(data));
  }, []);

  // Handler for editing profile photo
  const handleEditPhoto = () => {
    document.getElementById('fileInput').click();
  };

  // Handler for updating profile photo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserData({
        ...userData,
        profilePhoto: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handler for editing user info
  const handleEditInfo = () => {
    setIsEditing(true); // Set editing mode to true
  };

  // Handler for saving edited user info
  const handleSaveInfo = () => {
    setIsEditing(false); // Set editing mode to false
    // Implement save info functionality
  };

  // Handler for canceling editing user info
  const handleCancelEdit = () => {
    setIsEditing(false); // Set editing mode to false
    // Implement cancel edit functionality (e.g., revert changes)
  };

  // Handler for editing payment info
  const handleEditPayment = () => {
    console.log('Edit payment button clicked');
  };

  // Handler for navigating to the change password page
  const handleChangePassword = () => {
    router.push('/changepass'); // Navigate to change password page
  };

  return (
    <div className={styles.container}>
      {/* Include Navbar component */}
      <Navbar />

      {/* Profile Content */}
      <div className={styles.profileContent}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarBox}>
            {/* Add button to navigate to Change Password page */}
            <button className={styles.sidebarButton} onClick={handleChangePassword}>Change Password</button>

            <button className={styles.sidebarButton} onClick={handleEditPhoto}>Edit Photo</button>
            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handlePhotoChange} />
            {isEditing ? (
              <>
                {/* Save and Cancel buttons */}
                <button className={styles.sidebarButton} onClick={handleSaveInfo}>Save</button>
                <button className={styles.sidebarButton} onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              // "Edit Info" button
              <button className={styles.sidebarButton} onClick={handleEditInfo}>Edit Info</button>
            )}
            <button className={styles.sidebarButton} onClick={handleEditPayment}>Edit Payment</button>
          </div>
        </div>

        {/* Profile Information */}
        <div className={styles.profileInfo}>
          <div className={styles.profileHeader}>
            <div className={styles.profilePhoto} style={{ backgroundImage: `url(${userData.profilePhoto})` }}></div>

            <div className={styles.userInfo}>
              {/* Editable fields */}
              <div className={styles.userInfoBox}>
                {isEditing ? (
                  <>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                  </>
                ) : (
                  <p><strong>Name:</strong> {userData.name}</p>
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
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                  </>
                ) : (
                  <p><strong>Password:</strong> {userData.password}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
