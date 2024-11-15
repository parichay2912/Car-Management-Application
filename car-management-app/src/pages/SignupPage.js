import React, { useState } from 'react';
import './SignupPage.module.css';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  // State to store input values
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  // State for displaying feedback
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Signup successful!');
        setTimeout(() => navigate('/login'), 1000);

      } else {
        setMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error: Unable to complete signup.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Signup</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupPage;
