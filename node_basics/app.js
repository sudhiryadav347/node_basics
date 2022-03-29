const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRoutes.routes);
app.use('/', shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    res.status(404).render('404', { doctitle: 'Page Not Found' });
})

app.listen(3030);