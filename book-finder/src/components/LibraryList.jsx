import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookStatus from './BookStatus';
import "../styles2/LibraryList.scss";
function LibraryList() {
  const [libraries, setLibraries] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedLibraryId, setSelectedLibraryId] = useState(null);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLibraries, setFilteredLibraries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/libraries')
      .then(response => {
        console.log(response.data);
        setLibraries(response.data.libraries);
        setFilteredLibraries(response.data.libraries); // Initialize filteredLibraries with all libraries
      })
      .catch(error => {
        console.error('Error fetching libraries:', error);
      });
  }, []);

  const fetchBooksByLibraryId = async (libraryId) => {
    try {
      const response = await axios.get(`http://localhost:8080/libraries/${libraryId}/books`)
      setBooks(response.data.books);
    } catch (error) {
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

  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = libraries.filter(library =>
      library.name.toLowerCase().includes(searchTermLowerCase) ||
      library.address.toLowerCase().includes(searchTermLowerCase) ||
      library.city.toLowerCase().includes(searchTermLowerCase) ||
      library.province.toLowerCase().includes(searchTermLowerCase) ||
      library.postal_code.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredLibraries(filtered);
  };

  return (
    <div className="library-container">
      <h1>Library List</h1>
      {/* <div>
        <input
          type="text"
          placeholder="Search libraries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div> */}
        <div className="library-list">

        {libraries.map(library => (
           <div className="library-item" key={library.id}>
            <button onClick={() => handleLibraryClick(library.id)}>
              <img src={library.cover_photo} alt={library.name} style={{ width: '300px', height: '300px' }}/>
            </button>
            <div>
              <h3>{library.name}</h3>
              <p>
                {library.city}, {library.province}{' '}
              </p>
              </div>
     

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
        ))}
      </div>
    </div>
  );
}
export default LibraryList;
