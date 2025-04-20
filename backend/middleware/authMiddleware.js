import jwt from "jsonwebtoken";


export default function authenticateUser(req, res, next)
{
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
}

