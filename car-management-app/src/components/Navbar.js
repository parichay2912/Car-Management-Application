import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/cars">My Cars</Link>
    <Link to="/create">Add Car</Link>
    <button onClick={() => localStorage.removeItem('token')}>Logout</button>
  </nav>
);

export default Navbar;
