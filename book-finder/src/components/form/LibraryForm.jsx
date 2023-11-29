import React, { useState } from 'react';
import axios from 'axios';
const LibraryForm = () => {
  const [formData, setFormData] = useState({
    UserID: '',
    BookID: '',
    status: '',
    address: '',
    postal_code: '',
    city: '',
    province: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/libraries', formData);


      if (response === 201) {

        // Handle successful form submission 
        console.log('Form submitted successfully');
        setFormData({
          UserID: '',
          BookID: '',
          status: '',
          address: '',
          postal_code: '',
          city: '',
          province: '',
        });
      } else {
        // Handle errors if form submission fails
        console.error('Form submission failed', response);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Add Book Information to Library</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="UserID">UserID:</label><br />
        <input type="number" id="UserID" name="UserID" value={formData.UserID} onChange={handleChange} required /><br />
     
        <label htmlFor="BookID">BookID:</label><br />
        <input type="number" id="BookID" name="BookID" value={formData.BookID} onChange={handleChange} required /><br />

        <label htmlFor="status">Status:</label><br />
        <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} maxLength={50} required /><br />

        <label htmlFor="address">Address:</label><br />
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} maxLength={255} required /><br />

        <label htmlFor="postal_code">Postal Code:</label><br />
        <input type="text" id="postal_code" name="postal_code" value={formData.postal_code} onChange={handleChange} maxLength={20} required /><br />

        <label htmlFor="city">City:</label><br />
        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} maxLength={100} required /><br />

        <label htmlFor="province">Province:</label><br />
        <input type="text" id="province" name="province" value={formData.province} onChange={handleChange} maxLength={100} required /><br /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default LibraryForm;
