import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export default function authMiddleware(req, res, next) {
    const bearerToken = req.header("Authorization");
    if (!bearerToken) return res.status(401).json({ message: "Access denied" });


    try {
        const token = bearerToken.split(" ")[1]; //  Fix: extract token only
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
}
