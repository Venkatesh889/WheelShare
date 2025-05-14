import express from 'express';
import { addCar } from '../controllers/carController.js';
import Car from '../models/Car.js';
import authenticateUser from '../middleware/authMiddleware.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// POST - Add a car listing
router.post(
    '/add',
    authenticateUser,
    [
        body('model').notEmpty().withMessage('Model is required'),
        body('year')
            .isInt({ min: 1990, max: new Date().getFullYear() + 1 })
            .withMessage('Year must be a valid number'),
        body('availability').isArray({ min: 1 }).withMessage('Availability must be an array'),
        body('availability.*.start').isISO8601().withMessage('Each start must be a valid date'),
        body('availability.*.end').isISO8601().withMessage('Each end must be a valid date'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('location').notEmpty().withMessage('Location is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => err.msg)
            });
        }

        const { model, year, availability, price, location } = req.body;
        const ownerId = req.user.id;

        try {
            const newCar = new Car({ ownerId, model, year, availability, price, location });
            await newCar.save();
            res.status(201).json(newCar);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error adding car' });
        }
    }
);

// GET - Search cars based on location and optional availability
router.get('/', async (req, res) => {
    const { location, startDate, endDate } = req.query;

    try {
        // Step 1: Location filter (case-insensitive)
        const locationFilter = location
            ? { location: { $regex: new RegExp(location, 'i') } }
            : {};

        // Step 2: Find cars that match location
        let cars = await Car.find(locationFilter);

        // Step 3: If dates provided, filter availability
        if (startDate && endDate) {
            cars = cars.filter(car =>
                car.availability.some(slot =>
                    new Date(startDate) >= new Date(slot.start) &&
                    new Date(endDate) <= new Date(slot.end)
                )
            );
        }

        res.status(200).json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ message: 'Error fetching cars' });
    }
});


export default router;
