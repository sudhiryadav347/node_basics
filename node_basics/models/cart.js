const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice, prodQty) {
    let cart = { products: [], totalPrice: 0 };

    // Check if file exists => if not then create file with empty cart data
    if (!fs.existsSync(p)) {
      // console.log('file exists.');
      cart.products = [{ id: id, qty: prodQty }];
      cart.totalPrice = +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    } else {
      // read the file
      fs.readFile(p, (err, fileContent) => {
        // Fetch the previous cart
        if (!err) {
          cart = JSON.parse(fileContent);

          // Analyze the cart => Find existing product
          const existingProductIndex = cart.products.findIndex(
            (prod) => prod.id === id
          );
          const existingProduct = cart.products[existingProductIndex];

          let updatedProduct;

          if (existingProduct) {
            updatedProduct = { ...existingProduct };

            updatedProduct.qty = +existingProduct.qty + +prodQty;

            cart.products = [...cart.products];

            cart.products[existingProductIndex] = updatedProduct;
          } else {
            updatedProduct = { id: id, qty: +prodQty };

            cart.products = [...cart.products, updatedProduct];
          }
          cart.totalPrice = cart.totalPrice + +productPrice;
          fs.writeFile(p, JSON.stringify(cart), (err) => {
            console.log(err);
          });
        }
      });
    }
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      } else {
        const cart = JSON.parse(fileContent);
        const updatedCart = { ...cart };
        const product = updatedCart.products.find((prod) => prod.id === id);
        if (!product) {
          return;
        }
        const productQty = product.qty;
        updatedCart.products = updatedCart.products.filter(
          (prod) => prod.id !== id
        );
        updatedCart.totalPrice =
          updatedCart.totalPrice - productPrice * productQty;

        fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
          console.log(err);
        });
      }
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
