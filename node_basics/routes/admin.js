const path = require('path');

const express = require('express');

const rootDir = require('../util/path')

const router = express.Router();

// let's save the products in products array for now.
const products = [];

// route for get request to add-product
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        doctitle: 'Add Product',
        path: 'admin/add-product',
        activeAddProduct: true,
        formCSS: true,
        productCSS: true
    });
});

// route for post request to add-product
router.post('/add-product', (req, res, next) => {
    // console.log(req.body);
    products.push({ title: req.body.title });
    res.redirect('/');
});

exports.products = products;
exports.routes = router;
