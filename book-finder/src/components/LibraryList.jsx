import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookStatus from './BookStatus';
import  './../styles/LibraryList.scss';
function LibraryList() {
  const [libraries, setLibraries] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedLibraryId, setSelectedLibraryId] = useState(null);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
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
   const fetchBooksByLibraryId = async (libraryId) => {
    try {
      const response = await axios.get(`http://localhost:8080/libraries/${libraryId}/books`)
      setBooks(response.data.books);
    }
    catch(error) {
      console.error('Error fetching books for a library:', error);
      setBooks([]);
    }
  };
  const handleLibraryClick = (libraryId) => {
    setSelectedLibraryId(libraryId);
    fetchBooksByLibraryId(libraryId);
    setSelectedLibrary(libraryId);
  };

  const closeModal = () => {
    setSelectedLibrary(null);
    setBooks([]);
  };


  return (
    <div>
      <h1>Library List</h1>
      <ul>
        {libraries.map(library => (
          <ul key={library.id}>
            <div>
            <button onClick={() => handleLibraryClick(library.id)}>
              <img src={library.cover_photo} alt={library.name} style={{ width: '400px', height: '400px' }}/>
            </button>
            <div>
              <h3>{library.name}</h3>
              <p>
                {library.city}, {library.province}{' '}
              </p>
              </div>
            </div>
          </ul>
        ))}
      </ul>

      {selectedLibraryId && selectedLibrary && books && books.length > 0 && (
             <div className="modal">
             <div className="modal-content">
               <span className="close" onClick={closeModal}>&times;</span>
          <h2>Book List</h2>
          <div>
            {books.map(book => (
              <ul key={book.id}>
                <div>
                <img src={book.cover_image_url} alt={book.name} style={{ width: '300px', height: '300px' }}/>
                  <h3>{book.title}</h3>
                  {/* <p>author_id: {book.author_id}</p> */}
                  <p>Genre: {book.genre}</p>
                  <p>Summary: {book.summary}</p>
              <p>Status: {book.status}</p>
                  {/* <p>Publication_date: {book.publication_date}</p> */}
                  <p></p>
                  <BookStatus book={book} libraryId={selectedLibraryId} />
                </div>
              </ul>
            ))}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default LibraryList;