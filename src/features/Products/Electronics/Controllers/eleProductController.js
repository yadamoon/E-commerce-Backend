const Product = require("../Model/eleProductModel");

const createElectronicsProduct = async (req, res) => {
    console.log("hello")
    try {
        const newProduct = await Product.create(req.body)
    } 
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
};
module.exports = { createElectronicsProduct };

