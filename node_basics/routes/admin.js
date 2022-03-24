const express = require('express');

const router = express.Router();


router.get('/add-product', (req, res, next)=>{
    // console.log('In add product middleware');
    res.send('<html><form action="/product" method="POST"><input type="text" name="title"/><button type="submit">Add Product</button></form></html>');
});

// this middleware now only fire for post request.
router.post('/product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;