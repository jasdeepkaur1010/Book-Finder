import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user, 'user');

  useEffect(() => {
    console.log(user, 'usereffect')
    if(user) {
    const postData = async () => {
      try {
        const postDataa = {
          username: user.nickname,
          email: user.email,
          sub_id: user.sub,
          isadministrator: false
        };
        console.log(postDataa, 'pd')
        const response = await axios.post('http://localhost:8080/users', postDataa);

        console.log('Response', response.data);
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