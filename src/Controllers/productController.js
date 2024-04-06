const Product = require("../Models/productModal");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;

        // Check if required fields are provided
        if (!name || !description || !price || !category || !image) {
            return res.status(400).json({ error: "Please provide all required fields: name, description, price, category, and image" });
        }

        // Create a new product document
        const newProduct = await Product.create({ name, description, price, category, image });
        res.json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
};

module.exports = { createProduct };
