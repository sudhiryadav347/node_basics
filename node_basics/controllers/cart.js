exports.getcart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        activeCart: true,
        doctitle: 'Cart Page.'
    });
}

exports.postCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        activeCart: true,
        doctitle: 'Cart Page.',
        prodId: req.body.productId
    });
}

