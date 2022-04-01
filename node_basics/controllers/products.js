const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        doctitle: 'Add Product',
        path: '/admin/add-product',
        activeAddProduct: true
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            doctitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
        });
    });

}

exports.getPorductDetails = (req, res, next) => {
    res.render('shop/product-detail', {
        path: '/product-detail',
        doctitle: 'Product Detail Page.'
    });
}