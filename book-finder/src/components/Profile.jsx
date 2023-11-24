import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);
  const [subId, setSubId] = useState(null);

  useEffect(() => {
    const postData = async () => {
      try {
        const postData = {
          sub_id: user.sub,
        };
        const response = await axios.post('http://localhost:8080/users', postData);

        console.log('Response', response.data);
        setSubId(user.sub);
      } catch (error) {
        console.error('Error posting data: ', error);
      }
    };
    postData();
  }, []);
  // const [userData, setUserData] = useState(null);
  // const [updatedData, setUpdatedData] = useState('');
  // const [isUpdating, setIsUpdating] = useState(false);
  // console.log(user);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if(isAuthenticated) {
  //       try {
  //         const accessToken = await isLoading();

  //         const api = 'http://localhost:8080/users';
  //         const response = await axios.get(api, {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         });
  //         setUserData(response.data);
  //       } catch (error) {
  //         console.error('Error fetching user data: ', error);
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [isLoading, isAuthenticated]);

  // const handleUpdateData = async () => {
  //   try {
  //     setIsUpdating(true);

  //     const accessToken = await isLoading();

  //     // Replace 'your-api-endpoint' with the actual backend API endpoint for updating user data
  //     const updateApiUrl = 'https://your-api-endpoint/update-user-profile';
  //     const response = await axios.post(
  //       updateApiUrl,
  //       { updatedData },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     console.log('Update response:', response.data);

  //     // Optionally, you can refetch user data after a successful update
  //     // fetchData();
  //   } catch (error) {
  //     console.error('Error updating user data:', error);
  //   } finally {
  //     setIsUpdating(false);
  //   }
  // };

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