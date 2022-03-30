const { json } = require('express/lib/response');
const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir,
    'data',
    'products.json'
);

class Product {
    constructor(t) {
        this.title = t;
    }

    save() {

        fs.readFile(p, (err, data) => {
            let products = [];
            if (!err) {
                products = JSON.parse(data);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        fs.readFile(p, (err, data) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(data));
        });
    }

}

module.exports = Product;