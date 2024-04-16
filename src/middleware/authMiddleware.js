const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded.id) {
                    const user = await User.findById(decoded.id);
                    if (user) {
                        req.user = user;
                        next();
                        return; // Added to prevent multiple response sends
                    } else {
                        res.status(404).json({ message: "User not found" });
                    }
                } else {
                    res.status(401).json({ message: "Invalid token" });
                }
            } else {
                res.status(401).json({ message: "Token not provided" });
            }
        } else {
            res.status(401).json({ message: "Authorization header not provided or incorrect format" });
        }
    } catch (error) {
        res.status(401).json({ message: "Not Authorized: Token expired or invalid", error: error.message });
    }
});




const isAdmin = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.user;
        const adminUser = await User.findOne({ email: email });
        if (!adminUser || adminUser.role !== "admin") {
            res.status(403).json({ message: "You are not an admin" });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = { authMiddleware, isAdmin };
