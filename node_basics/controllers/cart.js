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
    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price);
        res.render('shop/cart', {
            path: '/cart',
            activeCart: true,
            doctitle: 'Cart Page.',
            prodId: productId
        });
    });

}

