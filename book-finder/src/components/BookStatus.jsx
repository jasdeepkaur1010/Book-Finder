import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import axios from 'axios';

const BookStatus = ({ book, libraryId }) => {
  const { user, isAuthenticated } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState(book.status);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Fetch user data to check if the user is an admin
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/users/${user.sub}`);
          setIsAdmin(response.data.user.isadministrator);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  const updateBookStatus = async () => {
    if (isAdmin) {
      try {
        await axios.put(`http://localhost:8080/libraries/${libraryId}/books/${book.id}`, { status });
        console.log('Book status updated successfully.');
      } catch (error) {
        console.error('Error updating book status:', error);
      }
    } else {
      console.log('Unauthorized: Only administrators can update book status.');

    }
  };
  const statusOptions = ['Available', 'Rented', 'sold'];
  return (
    <div>
      {isAdmin && (
        <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
           <div style={{ display: 'flex', marginBottom: '5px' }}>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            style={{ width: '100px', marginRight: '5px', height: '30px' }}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={updateBookStatus}
            style={{ width: '120px', height: '30px', fontSize: '14px' }}
          >
            Update Status
          </button>
        </div>
        </div>
      )}
    </div>
  );
};



export default BookStatus;
