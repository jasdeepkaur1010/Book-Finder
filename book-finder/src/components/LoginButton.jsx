// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// const LoginButton = () => {
//   const { loginWithRedirect } = useAuth0();

//   return <button onClick={() => loginWithRedirect()}>Log In</button>;
// };

// export default LoginButton;

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import "../styles/Login.scss";
import "../Styles/Login.scss";

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogin = () => {
    // For demonstration purposes, using sessionStorage to manage user login status
    loginWithRedirect();
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    // For demonstration purposes, using sessionStorage to manage user login status
    sessionStorage.removeItem('isLoggedIn');
    window.sessionStorage.removeItem('userId')
    logout();
  };

  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  return (
    <div className="login-container">
      <div className="button-container">
        {isLoggedIn ? (
          <button className="button logout-button" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <button className="button login-button" onClick={handleLogin}>
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginButton;
