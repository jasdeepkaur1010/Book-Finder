import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import "../styles/Home.scss";
import Profile from './Profile';
import axios from 'axios';
import LoginButton from './LoginButton';

const Home = ( {dummyBooks} ) => {

  const [searchTerm, setSearchTerm] = useState('');
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

  const searchByAuthor = async (author) => {
    try {
      const response = await axios.get(`http://localhost:8080/books?author=${author}`);
  
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
 {/* // return (
   // <div >
     // <div className="book-cards">
       // {searchResults.map((book) => (
         // <BookCard key={book.id} title={book.title} author={book.author} imageUrl={book.imageUrl} />
        //))}
     // </div>
  

  //return (
  //  <div > */}
  <LoginButton />
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

      <div className="search-by-author">
        <input
          type="text"
          placeholder="Search by author..."
          onChange={(e) => searchByAuthor(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="book-cards">
        {/* Display search results or top-rated books based on the context */}
        {(searchResults.length > 0 ? searchResults : topRatedBooks).map((book) => (
          <BookCard key={book.id} id={book.id} title={book.title} author={book.author} cover_image_url={book.cover_image_url} imageUrl={book.cover_image_url} />
        //   {/*  {dummyBooks.map((book) => (
        //  <BookCard id={book.id} key={book.id} title={book.title} author={book.author_id} imageUrl={book.cover_image_url} /> */}
        ))}
      </div>
    </div>
  );
};

export default Home;
