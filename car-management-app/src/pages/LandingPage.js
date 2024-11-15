// LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to the Car Management App</h1>
      <p>Please log in or sign up to continue.</p>
      <button onClick={() => navigate('/login')} style={{ margin: '10px', padding: '10px 20px' }}>
        Login
      </button>
      <button onClick={() => navigate('/signup')} style={{ margin: '10px', padding: '10px 20px' }}>
        Sign Up
      </button>
    </div>
  );
};

export default LandingPage;
