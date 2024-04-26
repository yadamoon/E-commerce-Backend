const bcrypt = require('bcrypt')
const ProductService = require('../services/ProductServices'); // Corrected file name
const csvParser = require('csv-parser')
class ProductController {
    constructor() {
        this.productService = new ProductService()
    }
    async createProduct(req, res) {
        // Destructure necessary fields from the request body
        const { productName,
            brand, modelNumber, category, description, releaseDate, warrantyInformation, dimensions, display, processor, memory, battery, connectivity, ports, camera, images, sensors, biometricFeatures, waterResistance, wirelessCharging, specialFeatures, packageContents, userRatings, userReviews, compatibleAccessories, regulatoryCertifications, ...rest } = req.body;

        try {
            // Create the product without hashing the password
            const product = await this.productService.create({
                productName,
                brand,
                modelNumber,
                category,
                description,
                releaseDate,
                warrantyInformation,
                dimensions,
                display,
                processor,
                memory,
                battery,
                connectivity,
                ports,
                camera,
                images,
                sensors,
                biometricFeatures,
                waterResistance,
                wirelessCharging,
                specialFeatures,
                packageContents,
                userRatings,
                userReviews,
                compatibleAccessories,
                regulatoryCertifications,
                ...rest,
            });

            // Send a response with the created product
            res.status(201).json({ product });
        } catch (error) {
            // Log the error for debugging
            console.error("Error creating product:", error);

            // Send an error response
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getProductById(req, res) {
        const product = await this.productService.findById(req.params._id)
        res.json(product)
    }

    async getAllProduct(req, res) {
        const product = await this.productService.findAll()
        res.json(product)
    }

    async updateProductById(req, res) {
        // this.productService.updateById()
        
        const product = await this.productService.updateById(req.params._id, req.body)
        res.json(product)
    }

    async deleteProductById(req, res) {
        const product = await this.productService.deleteById(req.params._id)
        res.json(product)
    }


}

module.exports = ProductController
