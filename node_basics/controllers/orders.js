exports.orders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        doctitle: 'Orders Page' 
    })
}