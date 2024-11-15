import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import CarDashboard from './pages/CarDashBoard';
import CarDetails from './pages/CarDetails'; // import CarDetails component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />  
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/cars" element={<CarDashboard />} />
      
        
        <Route path="/cars/:id" element={<CarDetails />} /> {/* Route for car details */}
      </Routes>
    </Router>
  );
}

export default App;
