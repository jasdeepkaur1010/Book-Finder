import React from 'react';
import backgroundImage from './Books.jpg';
import Profile from './Profile';

const Home = () => {
  const buttonStyle = {
    position: 'absolute',
    top: '50%',  
    left: '50%',
    transform: 'translate(200%, 80%)', 
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  return (
    <div className='homepage'>
      <Profile />
      <img width={1500} height={690} src={backgroundImage} className="background-image" alt="backgroundImage" />
      <a href="/login" style={buttonStyle}>Get started here!</a>
    </div>
  );
};

export default Home;
