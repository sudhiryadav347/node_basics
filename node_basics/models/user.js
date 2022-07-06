const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const ObjectId = mongodb.ObjectId;
const { products } = require('../controllers/products');

module.exports = class User {
constructor(first_name, last_name, username, email, password, cart, id) {
	this.first_name = first_name;
	this.last_name = last_name;
	this.username = username;
	this.email = email;
	this.password = password;
	this.cart = cart;
	this._id = id;
}

save() {
	const db = getDb();
	return db
		.collection('users')
		.insertOne(this)
		.then((result) => {
			console.log('User created.');
		})
		.catch((err) => {
			console.log(err);
		});
}

addToCart(product, prodQty) {

	const cartProductIndex = this.cart.items.findIndex((cp) => {
		return cp.productId.toString() === product._id.toString();
	});

	let newQuantity = prodQty ? prodQty : 1;
	let updatedCartItems = [...this.cart.items];

	if (cartProductIndex >= 0) {
		// product already exists
		newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
		updatedCartItems[cartProductIndex].quantity = newQuantity;
	} else {
		// product does not already exist
		updatedCartItems.push({
			productId: new ObjectId(product._id),
			quantity: newQuantity,
		});
	}

	const updatedCart = {
		items: updatedCartItems,
	};
	const db = getDb();
	return db
		.collection('users')
		.updateOne(
			{ _id: new mongodb.ObjectId(this._id) },
			{ $set: { cart: updatedCart } }
		);
}

getCart() {
	const db = getDb();
	const productIds = this.cart.items.map((i) => {
		return i.productId;
	});
	return db
		.collection('products')
		.find({ _id: { $in: productIds } })
		.toArray()
		.then((products) => {
			return products.map((p) => {
				return {
					...p,
					quantity: this.cart.items.find((i) => {
						return i.productId.toString() === p._id.toString();
					}).quantity,
				};
			});
		});
}

reduceProductQty(productId) {
	const cart = this.cart.items;
	const productIndex = cart.findIndex((product) => {
		return product.productId.toString() === productId;
	});
	let updatedCart = [...cart];
	if (updatedCart[productIndex].quantity > 1) {
		updatedCart[productIndex].quantity -= 1;
	} else {
		updatedCart = updatedCart.filter((product) => {
			return product.productId.toString() !== productId;
		});
	}
	updatedCart = { items: updatedCart };
	const db = getDb();
	return db
		.collection('users')
		.updateOne(
			{ _id: new mongodb.ObjectId(this._id) },
			{ $set: { cart: updatedCart } }
		);
}

increaseProductQty(productId) {
	const cart = this.cart.items;
	const productIndex = cart.findIndex((product) => {
		return product.productId.toString() === productId;
	});
	let updatedCart = [...cart];
	updatedCart[productIndex].quantity++;
	updatedCart = { items: updatedCart };
	const db = getDb();
	return db
		.collection('users')
		.updateOne(
			{ _id: new mongodb.ObjectId(this._id) },
			{ $set: { cart: updatedCart } }
		);
}

deleteProduct(productId) {
	const cart = this.cart.items;
	const productIndex = cart.findIndex((product) => {
		return product.productId.toString() === productId;
	});
	let updatedCart = [...cart];

	updatedCart = updatedCart.filter((product) => {
		return product.productId.toString() !== productId;
	});

	updatedCart = { items: updatedCart };
	const db = getDb();
	return db
		.collection('users')
		.updateOne(
			{ _id: new mongodb.ObjectId(this._id) },
			{ $set: { cart: updatedCart } }
		);
}

static findById(id) {
	const db = getDb();
	return db.collection('users').findOne({ _id: new mongodb.ObjectId(id) });
}
};
