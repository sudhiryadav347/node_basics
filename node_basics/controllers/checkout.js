exports.checkout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        doctitle: 'Checkout Page' 
    })
}