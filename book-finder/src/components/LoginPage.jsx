// import React from 'react';

// const Login = () => {
//   return (
//     <div>
//       <h2>Login Here!</h2>
//       <p>This is the Login page content.</p>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>Not a user? <Link to="/register">Register Here</Link>
    </p>
    </div>
  );
};

export default Login;
