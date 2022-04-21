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
  constructor(title, image, description, price) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deletebyId(id) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      const updatedProducts = products.filter((p) => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }

        console.log(err);
      });
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
