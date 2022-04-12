const Product = require('../models/product');

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      doctitle: 'Shop',
      path: '/admin/products',
      hasProducts: products.length > 0,
    });
  });
};

exports.editProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      res.status(404).render('404.ejs', {
        doctitle: 'Page Not Found',
        path: '',
      });
      //   return res.redirect('/');
    }
    res.render('admin/edit-product', {
      path: '/admin/products',
      doctitle: 'Edit product',
      activeEditProduct: true,
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
    
}