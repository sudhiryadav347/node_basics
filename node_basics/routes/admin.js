const express = require('express');

const router = express.Router();

// route for get request to add-product
router.get('/add-product', (req, res, next)=>{
    res.send('<html><form action="/admin/add-product" method="POST"><input type="text" name="title"/><button type="submit">Add Product</button></form></html>');
});

// route for post request to add-product
router.post('/add-product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;