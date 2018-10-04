const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
let auth = jwt({
	secret: "MY_SECRET",
	userProperty: 'payload'
});

const ctrlProfile = require('../controllers/profile');
const ctrlAuth    = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/register', function (req, res) {
	console.log('test register');
});

module.exports = router;