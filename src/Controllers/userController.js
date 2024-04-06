const User = require("../Models/userModal");

const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        // Check if required fields are provided
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ error: "Please provide all required fields: first name, last name, email, and password" });
        }

        // Create a new user document
        const newUser = await User.create({ firstname, lastname, email, password });
        res.json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
};

module.exports = { createUser };
