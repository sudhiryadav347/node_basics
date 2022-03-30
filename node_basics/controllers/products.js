// let's save the products in products array for now.
const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        doctitle: 'Add Product',
        path: 'admin/add-product',
        activeAddProduct: true,
        formCSS: true,
        productCSS: true
    });
}

exports.postAddProduct = (req, res, next) => {
      // console.log(req.body);
      products.push({ title: req.body.title });
      res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    res.render('shop', {
        prods: products,
        doctitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
}