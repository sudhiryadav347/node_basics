const User = require('../models/user');

exports.getAddUser = (req, res, next) => {
	res.render('user/register', {
		doctitle: 'Signup',
		path: '/signup',
		activeAddUser: true,
		register: true,
	});
};

exports.postAddUser = (req, res, next) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	const user = new User(firstName, lastName, username, email, password);
	console.log('username', username);
	console.log('email', email);
	user
		.save()
		.then((result) => {
			res.redirect('/user/signup');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getUserbyId = (req, res, next) => {
	const userId = req.params.id;
	User.findById(userId)
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getLoginForm = (req, res, next) => {
	res.render('user/login', {
		doctitle: 'Login',
		path: '/login',
		activeLoginUser: true,
		login: true,
	});
};

exports.postLoginForm = () => {};
