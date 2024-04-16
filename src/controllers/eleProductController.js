const Product = require("../models/eleProductModel");

const createElectronicsProduct = async (req, res) => {
    console.log("hello")
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct)

    } 
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
};
module.exports = { createElectronicsProduct };

