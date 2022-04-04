const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');
const cartController = require('../controllers/cart');
const checkoutController = require('../controllers/checkout');
const ordersController = require('../controllers/orders');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/products', productsController.products);

router.get('/product/:productId', productsController.getProduct);

router.get('/cart', cartController.getcart);

router.post('/cart', cartController.postCart);

router.get('/orders', ordersController.orders);

router.get('/checkout', checkoutController.checkout);

module.exports = router;