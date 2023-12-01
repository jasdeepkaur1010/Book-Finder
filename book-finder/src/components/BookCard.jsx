import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleBookPage from './SingleBookPage';

const BookCard = ({ id, title, author, imageUrl }) => {
  
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleToggleDetails = () => {
    console.log('yay!')
    setShowDetails(!showDetails);
    navigate(`/book/${id}`);
  };

  return (
    <div className="book-card">
      <img src={imageUrl} alt={title} className="book-image" onClick={handleToggleDetails} />
      <h3>{title}</h3>
      <p>{author}</p>
    </div>
  );
};

export default BookCard;