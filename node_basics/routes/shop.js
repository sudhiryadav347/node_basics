const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');
const cartController = require('../controllers/cart');
const checkoutController = require('../controllers/checkout')

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/product-detail', productsController.getPorductDetails);

router.get('/cart', cartController.cart);

router.get('/checkout', checkoutController.checkout);

module.exports = router;