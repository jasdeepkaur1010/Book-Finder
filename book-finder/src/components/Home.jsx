import React, { useState } from 'react';
import BookCard from './BookCard';
import "../styles/Home.scss";
import backgroundImage from './Books.jpg';
import Profile from './Profile';

const Home = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Dummy book data for illustration
  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    // Add more books as needed
  ];

  // Function to handle search input
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter books based on the search term
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
    );

    setSearchResults(results);
  };

  return (
    <div className='homepage'>
      <h1>Book Finder</h1>
        <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="book-cards">
        {searchResults.map((book) => (
          <BookCard key={book.id} title={book.title} author={book.author} />
        ))}
      </div>

      <Profile />
      <img width={1500} height={690} src={backgroundImage} className="background-image" alt="backgroundImage" />
      <a href="/login" style={buttonStyle}>Get started here!</a>
    </div>
  );
};

export default Home;
