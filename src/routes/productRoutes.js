const express = require('express');
const ProductController = require('../controllers/productController');
const router = express.Router()
const productController = new ProductController()

//? Routers
router.post('/', productController.createProduct.bind(productController))
router.get('/:id', productController.getProductById.bind(productController))
router.get('/',  productController.getAllProduct.bind(productController))
router.put(
  '/:id',
  
  productController.updateProductById.bind(productController)
)
router.delete(
  '/:id',productController.deleteProductById.bind(productController)
)
module.exports = router

 