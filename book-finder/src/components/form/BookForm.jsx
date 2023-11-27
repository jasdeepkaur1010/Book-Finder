import React, { useState } from 'react';
import  axios  from 'axios';
const BookForm = ({ handleSubmit}) => {
  const [book, setBook] = useState({
    title: '',
    author_id: '',
    publication_date: '',
    genre: '',
    isbn: '',
    cover_image_url: '',
    summary: '',
    rating: ''
  });
  
  //Update state of book object//
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({...book, [name]: value })
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
   try {
    const response = await axios.post('http://localhost:8080/books', book)
    console.log('Book added successfully:', response.data);
    setBook({ title: '', 
    author_id: '', 
    publication_date: '',
    genre: '', 
    isbn: '',
    cover_image_url: '',
    summary: '', 
    rating: '' 
  });
    handleSubmit();
  } catch (error) {
    console.error('Error adding book:', error);
  }
};
  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label>
       coverImageUrl
        <input
        type="text"
        placeholder="URL"
        name="cover_image_url"
        value={book.cover_image_url}
        onChange={handleChange}
      />
      </label>
        <label>
          Title
          <input
       type="text"
       placeholder="Title"
       name="title"
       value={book.title}
       onChange={handleChange}
       />
       </label>
       <label>
        Author_ID
        <input
        type="text"
        placeholder="AuthorID"
        name="author_id"
        value={book.author_id}
        onChange={handleChange}
       />
         </label>
         <label>
          Publication Date
         <input
        type="text"
        placeholder="Publication Date"
        name="publication_date"
        value={book.publication_date}
        onChange={handleChange}
      />
      </label>
      <label>
        Genre
      <input
        type="text"
        placeholder="Genre"
        name="genre"
        value={book.genre}
        onChange={handleChange}
      />
      </label>
      <label>
       ISBN
       <input
        type="text"
        placeholder="ISBN"
        name="isbn"
        value={book.isbn}
        onChange={handleChange}
      />
       </label>
       <label>
        Summary
        <input
        type="text"
        placeholder="Summary"
        name="summary"
        value={book.summary}
        onChange={handleChange}
      />
      </label>
      <label>
        Rating
        <input
        type="text"
        placeholder="Rating"
        name="rating"
        value={book.rating}
        onChange={handleChange}
      />
      </label>

       <button type="submit">Add Book</button>
       </div>
    </form>
  );
  };
export default BookForm;