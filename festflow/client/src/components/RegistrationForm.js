import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = ({ eventName, eventId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    course: '',
    rollno: ''
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        `http://localhost:5000/api/events/${eventId}/register`,
        formData
      );
      

      setMessage(response.data.message || "Registration successful!");
      alert(`✅ Thanks for registering for ${eventName}, ${formData.name}!`);

     
      setFormData({
        name: '',
        email: '',
        university: '',
        course: '',
        rollno: ''
      });
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage(
        error.response?.data?.message || "❌ Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="registration-form-container">
      <h2 className="form-title">Register for {eventName}</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>University Name</label>
        <input type="text" name="university" value={formData.university} onChange={handleChange} required />

        <label>Course</label>
        <input type="text" name="course" value={formData.course} onChange={handleChange} required />

        <label>Roll Number</label>
        <input type="text" name="rollno" value={formData.rollno} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
      {message && (
        <p style={{ marginTop: '1rem', color: message.startsWith("❌") ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default RegistrationForm;

