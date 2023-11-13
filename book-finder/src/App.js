import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/LoginPage';
import About from './components/About';
import Contact from './components/Contact';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home </Link>
          <Link to="/login">Login </Link>
          <Link to="/about">About </Link>
          <Link to="/contact">ContactUs</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
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