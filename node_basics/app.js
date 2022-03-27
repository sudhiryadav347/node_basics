const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const rootDir = require('./util/path');
// Setting up the template engine to pug previously called as Jade
app.set('view engine', 'pug');
// Setting up the view directory to use which is already a default but putting here for learning.
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));


app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
})

app.listen(3000);