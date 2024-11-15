const express = require('express');
const app = express();
const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  })
);

app.use(express.json());

// Route setup
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');

app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

module.exports = app;
