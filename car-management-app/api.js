import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add JWT token to headers if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const signupUser = (userData) => api.post('/auth/signup', userData);
export const fetchCars = () => api.get('/cars');
export const addCar = (carData) => api.post('/cars', carData);
export const fetchCarById = (id) => api.get(`/cars/${id}`);
export const updateCar = (id, carData) => api.put(`/cars/${id}`, carData);
export const deleteCar = (id) => api.delete(`/cars/${id}`);

export default api;
