// src/components/RoleSelection.jsx
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const RoleSelection = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [selectedRole, setSelectedRole] = useState('user');

  const handleRoleSelection = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      // Send a request to your backend to update the user's role
      // Example: await fetch('/api/update-role', { method: 'POST', ... });
    } catch (error) {
      console.error('Error updating role:', error.message);
    }
  };

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Select your role:</p>
      <label>
        <input
          type="radio"
          value="user"
          checked={selectedRole === 'user'}
          onChange={() => setSelectedRole('user')}
        />
        User
      </label>
      <label>
        <input
          type="radio"
          value="administrator"
          checked={selectedRole === 'administrator'}
          onChange={() => setSelectedRole('administrator')}
        />
        Administrator
      </label>
      <button onClick={handleRoleSelection}>Submit</button>
    </div>
  );
};

export default RoleSelection;
