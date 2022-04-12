const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    doctitle: 'Add Product',
    path: '/admin/add-product',
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  const price = req.body.price;

  const product = new Product(title, image, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      doctitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render('shop/product-details', {
      prod: product,
      doctitle: product.title,
      path: '/products',
      isSingleProductPage: true,
    });
  });
};

exports.products = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/products', {
      prods: products,
      doctitle: 'Shop',
      path: '/products',
      hasProducts: products.length > 0,
    });
  });
};
