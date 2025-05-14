import express from 'express';
import User from '../models/User.js';
import { loginUser } from '../controllers/userController.js';
import { body, validationResult } from 'express-validator';

import bcrypt from 'bcryptjs';
const router = express.Router();
router.post('/login', loginUser);
// POST - Register new user
router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('phone').isMobilePhone().withMessage('Phone must be a valid mobile number'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('role').isIn(['owner', 'renter']).withMessage('Role must be either owner or renter')
    ],
    async (req, res) => {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => err.msg)
            });
        }

        const { name, email, phone, password, role } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already registered with this email' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, phone, password: hashedPassword, role });
            await newUser.save();

            res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error creating user' });
        }
    }
);

// DELETE - Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error while deleting user' });
    }
});


// GET - Get all users (for admin use)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

export default router;
