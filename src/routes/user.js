const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/login', UserController.userLogin);
router.post('/signup', UserController.userSignup);

module.exports = router;