import './App.scss';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Login from './components/LoginPage';
import About from './components/About';
import Contact from './components/Contact';
// import Register from './components/Register';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import BookForm from './components/form/BookForm';
import AddBook from './components/AddBook';
import LibraryForm from './components/form/LibraryForm';
import BookCard from './components/BookCard';
import SingleBookPage from './components/SingleBookPage';
import axios from 'axios';
import { useEffect, useState } from 'react'; 
import LibraryList from './components/LibraryList';

function App() {
  const dummyBooks = [
    { id: 1, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 2, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 3, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 4, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 5, title: 'Book 1', author: 'Author 1', imageUrl: 'https://m.media-amazon.com/images/I/81Fyh2mrw4L._SY466_.jpg' },
    { id: 6, title: 'Book 2', author: 'Author 2', imageUrl: 'https://m.media-amazon.com/images/I/41SKsBaGXRL._SY445_SX342_.jpg' },
    { id: 7, title: 'Book 2', author: 'Author 2', imageUrl: 'https://m.media-amazon.com/images/I/41SKsBaGXRL._SY445_SX342_.jpg' },
    { id: 8, title: 'Book 2', author: 'Author 2', imageUrl: 'https://m.media-amazon.com/images/I/41SKsBaGXRL._SY445_SX342_.jpg' },
  ];
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/books');
        console.log(response.data, 'ress');
        setBooks(response.data.users); // Assuming the response data is an array of books
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    console.log(books, 'books');
    fetchData();
  }, []); 


  return (
    <Router>
       <nav className="top-nav">
          <Link to="/">Home </Link>
          {/* <Link to="/login">Login </Link> */}
          <Link to="/about">About </Link>
          <Link to="/contact">ContactUs</Link>
          <Link to="/loginbutton">LoginButton </Link>
          <Link to="/logoutbutton">Logout </Link>
          {/* <Link to="/BookForm">AddBook</Link> */}
          <Link to="/LibraryForm">LibraryForm</Link>
          <Link to="/LibraryList">LibraryList</Link>
        </nav>
      <div>
       

        <Routes>
          <Route path="/" element={<Home dummyBooks={books} />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/loginbutton" element={<LoginButton />} />
          <Route path="/logoutbutton" element={<LogoutButton />} />
          <Route path="/BookForm" element={<AddBook />} />
          <Route path="/LibraryForm" element={<LibraryForm />} />
          <Route path="/book/:id" element={<SingleBookPage dummyBooks={books} />} />
          <Route path="/LibraryList" element={<LibraryList/>} />
        </Routes>
      </div>
      {/* <Home /> */}
    </Router>
    // <div className="App">
    //   <Home />
    // </div>
  );
}


export default App;

// <div className="App">
// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header>
// </div>