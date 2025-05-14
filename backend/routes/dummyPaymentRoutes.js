import express from 'express';
const router = express.Router();

// Dummy payment route
router.post('/', (req, res) => {
    const { amount, currency, userId } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid amount'
        });
    }

    // Simulate success
    res.status(200).json({
        success: true,
        message: 'Dummy payment successful',
        data: {
            userId,
            amount,
            currency,
            transactionId: 'DUMMY_TXN_' + Date.now()
        }
    });
});

export default router;
