const path = require('path');

const express = require('express');

const router = express.Router();

// route for get request to add-product
router.get('/add-product', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../views', 'add-product.html'));
});

// route for post request to add-product
router.post('/add-product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;