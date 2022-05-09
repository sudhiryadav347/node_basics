const express = require('express');

const router = express.Router();
const userController = require('../controllers/users');

router.get('/signup', userController.getAddUser);

router.post('/signup', userController.postAddUser);

router.get('/login', userController.getLoginForm);

router.post('/login', userController.postLoginForm);

router.get('/:id', userController.getUserbyId);

module.exports = router;
