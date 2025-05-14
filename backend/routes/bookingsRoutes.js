import express from 'express';
import Booking from '../models/Booking.js';
import Car from '../models/Car.js';
import authenticateUser from '../middleware/authMiddleware.js';
const router = express.Router();


// POST - Create a new booking with availability check
router.post('/', authenticateUser, async (req, res) => {
    const { carId, startDate, endDate } = req.body;
    const renterId = req.user.id; //  get user from token

    try {
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Check if car is available for the selected range
        const isAvailable = car.availability.some(slot =>
            new Date(startDate) >= new Date(slot.start) &&
            new Date(endDate) <= new Date(slot.end)
        );

        if (!isAvailable) {
            return res.status(400).json({ message: 'Car is not available for the selected dates' });
        }

        const newBooking = new Booking({ renterId, carId, startDate, endDate });
        await newBooking.save();

        res.status(201).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
});

// GET - Fetch all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('renterId carId');
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

// Cancel a booking by ID
router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Optional: Check if the logged-in user is the one who created the booking
        if (booking.renterId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to cancel this booking' });
        }

        await booking.deleteOne();

        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while cancelling booking' });
    }
});

export default router;
