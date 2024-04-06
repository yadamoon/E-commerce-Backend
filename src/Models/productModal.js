const mongoose = require('mongoose');

// Define the product schema
const productModal = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a  name'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a  description'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
    },
    image: {
        type: String,
        required: [true, 'Please provide a image'],
        unique:true
    },
    // createdAt: 
        // type: Date,
        // default: Date.now
    
});

// Create a Product model based on the schema
const Product = mongoose.model('Product', productModal);

module.exports = Product;
