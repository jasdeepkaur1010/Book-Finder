
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import "../styles/Home.scss";
import backgroundImage from './Books.jpg';
import Profile from './Profile';
import axios from 'axios';

const Home = ( {dummyBooks} ) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = async () => {
    try {
      // Make a request to search-books API endpoint using axios
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
  

  return (
    <div >
      <div className="book-cards">
        {searchResults.map((book) => (
          <BookCard key={book.id} title={book.title} author={book.author} imageUrl={book.imageUrl} />
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
        <button onClick={() => handleSearch()}>Search</button>
      </div>
      <div className="book-cards">
        {dummyBooks.map((book) => (
          <BookCard id={book.id} key={book.id} title={book.title} author={book.author_id} imageUrl={book.cover_image_url} />
        ))}
      </div>
    </div>
  );
};

export default Home;