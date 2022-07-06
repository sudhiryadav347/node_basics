const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const cartController = require('../controllers/cart');
const checkoutController = require('../controllers/checkout');
const ordersController = require('../controllers/orders');

router
  .get('/', productsController.getProducts)

  .get('/products', productsController.products)

  .get('/product/:productId', productsController.getProduct)

  .get('/cart', cartController.getcart)

  .post('/cart', cartController.postCart)

  .post('/cart-delete-item', cartController.postCartDeleteProduct)

  .get('/orders', ordersController.orders)

  .get('/checkout', checkoutController.checkout)

  .post('/reduce-item-qty', cartController.reduceProductQty)

  .post('/increase-item-qty', cartController.increaseProductQty)

module.exports = router;
