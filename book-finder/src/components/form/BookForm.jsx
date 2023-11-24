import React, { useState } from 'react';

const BookForm = ({ handleSubmit }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publicationDate: '',
    genre: '',
    isbn: '',
    coverImageUrl: '',
    summary: '',
    rating: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({...book, [name]: value })
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      ...book
    };
    handleSubmit(newBook);
    setBook({
      title: '',
      author: '',
      publicationDate: '',
      genre: '',
      isbn: '',
      coverImageUrl: '',
      summary: '',
      rating: ''
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <input
       type="text"
       placeholder="Title"
       name="title"
       value={book.title}
       onChange={handleChange}
       />
       <input
        type="text"
        placeholder="Author name"
        name="author"
        value={book.author}
        onChange={handleChange}
       />
       <button type="submit">Add Book</button>
    </form>
  );
  };
export default BookForm;