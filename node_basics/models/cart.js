const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir,
    'data',
    'cart.json'
);



module.exports = class Cart {

    static addProduct(id, productPrice) {

        let cart = { products: [], totalPrice: 0 };


        // Check if file exists => if not then create file with empty cart data
        if (!fs.existsSync(p)) {
            // console.log('file exists.');
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (!err) {
                    // read the file 
                    fs.readFile(p, (err, fileContent) => {

                        // Fetch the previous cart
                        if (!err) {
                            cart = JSON.parse(fileContent);

                            // Analyze the cart => Find existing product
                            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
                            const existingProduct = cart.products[existingProductIndex];

                            let updatedProduct;

                            if (existingProduct) {

                                updatedProduct = { ...existingProduct };

                                updatedProduct.qty = existingProduct.qty + 1;

                                cart.products = [...cart.products];

                                cart.products[existingProductIndex] = updatedProduct;

                            } else {

                                updatedProduct = { id: id, qty: 1 };

                                cart.products = [...cart.products, updatedProduct];

                            }
                            cart.totalPrice = cart.totalPrice + +productPrice;
                            fs.writeFile(p, JSON.stringify(cart), err => {
                                console.log(err);
                            })
                        }
                    });
                }
                else {
                    console.log(err);
                }
            });
        }

    }

}