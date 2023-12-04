import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleBookPage from './SingleBookPage';

const BookCard = ({ id, title, author, imageUrl, status}) => {
  
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleToggleDetails = () => {
    console.log('yay!')
    setShowDetails(!showDetails);
    navigate(`/books/${id}`);
  };

  return (
    <div className="book-card">
      <img src={imageUrl} alt={title} className="book-image" onClick={handleToggleDetails} />
{/* //const BookCard = ({ title, author, cover_image_url}) => { */}
  {/* //return (
    //<div className="book-card">
    // <img src={cover_image_url} alt={title} className="book-image" /> */}
      <h3>{title}</h3>
      <p>{author}</p>
      <p>{status}</p>
    </div>
  );
};

export default BookCard;