const Product = require('../models/product');

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            doctitle: 'Shop',
            path: '/admin/products',
            hasProducts: products.length > 0,
        });
    });

}

exports.editProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        path: '/admin/edit-product',
        doctitle: 'Edit product',
        activeAddProduct: true
    });
}
