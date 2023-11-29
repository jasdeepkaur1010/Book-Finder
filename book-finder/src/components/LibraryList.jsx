import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LibraryList() {
  const [libraries, setLibraries] = useState([]);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/libraries')
    .then(response => {
      console.log(response.data);
      setLibraries(response.data.libraries);
    })
    .catch(error => {
      console.error('Error fetching libraries:', error);
    });
  }, []);
   const fetchBooksByLibrary = async (libraryId) => {
    try {
      const response = await axios.get(`http://localhost:8080/libraries/${libraryId}`)
      setBooks(response.data.libraries.books);
    }
    catch(error) {
      console.error('Error fetching books for a library:', error);
      setBooks([]);
    }
  };
  const handleLibraryClick = (libraryId) => {
    fetchBooksByLibrary(libraryId);
  };

  return (
    <div>
      <h1>Library List</h1>
      <ul>
        {libraries.map(library => (
          <li key={library.id}>
            <div>
            <a href="#" onClick={() => handleLibraryClick(library.id)}>
              <img src={library.cover_photo} alt={library.name} />
            </a>
            <div>
              <h3>Name: {library.name}</h3>
              <p>Status: {library.status}</p>
              <p>
                Address: {library.address}, {library.city}, {library.province}{' '}
                {library.postal_code}
              </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
   }

export default LibraryList;