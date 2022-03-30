const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');
const router = express.Router();

// route for get request to add-product
router.get('/add-product', productsController.getAddProduct);

// route for post request to add-product
router.post('/add-product', productsController.postAddProduct);

module.exports = router;