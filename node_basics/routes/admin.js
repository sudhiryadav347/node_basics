const path = require('path');

const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

const adminProductsController = require('../controllers/admin-products');

// route for get request to add-product
router.get('/add-product', productsController.getAddProduct);

// route for post request to add-product
router.post('/add-product', productsController.postAddProduct);

router.get('/edit-product/:productId',adminProductsController.editProduct);

router.post('/edit-product',adminProductsController.postEditProduct);

router.get('/products', adminProductsController.getAdminProducts);

module.exports = router;
