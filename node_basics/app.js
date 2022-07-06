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
app.use(express.json());
app.use(express.static(path.join(rootDir, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
	User.findById('62799043af69d68212b4178d')
	.then(user => {
		req.user = new User( user.first_name, user.last_name, user.username, user.email, user.password, user.cart, user._id);
		console.log('request.user', req.user);
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
