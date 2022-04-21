const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    doctitle: 'Add Product',
    path: '/admin/add-product',
    activeAddProduct: true,
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  const price = req.body.price;

  const product = new Product(title, image, description, price);
  product
    .save()
    .then((result) => {
      console.log('Product created!');
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        doctitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
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
  Product.fetchAll()
    .then((products) => {
      res.render('shop/products', {
        prods: products,
        doctitle: 'Shop',
        path: '/products',
        hasProducts: products.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
