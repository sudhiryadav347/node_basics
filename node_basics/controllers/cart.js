exports.cart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        activeCart: true,
        doctitle: 'Cart Page.'
    });
}