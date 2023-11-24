import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from './form/BookForm';
import { useState } from 'react';
const AddBook = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("AddBook component mounted");

    return () => {
      console.log("AddBook component unmounted");
    };
  }, []);

  const handleOnSubmit = (book) => {
    setBooks([book, ...books]);
    navigate('/');
  };

  return(
    <div className="addForm">
      <BookForm handleSubmit={handleOnSubmit} />
    </div>
  );
};
export default AddBook;