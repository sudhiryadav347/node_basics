const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');
const cartController = require('../controllers/cart');
const checkoutController = require('../controllers/checkout');
const ordersController = require('../controllers/orders');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/products', productsController.getProducts);

router.get('/product-details', productsController.getPorductDetails);

router.get('/cart', cartController.cart);

router.get('/orders', ordersController.orders);

router.get('/checkout', checkoutController.checkout);

module.exports = router;