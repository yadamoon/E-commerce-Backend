const express = require('express');
const {createElectronicsProduct} = require('../Controllers/eleProductController');
const router = express.Router();
router.post('/createdNewProduct',createElectronicsProduct);
module.exports =router;