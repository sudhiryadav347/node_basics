const mongodb = require('mongodb');
const { ObjectId } = require('bson');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getcart = (req, res, next) => {
	req.user
		.getCart()
		.then((products) => {
			res.render('shop/cart', {
				path: '/cart',
				activeCart: true,
				doctitle: 'Your Cart.',
				products: products,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postCart = (req, res, next) => {
	const productId = req.body.productId;
	const prodQty = req.body.quantity;
	Product.findById(new mongodb.ObjectId(productId))
		.then((product) => {
			return req.user.addToCart(product, prodQty);
		})
		.then((result) => {
			console.log('result', result);
			res.redirect('/cart');
		});
};

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	console.log('prodId', prodId);
	req.user.deleteProduct(prodId).then((result) => {
		console.log(result);
		res.redirect('/cart');
	});
};


exports.reduceProductQty = (req, res, next) => {
	console.log('req.body.productId', req.body.productId);
	const prodId = req.body.productId;
	req.user.reduceProductQty(prodId).then( result => {
		res.redirect('/cart');
	})
} 

exports.increaseProductQty = (req, res, next) => {
	console.log('req.body.productId', req.body.productId);
	const prodId = req.body.productId;
	req.user.increaseProductQty(prodId).then( result => {
		res.redirect('/cart');
	})
}