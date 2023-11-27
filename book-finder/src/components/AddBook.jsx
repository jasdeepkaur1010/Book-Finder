import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from './form/BookForm';
import { useState } from 'react';
import axios from 'axios'

const AddBook = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("AddBook component mounted");
   fetchBooks();
    return () => {
      console.log("AddBook component unmounted");
    };
  }, []);

const fetchBooks = async () => {
  try {
    const response = await axios.get('http://localhost:8080/books');
    setBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleOnSubmit = async (book) => {
    try {
      await axios.post('http://localhost:8080/books', book);
      await fetchBooks();
      navigate('/');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  return(
    <div className="addForm">
      <BookForm handleSubmit={handleOnSubmit} />
    </div>
  );
};
export default AddBook;