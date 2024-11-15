
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Car = require('../models/Car');

//add new car
router.post('/', auth, async (req, res) => {
    const { title, description, images, tags } = req.body;
    const car = new Car({ title, description, images, tags, userId: req.user.id });
    await car.save();
    res.status(201).json(car);
});

//get car of speific id
router.get('/', auth, async (req, res) => {
    const cars = await Car.find({ userId: req.user.id });
    res.json(cars);
});


//search a car
router.get('/search', auth, async (req, res) => {
    const { query } = req.query;
    const cars = await Car.find({
        userId: req.user.id,
        $or: [
            { title: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') },
            { tags: new RegExp(query, 'i') }
        ]
    });
    res.json(cars);
});

// @desc    Get details of a specific car by its ID
router.get('/:carId', auth, async (req, res) => {
    try {
        // Find the car by ID and ensure it belongs to the logged-in user
        const car = await Car.findOne({ _id: req.params.carId, userId: req.user.id });
        
        if (!car) {
            // If the car is not found, return a 404 error
            return res.status(404).json({ error: 'Car not found' });
        }
        
        // Respond with the car details
        res.json(car);
    } catch (error) {
        // Handle any errors during the retrieval process
        res.status(500).json({ error: 'Error retrieving car details' });
    }
});

// @route   PUT /api/cars/:carId
// @desc    Update a car’s title, description, tags, or images
// @access  Private
router.put('/:carId', auth, async (req, res) => {
    const { title, description, tags, images } = req.body; // Extract updated fields
    try {
        // Find the car by ID, ensure it belongs to the logged-in user, and update the details
        const car = await Car.findOneAndUpdate(
            { _id: req.params.carId, userId: req.user.id },
            { title, description, tags, images }, // New data to update
            { new: true, runValidators: true } // Return the updated document and run validation
        );
        
        if (!car) {
            // If the car is not found, return a 404 error
            return res.status(404).json({ error: 'Car not found or not authorized' });
        }
        
        // Respond with the updated car details
        res.json(car);
    } catch (error) {
        // Handle any errors during the update process
        res.status(500).json({ error: 'Error updating car' });
    }
});

// @route   DELETE /api/cars/:carId
// @desc    Delete a specific car by ID
// @access  Private
router.delete('/:carId', auth, async (req, res) => {
    try {
        // Find the car by ID and ensure it belongs to the logged-in user, then delete it
        const car = await Car.findOneAndDelete({ _id: req.params.carId, userId: req.user.id });
        
        if (!car) {
            // If the car is not found, return a 404 error
            return res.status(404).json({ error: 'Car not found or not authorized' });
        }
        
        // Respond with a success message after deletion
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        // Handle any errors during the delete process
        res.status(500).json({ error: 'Error deleting car' });
    }
});



module.exports = router;
