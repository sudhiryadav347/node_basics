const mongoConnect = require('./util/database').mongoConnect;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');

const pageNotFoundController = require('./controllers/404');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
	User.findById('6265921b6c04c2d77e951781')
	.then(user => {
		req.user = user;
		console.log('req', req.user);
		next();
	})
	.catch(err => {
		console.log(err);
	});
});

app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

app.use('/user', userRoutes);

app.use(pageNotFoundController.pageNotFound);

mongoConnect(() => {
	app.listen(3000);
});
