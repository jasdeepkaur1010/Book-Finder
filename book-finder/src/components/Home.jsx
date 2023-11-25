import React, { useState } from 'react';
import backgroundImage from './Books.jpg';
import Profile from './Profile';
import BookCard from './BookCard';

import '../styles/Home.scss';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const buttonStyle = {
    position: 'absolute',
    top: '50%',  
    left: '50%',
    transform: 'translate(200%, 80%)', 
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const handleSearch = () => {
    console.log(`Searching for books with term: ${searchTerm}`);
  };

  // Dummy book data for illustration
  const dummyBooks = [
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },

  ];

  return (
    <div className='homepage'>
      <Profile />
      <h1>Book Finder</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="book-cards">
        {dummyBooks.map((book) => (
          <BookCard key={book.id} title={book.title} author={book.author} imageUrl={book.imageUrl} />
        ))}
      </div>
      {/* <img width={1500} height={690} src={backgroundImage} className="background-image" alt="backgroundImage" />
      <a href="/login" style={buttonStyle}>Get started here!</a> */}
    </div>
  );
};

export default Home;