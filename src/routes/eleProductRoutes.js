const express = require('express');
const {createElectronicsProduct} = require('../controllers/eleProductController');
const router = express.Router();
router.post('/createdNewProduct',createElectronicsProduct);
module.exports =router;