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
  const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   // Fetch data from the backend API
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/books');
  //       console.log(response.data, 'ress');
  //       setBooks(response.data.users); // Assuming the response data is an array of books
  //     } catch (error) {
  //       console.error('Error fetching data:', error.message);
  //     }
  //   };
  //   console.log(books, 'books');
  //   fetchData();
  // }, []); 

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
          {/* <Link to="/login">Login </Link> */}
          <Link to="/about">About </Link>
          <Link to="/contact">ContactUs</Link>
          <Link to="/loginbutton">LoginButton </Link>
          <Link to="/logoutbutton">Logout </Link>
          {/* <Link to="/BookForm">AddBook</Link> */}
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
          <Route path="/books/:id" element={<SingleBookPage dummyBooks={books} />} />
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