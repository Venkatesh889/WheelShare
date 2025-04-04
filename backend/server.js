import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';


dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("WheelShare API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authenticateUser = require("./middleware/authMiddleware");

app.get("/api/protected", authenticateUser, (req, res) => {
    res.json({ message: "You have accessed a protected route!", user: req.user });
});
