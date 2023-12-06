// SingleBookPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "../styles/SingleBook.scss";

const SingleBookPage = ({ dummyBooks }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const dummyBook = dummyBooks.find(item => item.id == id);
  const [bookRatings, setBookRatings] = useState([]);


  const storedUserId = sessionStorage.getItem('userId');
  const fetchBookRatings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/book/${dummyBook.id}/review`);
      setBookRatings(response.data.reviews); // Set the fetched ratings in state
    } catch (error) {
      console.error('Error fetching book ratings:', error.message);
    }
  };

  const fetchUsername = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/${storedUserId}`);
      setUsername(response.data.user.username);
    } catch (error) {
      console.error('Error fetching username:', error.message);
    }
  };

  useEffect(() => {
    // Fetch book ratings when the component mounts
    fetchBookRatings();
    fetchUsername();
  }, [dummyBook.id, storedUserId]);


  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSave = async () => {
    try {
      // Make a POST request to add the rating and comment
      await axios.post(`http://localhost:8080/book/${dummyBook.id}/review`, {
        rating: rating,
        comment: comment,
      });

      // Fetch book ratings after adding a new rating
      fetchBookRatings();
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error adding rating and comment:', error.message);
    }

    // Implement the logic to save the rating and comment (e.g., send to the server)
    console.log('Rating:', rating);
    console.log('Comment:', comment);
  };

  return (
    <div className="container">
      <img src={dummyBook.cover_image_url} alt={dummyBook.title} />
      <h2>{dummyBook.title}</h2>
      <p>Author: {dummyBook.author_id}</p>
      <p>Publication Date: {dummyBook.publication_date}</p>
      <p>Genre: {dummyBook.genre}</p>
      <p>ISBN: {dummyBook.isbn}</p>
      <p>Status: {dummyBook.status}</p>
      <p className='summary'>Summary: {dummyBook.summary}</p>

      {/* Conditionally render based on user login */}
      {storedUserId ? (
        <>
          {/* Star Rating */}
          <div>
            <p>Rate this book:</p>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                onClick={() => handleRatingChange(value)}
                style={{ cursor: 'pointer', color: value <= rating ? 'gold' : 'gray' }}
              >
                ★
              </span>
            ))}
          </div>

          {/* Comment Section */}
          <div>
            <p>Add a comment:</p>
            <textarea value={comment} onChange={handleCommentChange} rows="4" cols="50" />
          </div>

          {/* Save Button */}
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <p>To add reviews, please <a href="/login">Login Here</a></p>
      )}

      {/* Display ratings and comments if available */}
      {bookRatings.length > 0 && (
        <div>
          <h2>Reviews</h2>
          <ul>
            {bookRatings.map((rating, index) => (
              <li key={index}>
                <p>Rating: {rating.rating}</p>
                <p>Comment: {rating.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export default SingleBookPage;
