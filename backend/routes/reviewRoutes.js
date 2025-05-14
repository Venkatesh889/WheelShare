import express from 'express';
import Review from '../models/Review.js';
import authenticateUser from '../middleware/authMiddleware.js';

const router = express.Router();

// POST - Add a review
router.post('/', authenticateUser, async (req, res) => {
    const { carId, rating, comment } = req.body;
    const renterId = req.user.id;

    try {
        const review = new Review({ renterId, carId, rating, comment });
        await review.save();
        res.status(201).json({ message: 'Review added', review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding review' });
    }
});

// GET - Get all reviews for a specific car
router.get('/:carId', async (req, res) => {
    try {
        const reviews = await Review.find({ carId: req.params.carId }).populate('renterId', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews' });
    }
});

export default router;
