const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getcart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];

      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );

        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }

      res.render('shop/cart', {
        path: '/cart',
        activeCart: true,
        doctitle: 'Your Cart.',
        product: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  const prodQty = req.body.quantity;
  Product.findById(productId, (product) => {
    const productPrice = product.price * prodQty;
    Cart.addProduct(productId, productPrice, prodQty);
    res.redirect('/cart');  
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });

}