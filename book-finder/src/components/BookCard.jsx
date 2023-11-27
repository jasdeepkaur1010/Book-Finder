import React from 'react';

const BookCard = ({ title, author, coverImage }) => {
  return (
    <div className="book-card">
      <img src={coverImage} alt={`${title} cover`} />
      <div className="book-details">
        <h3>{title}</h3>
        <p>Author: {author}</p>
        
      </div>
    </div>
  );
};

export default BookCard;