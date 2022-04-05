const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getcart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        activeCart: true,
        doctitle: 'Cart Page.'
    });
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    const prodQty = req.body.quantity;
    Product.findById(productId, product => {
        const productPrice = product.price * prodQty;
        Cart.addProduct(productId, productPrice, prodQty);
        res.render('shop/cart', {
            path: '/cart',
            activeCart: true,
            doctitle: 'Cart Page.',
            prodId: productId
        });
    });

}

