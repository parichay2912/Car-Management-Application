import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCarById } from '../services/api';

const CarDetails = () => {
  const { id } = useParams(); // Extract the car ID from the URL
  const [car, setCar] = useState(null);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const response = await fetchCarById(id);
        setCar(response.data);
      } catch (error) {
        console.error('Failed to fetch car details:', error);
      }
    };
    loadCar();
  }, [id]);

  if (!car) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{car.title}</h2>
      <p>{car.description}</p>
      <p>Tags: {car.tags.join(', ')}</p>

      {/* Display images */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {car.images.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Car Image ${index + 1}`} 
            style={{ width: '200px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          />
        ))}
      </div>

      {/* Display other car details as needed */}
    </div>
  );
};

export default CarDetails;
