// CarPage.js
import React, { useEffect, useState } from 'react';
import { fetchCarById, updateCar, deleteCar } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const CarPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCar = async () => {
      const response = await fetchCarById(id);
      setCar(response.data);
    };
    loadCar();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    await updateCar(id, updatedData);
    alert('Car updated successfully');
    navigate('/cars'); // Go back to the dashboard
  };

  const handleDelete = async () => {
    await deleteCar(id);
    alert('Car deleted successfully');
    navigate('/cars'); // Go back to the dashboard
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div>
      <h2>{car.title}</h2>
      <p>{car.description}</p>
      <p>Tags: {car.tags.join(', ')}</p>
      {/* Update and Delete buttons */}
      <button onClick={() => handleUpdate({ title: car.title, description: car.description, tags: car.tags })}>
        Update
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CarPage;
