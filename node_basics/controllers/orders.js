exports.orders = (req, res, next) => {
	res.render('shop/orders', {
		path: '/orders',
		doctitle: 'Orders Page',
	});
};

exports.postOrder = (req, res, next) => {
	cart = req.user.cart.items;
	isCartEmpty = cart.length <= 0;
	if (!isCartEmpty) {
		req.user
			.addOrder()
			.then((result) => {
				console.log('order created');
				res.redirect('/orders');
			})
			.catch((err) => console.log(err));
	}
};
