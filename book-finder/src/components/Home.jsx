import React, { useState } from 'react';
import BookCard from './BookCard';
import "../styles/Home.scss";

const Home = () => {
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



    </div>
  );
};

export default Home;
