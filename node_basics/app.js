const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', (req, res, next)=>{
    // console.log('This always runs!');
    next();
});

app.use('/add-product', (req, res, next)=>{
    // console.log('In add product middleware');
    res.send('<html><form action="/product" method="POST"><input type="text" name="title"/><button type="submit">Add Product</button></form></html>');
});

app.use('/product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
})

app.use('/', (req, res, next)=>{
    // console.log('In another middleware');
    res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);