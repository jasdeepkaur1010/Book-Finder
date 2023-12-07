import React, { useState } from 'react';
import  axios  from 'axios';
import  '../../Styles/BookForm.scss';
// import { useHistory } from 'react-router-dom';

const BookForm = ({ handleSubmit}) => {
  const [book, setBook] = useState({
    title: '',
    author_id: '',
    publication_date: '',
    genre: '',
    isbn: '',
    cover_image_url: '',
    summary: '',
    status: '',
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
  //   const response = await axios.post('http://localhost:8080/books', book)
  //   console.log('Book added successfully:', response.data);
  //   setBook({ title: '', 
  //   author_id: '', 
  //   publication_date: '',
  //   genre: '', 
  //   isbn: '',
  //   cover_image_url: '',
  //   summary: '', 
  //   status: '',
  //   rating: '' 
  // });
    handleSubmit(book);
   
  } catch (error) {
    console.error('Error adding book:', error);
  }
};
  return (
    <form onSubmit={onSubmit} className="book-form">
    <h2>Add a Book</h2>
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}
      <div className="form-group">
      <label htmlFor="cover_image_url">Cover Image URL</label>
        <input
        type="text"
        placeholder="URL"
        name="cover_image_url"
        value={book.cover_image_url}
        onChange={handleChange}
      />
      </div>
       <div className="form-group">
       <label htmlFor="title">Title</label>
          <input
       type="text"
       placeholder="Title"
       name="title"
       value={book.title}
       onChange={handleChange}
       />
       </div>
       <div className="form-group">
    <label htmlFor="author_id">Author ID</label>
        <input
        type="text"
        placeholder="AuthorID"
        name="author_id"
        value={book.author_id}
        onChange={handleChange}
       />
       </div>
          <div className="form-group">
          <label htmlFor="publication_id">Publication ID</label>
         <input
        type="text"
        placeholder="DD-MM-YYYY"
        name="publication_date"
        value={book.publication_date}
        onChange={handleChange}
      />
      </div>
       <div className="form-group">
       <label htmlFor="genre">Genre</label>
      <input
        type="text"
        placeholder="Genre"
        name="genre"
        value={book.genre}
        onChange={handleChange}
      />
      </div>
       <div className="form-group">
       <label htmlFor="isbn">ISBN</label>
       <input
        type="text"
        placeholder="ISBN"
        name="isbn"
        value={book.isbn}
        onChange={handleChange}
      />
      </div>
       <div className="form-group">
    <label htmlFor="summary">Summary</label>
        <input
        type="text"
        placeholder="Summary"
        name="summary"
        value={book.summary}
        onChange={handleChange}
      />
      </div>
      <div className="form-group">
      <label htmlFor="status">Status</label>
        <input
        type="text"
        placeholder="Status"
        name="status"
        value={book.status}
        onChange={handleChange}
      />
      </div>
       <div className="form-group">
      <label htmlFor="rating">Rating</label>
        <input
        type="text"
        placeholder="Rating"
        name="rating"
        value={book.rating}
        onChange={handleChange}
      />
      </div>
      <div className="form-group">
       <button type="submit">Submit</button>
       </div>
    </form>
  );
  };
export default BookForm;