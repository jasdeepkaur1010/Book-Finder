import './App.css';
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
import LibraryList from './components/LibraryList';
function App() {
  return (
    <Router>
       <nav>
          <Link to="/">Home </Link>
          {/* <Link to="/login">Login </Link> */}
          <Link to="/about">About </Link>
          <Link to="/contact">ContactUs</Link>
          <Link to="/loginbutton">LoginButton </Link>
          <Link to="/logoutbutton">Logout </Link>
          <Link to="/BookForm">BookForm</Link>
          <Link to="/LibraryForm">LibraryForm</Link>
          <Link to="/LibraryList">LibraryList</Link>
        </nav>
      <div>
       

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/loginbutton" element={<LoginButton />} />
          <Route path="/logoutbutton" element={<LogoutButton />} />
          <Route path="/BookForm" element={<AddBook />} />
          <Route path="/LibraryForm" element={<LibraryForm />} />
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