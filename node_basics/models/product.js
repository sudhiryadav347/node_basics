const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir,
    'data',
    'products.json'
);
const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(data));
        }
    });
}

class Product {

    constructor(title, image, description, price) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.price = price;

    }

    save() {
        this.id = Math.floor(Math.random() * 100).toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }


}

module.exports = Product;