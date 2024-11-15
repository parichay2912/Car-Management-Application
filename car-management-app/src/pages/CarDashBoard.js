import React, { useState, useEffect } from 'react';
import { fetchCars, addCar, deleteCar, updateCar } from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './CarDashboard.module.css';

const CarDashboard = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCar, setNewCar] = useState({ title: '', description: '', tags: '', images: [] });
  const [validationError, setValidationError] = useState(''); // Track validation errors
  const [user, setUser] = useState({ email: 'user@example.com' }); // Replace with actual email or context
  const navigate = useNavigate();

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const response = await fetchCars();
      setCars(response.data);
    } catch (error) {
      console.error('Failed to fetch cars:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleAddCar = async () => {
    // Validate the form fields
    if (!newCar.title || !newCar.description || !newCar.tags || !newCar.images.length) {
      setValidationError('All fields are mandatory! Please fill in all fields.');
      return; // Prevent submission if validation fails
    }

    try {
      const tagsArray = newCar.tags.split(',').map(tag => tag.trim());
      const carData = { ...newCar, tags: tagsArray };
      await addCar(carData);
      loadCars(); // Reload the cars after adding
      setNewCar({ title: '', description: '', tags: '', images: [] }); // Clear form
      setValidationError(''); // Reset validation error message
    } catch (error) {
      console.error('Failed to add car:', error);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await deleteCar(id);
      loadCars(); // Reload the cars after deleting
    } catch (error) {
      console.error('Failed to delete car:', error);
    }
  };

  const handleUpdateCar = async (id, updatedData) => {
    try {
      await updateCar(id, updatedData);
      loadCars(); // Reload the cars after updating
    } catch (error) {
      console.error('Failed to update car:', error);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here (e.g., clearing user data, removing tokens, etc.)
    // Redirect to login page after logout
    navigate('/login');
  };

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(searchTerm) ||
      car.description.toLowerCase().includes(searchTerm) ||
      car.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );

  return (
    <div className={styles.carDashboard}>
      <div className={styles.header}>
        <h1>Car Dashboard</h1>
        <div className={styles.welcomeContainer}>
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Add Car Form */}
      <div className={styles.addCarForm}>
        <h3>Add New Car</h3>
        <input
          type="text"
          placeholder="Title"
          value={newCar.title}
          onChange={(e) => setNewCar({ ...newCar, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newCar.description}
          onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={newCar.tags}
          onChange={(e) => setNewCar({ ...newCar, tags: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URLs (comma-separated)"
          value={newCar.images.join(',')}
          onChange={(e) => setNewCar({ ...newCar, images: e.target.value.split(',') })}
          required
        />
        
        {/* Display Validation Error Message */}
        {validationError && <p style={{ color: 'red' }}>{validationError}</p>}

        <button onClick={handleAddCar}>Add Car</button>
      </div>

      {/* Search Cars */}
      <div>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by title, description, or tags"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Car List */}
      <div className={styles.carList}>
        {filteredCars.map((car) => (
          <div key={car._id} className={styles.carCard}>
            <h4>{car.title}</h4>
            <p>{car.description}</p>
            <p>Tags: {car.tags.join(', ')}</p>
            <button onClick={() => navigate(`/cars/${car._id}`)}>View Details</button>
            <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
            <button
              onClick={() => {
                const newTitle = prompt('New Title', car.title);
                const newDescription = prompt('New Description', car.description);
                const newTags = prompt('New Tags (comma-separated)', car.tags.join(','));
                const newImages = prompt('New Images (comma-separated)', car.images.join(','));

                // Check if user canceled any of the prompts
                if (newTitle === null || newDescription === null || newTags === null || newImages === null) {
                  alert('Please provide all the fields');
                  return;
                }

                // If the user didn't cancel, proceed with updating the car
                handleUpdateCar(car._id, {
                  ...car,
                  title: newTitle,
                  description: newDescription,
                  tags: newTags.split(',').map(tag => tag.trim()), // Clean up tags
                  images: newImages.split(',').map(image => image.trim()) // Clean up image URLs
                });
              }}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDashboard;
