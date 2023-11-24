import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user, 'user');

  const [subId, setSubId] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkuser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${subId}`);
        console.log('Sub_id exists', response.data);
        setError('User with this sub_id already exists. Please choose a different one.');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('Sub_id does not exist.');
          setError(null); // Clear any previous errors
        } else {
          // Handle other error cases
          console.error('Error checking sub_id existence:', error.message);
        }
      }
    }
    if(user) {
    const postData = async () => {
      try {
        await checkuser();
        if (!error) {
        const postDataa = {
          username: user.nickname,
          email: user.email,
          sub_id: user.sub,
          isadministrator: false
        };
        console.log(postDataa, 'pd')
        const response = await axios.post('http://localhost:8080/users', postDataa);

        console.log('Response', response.data);
      }
      } catch (error) {
        console.error('Error posting data: ', error);
      }
    };
    postData();
  }
  }, [user, isAuthenticated]);


  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;