const getDb = require('../util/database').getDb;
const fs = require('fs');
const path = require('path');
const Cart = require('./cart');
const rootDir = require('../util/path');
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
    db.collection('products')
    .insertOne(this)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
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

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
}

module.exports = Product;
