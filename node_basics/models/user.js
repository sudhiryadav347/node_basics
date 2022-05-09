const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const { ObjectID } = require('bson');

module.exports = class User {
	constructor(first_name, last_name, username, email, password) {
		this.first_name = first_name;
		this.last_name = last_name;
		this.username = username;
		this.email = email;
		this.password = password;
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

	static findById(id) {
		const db = getDb();
		return db.collection('users').findOne({ _id: new mongodb.ObjectId(id) });
	}
};
