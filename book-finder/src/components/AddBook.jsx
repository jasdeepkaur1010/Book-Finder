import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from './form/BookForm';

const AddBook = ({ books, setBooks }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("AddBook component mounted");

    return () => {
      console.log("AddBook component unmounted");
    };
  }, []);

  
}