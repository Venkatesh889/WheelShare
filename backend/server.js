import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import carRoutes from './routes/carRoutes.js';
import bookingRoutes from './routes/bookingsRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import paymentRoutes from './routes/paymentRoutes.js';
import dummyPaymentRoutes from './routes/dummyPaymentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import verifyRoutes from './routes/verifyRoutes.js';
//import {errorHandler} from './middleware/errorHandler.js';
import { parse } from 'url';

dotenv.config();

const app = express();

connectDB().then(() => {
    console.log('MongoDB Connected');
})

//Middleware
app.use(express.json());
app.use('/api/cars',authMiddleware, carRoutes);
app.use('/api/dummy-payments', dummyPaymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/verify', verifyRoutes);
app.use(cors());
//app.use(errorHandler);
app.get("/", (req, res) => {
    res.send("WheelShare API is running...");
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/bookings',authMiddleware, bookingRoutes);
app.use('/api/payments', paymentRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You have accessed a protected route!",
        user: req.user,  // this contains info like user id, email from the token
    });
});


// Main handler for serverless
export default async function handler(req, res) {
    const parsedUrl = parse(req.url, true);
    req.query = parsedUrl.query;
    req.path = parsedUrl.pathname;

    return app(req, res);
}
