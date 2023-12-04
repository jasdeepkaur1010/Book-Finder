import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import "../styles/Home.scss";
import Profile from './Profile';
import axios from 'axios';

const Home = ({ dummyBooks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [authorSearchTerm, setAuthorSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/books?query=${searchTerm}`);

      if (response.status === 200) {
        setSearchResults(response.data);
      } else {
        throw new Error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error during search:', error.message);
    }
  };

  const searchByAuthor = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/books?author=${authorSearchTerm}`);

      if (response.status === 200) {
        setSearchResults(response.data);
      } else {
        throw new Error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error during search by author:', error.message);
    }
  };

  const fetchTopRatedBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books/top-rated');

      if (response.status === 200) {
        setTopRatedBooks(response.data.topRatedBooks);
      } else {
        throw new Error('Failed to fetch top-rated books');
      }
    } catch (error) {
      console.error('Error fetching top-rated books:', error);
    }
  };

  useEffect(() => {
    // Fetch top-rated books on component mount
    fetchTopRatedBooks();
  }, []);

  return (
    <div className="content">
    
    <div className="search-section">
      {/* search books  */}
      <h1>Library Hub</h1>
      <div className="search-general">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
        

      {/* search by author  */}
       <div className="search-author">
        <input
          type="text"
          placeholder="Search by author..."
          value={authorSearchTerm}
          onChange={(e) => setAuthorSearchTerm(e.target.value)}
        />
        <button onClick={searchByAuthor}>Search</button>
        </div>
      </div>

      <div className="book-cards">
        {/* Display search results or top-rated books based on the context */}
        {(searchResults.length > 0 ? searchResults : topRatedBooks).map((book) => (
          <BookCard key={book.id} id={book.id} title={book.title} author={book.author} cover_image_url={book.cover_image_url} imageUrl={book.cover_image_url} />
        ))}
      </div>
    </div>
  );
};

export default Home;
