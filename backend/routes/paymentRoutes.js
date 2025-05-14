import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // store in .env

router.post('/', async (req, res) => {
    const { amount, currency, token } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount, // in cents
            currency,
            source: token,
            description: 'WheelShare Car Booking Payment'
        });

        res.status(200).json({ success: true, charge });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ success: false, message: 'Payment failed', error: error.message });
    }
});

export default router;
