const express = require('express');
const {createProduct} = require('../Controllers/productController');
const router = express.Router();
router.post('/register',createProduct);
module.exports =router;