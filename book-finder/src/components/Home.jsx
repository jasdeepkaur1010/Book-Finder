import React, { useState, useEffect } from 'react';
// import backgroundImage from './Books.jpg';
import Profile from './Profile';
import BookCard from './BookCard';
import axios from 'axios';

import '../styles/Home.scss';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = async () => {
    try {
      // Make a request to your search-books API endpoint using axios
      const response = await axios.get(`http://localhost:8080/api/search-books?query=${searchTerm}`);
      
      // Check if the request was successful
      if (response.status === 200) {
        // Update the searchResults state with the fetched results
        setSearchResults(response.data);
      } else {
        throw new Error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error during search:', error.message);
      // Handle the error, e.g., display an error message to the user
    }
  };
  
  useEffect(() => {
    // You might want to add additional logic here if needed when the searchTerm changes
    // For example, debouncing the search to avoid making requests on every keystroke
  }, [searchTerm]);


  // Dummy book data for illustration
  const dummyBooks = [
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 1, title: 'Book 2', author: 'Author 2', imageUrl: 'https://m.media-amazon.com/images/I/41SKsBaGXRL._SY445_SX342_.jpg' },
    { id: 1, title: 'Book 2', author: 'Author 2', imageUrl: 'https://m.media-amazon.com/images/I/41SKsBaGXRL._SY445_SX342_.jpg' },
    { id: 1, title: 'Book 2', author: 'Author 2', imageUrl: 'https://m.media-amazon.com/images/I/41SKsBaGXRL._SY445_SX342_.jpg' },

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