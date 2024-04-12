const User =require("../Models/userModal");
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")


const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded.id) {
                    const user = await User.findById(decoded.id);
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        throw new Error("User not found");
                    }
                } else {
                    throw new Error("Invalid token");
                }
            } else {
                throw new Error("Token not provided");
            }
        } catch (error) {
            throw new Error("Not Authorized: Token expired or invalid");
        }
    } else {
        throw new Error("Authorization header not provided or incorrect format");
    }
});


const isAdmin = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.user;
        const adminUser = await User.findOne({ email: email });
        if (!adminUser || adminUser.role !== "admin") {
            throw new Error("You are not an admin");
        }
        next();
    } catch (error) {
        throw new Error(error.message);
    }
});

module.exports = {authMiddleware , isAdmin};