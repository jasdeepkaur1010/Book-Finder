import React from 'react';

const BookCard = ({ title, author, imageUrl }) => {
  return (
    <div className="book-card">
      <img src={imageUrl} alt={title} className="book-image" />
      <h3>{title}</h3>
      <p>{author}</p>
    </div>
  );
};

export default BookCard;