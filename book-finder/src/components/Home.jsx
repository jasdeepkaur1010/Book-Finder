
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import "../styles/Home.scss";
import backgroundImage from './Books.jpg';
import Profile from './Profile';
import axios from 'axios';

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
  

  // Dummy book data for illustration
  const dummyBooks = [
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 2, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 3, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 4, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 5, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 6, title: 'Book 2', author: 'Author 2', imageUrl: 'https://m.media-amazon.com/images/I/41SKsBaGXRL._SY445_SX342_.jpg' },
    { id: 7, title: 'Book 2', author: 'Author 2', imageUrl: 'https://m.media-amazon.com/images/I/41SKsBaGXRL._SY445_SX342_.jpg' },
    { id: 8, title: 'Book 2', author: 'Author 2', imageUrl: 'https://m.media-amazon.com/images/I/41SKsBaGXRL._SY445_SX342_.jpg' },

  ];

  return (
    <div >
      <div className="book-cards">
        {searchResults.map((book) => (
          <BookCard key={book.id} title={book.title} author={book.author} />
        ))}
      </div>

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
    </div>
  );
};

export default Home;