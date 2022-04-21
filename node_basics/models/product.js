const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const fs = require('fs');
const path = require('path');
const Cart = require('./cart');
const rootDir = require('../util/path');
const { ObjectID } = require('bson');
const p = path.join(rootDir, 'data', 'products.json');
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
};

class Product {
  constructor(title, image, description, price, id) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.price = price;
    this.prodId = new mongodb.ObjectId(id);
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this.prodId) {
      // update existing product
      dbOp = db
        .collection('products')
        .updateOne({ _id: this.prodId }, { $set: this });
    } else {
      // create new product
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deletebyId(id) {
    const db = getDb();
    const prodId = new mongodb.ObjectId(id);
    return db
      .collection('products')
      .deleteOne({ _id: prodId })
      .then((result) => {
        console.log('deleled');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        console.log(id);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
