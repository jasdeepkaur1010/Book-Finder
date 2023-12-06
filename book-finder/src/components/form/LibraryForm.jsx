import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LibraryForm = () => {
  const [formData, setFormData] = useState({
    UserID: '',
    name: '',
    cover_photo: '',
    status: '',
    address: '',
    postal_code: '',
    city: '',
    province: '',
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/libraries', formData);


      if (response.status === 201) {

        // Handle successful form submission 
        console.log('Form submitted successfully');
        setFormData({
          UserID: '',
          name: '',
          cover_photo: '',
          status: '',
          address: '',
          postal_code: '',
          city: '',
          province: '',
        });
        navigate('/LibraryList');
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
    <form onSubmit={handleSubmit} className="library-form">
      <h2>Add a Library</h2>
      <div className="form-group">
        <label htmlFor="UserID">UserID</label>
        <input
          type="text"
          placeholder="UserID"
          name="UserID"
          value={formData.UserID}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cover_photo">Cover photo</label>
        <input
          type="text"
          placeholder="URL"
          name="cover_photo"
          value={formData.cover_photo}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="postal_code">Postal Code</label>
        <input
          type="text"
          placeholder="Postal Code"
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          placeholder="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="province">Province</label>
        <input
          type="text"
          placeholder="Province"
          name="province"
          value={formData.province}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default LibraryForm;
