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

	addToCart(product) {

		const updatedCart = {items: [{productId: new ObjectId(product._id), quantity: 1}]};
		const db = getDb();
		return db
			.collection('users')
			.updateOne(
				{ _id: new mongodb.ObjectId(this._id)},
				{ $set: {cart: updatedCart} }
			);
	}

	static findById(id) {
		const db = getDb();
		return db.collection('users').findOne({ _id: new mongodb.ObjectId(id) });
	}
};
