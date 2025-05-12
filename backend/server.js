import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import carRoutes from './routes/carRoutes.js';
import bookingRoutes from './routes/bookingsRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';


dotenv.config();

const app = express();

connectDB().then(() => {
    console.log('MongoDB Connected');
})

//Middleware
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("WheelShare API is running...");
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You have accessed a protected route!",
        user: req.user,  // this contains info like user id, email from the token
    });
});
