import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/Profile.scss";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false); // State to toggle AddBook form
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const checkuser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${user.sub}`);
        console.log('Sub_id exists', response.data);
        setError('User with this sub_id already exists. Please choose a different one.');
        window.sessionStorage.setItem('userId', response.data.user.id)
        if (response) {
          return true;
        }
        return false;

      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('Sub_id does not exist.');
          setError(null); // Clear any previous errors
        } else {
          // Handle other error cases
          console.error('Error checking sub_id existence:', error.message);
        }
      }
    }
    if (user) {
      const postData = async () => {
        try {
          const check = await checkuser();

          if (!check) {
            const postDataa = {
              username: user.nickname,
              email: user.email,
              sub_id: user.sub,
              isAdministrator: false
            };
            console.log(postDataa, 'pd')
            const response = await axios.post('http://localhost:8080/users', postDataa);

            console.log('Response', response.data);

          }
        } catch (error) {
          console.error('Error posting data: ', error);
        }
      };
      postData();

    }
  }, [user, isAuthenticated]);

  const checkAdminStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${user.sub}`);
      setIsAdmin(response.data.user.isadministrator);
      // If the user is an admin, show the AddBook form initially
      if (response.data.user.isadministrator) {
        setShowAddBook(true);
      }
    } catch (error) {
      console.error('Error fetching admin status:', error.message);
    }
  };

  const toggleAdminStatus = async () => {
    try {
      const encodedUserId = encodeURIComponent(user.sub);
      // Send a POST request to update the administrator status
      const response = await axios.post(`http://localhost:8080/users/${encodedUserId}`, { isAdministrator: true });
      console.log(response.data.user, 'res');
      // Check the actual response structure and update the state accordingly
      setIsAdmin(response.data.user);
      // If the user becomes an admin, show the AddBook form
      setShowAddBook(response.data.user);
    } catch (error) {
      console.error('Error toggling admin status:', error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      checkAdminStatus();

    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  const handleIconClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    isAuthenticated && (
      <div className={`profile-container ${showDetails ? 'show-details' : ''}`}>
        <div onClick={handleIconClick} className="profile-icon">
          <img src={user.picture} alt={user.name} className="profile-image" />
        </div>

        <div className="profile-details">
          <h2>{user.name}</h2>
          <p>{user.email}</p>

          {isAdmin ? (
            <div>
              <p>You are an Administrator. You can add books by clicking on the links below:</p>
              <Link to="/BookForm" className="admin-link">BookForm</Link>
              <Link to="/LibraryForm" className="admin-link">LibraryForm</Link>
              {/* Render the AddBook component for admins */}
              {/* {showAddBook && <AddBook />} */}
            </div>
          ) : (
            <div>
              <p>Would you like to become an Administrator?</p>
              <button onClick={toggleAdminStatus} className="admin-button">
                {isAdmin ? 'Revoke Admin Privileges' : 'Become an Administrator'}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;