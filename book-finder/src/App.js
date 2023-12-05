import './App.scss';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import AddBook from './components/AddBook';
import LibraryForm from './components/form/LibraryForm';
import SingleBookPage from './components/SingleBookPage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LibraryList from './components/LibraryList';

function App() {
  const [books, setBooks] = useState([]);

  const fetchTopRatedBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books/top-rated');

      if (response.status === 200) {
        console.log(response.data, 'topratedbooks');
        setBooks(response.data.topRatedBooks);
      } else {
        throw new Error('Failed to fetch top-rated books');
      }
    } catch (error) {
      console.error('Error fetching top-rated books:', error);
    }
  };

  useEffect(() => {
    // Fetch top-rated books on component mount
    fetchTopRatedBooks();
  }, []);
  console.log(books, 'books');
  return (
    <Router>
      <nav className="top-nav">
        <Link to="/">Home </Link>
        <Link to="/about">About </Link>
        <Link to="/contact">ContactUs</Link>
        <Link to="/LibraryList">LibraryList</Link>

      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home dummyBooks={books} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginButton />} />
          <Route path="/logoutbutton" element={<LogoutButton />} />
          <Route path="/BookForm" element={<AddBook />} />
          <Route path="/LibraryForm" element={<LibraryForm />} />
          <Route path="/books/:id" element={<SingleBookPage dummyBooks={books} />} />
          <Route path="/LibraryList" element={<LibraryList />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
