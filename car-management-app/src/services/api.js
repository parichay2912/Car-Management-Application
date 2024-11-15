import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signupUser = (userData) => api.post('/users/signup', userData);
export const loginUser = (credentials) => api.post('/users/login', credentials);
export const fetchCars = () => api.get('/cars');
export const addCar = (carData) => api.post('/cars', carData);
export const fetchCarById = (id) => api.get(`/cars/${id}`);
export const updateCar = (id, carData) => api.put(`/cars/${id}`, carData);
export const deleteCar = (id) => api.delete(`/cars/${id}`);

export default api;
