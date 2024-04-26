const AppServices = require('./AppServices');
const ProductModel = require('../models/productModel');

class ProductService extends AppServices {
    constructor() {
        super(ProductModel);
    }
}

module.exports = ProductService;
