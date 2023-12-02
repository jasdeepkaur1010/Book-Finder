import React from 'react';

const BookCard = ({ title, author, cover_image_url}) => {
  return (
    <div className="book-card">
      <img src={cover_image_url} alt={title} className="book-image" />
      <h3>{title}</h3>
      <p>{author}</p>
    </div>
  );
};

export default BookCard;