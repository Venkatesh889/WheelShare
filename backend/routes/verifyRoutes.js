import express from 'express';
import User from '../models/User.js';
import authenticateUser from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/pan', authenticateUser, async (req, res) => {
    const { panNumber, fullName } = req.body;
    const userId = req.user.id;

    // Dummy logic
    if (panNumber.length === 10 && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
        await User.findByIdAndUpdate(userId, { isVerified: true });
        return res.status(200).json({ success: true, message: 'PAN verified successfully' });
    }

    return res.status(400).json({ success: false, message: 'Invalid PAN format' });
});

export default router;
