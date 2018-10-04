const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = function (req, res) {
	console.log(req.body);
	console.log('test post register');
	let user = new User();

	user.name = req.body.name;
	user.email = req.body.email;

	user.setPassword(req.body.password);

	user.save(function (err) {
		let token;
		token = user.generateJWt();
		res.status(200);
		res.json({
			"token": token
		});
	});
};


module.exports.login = function (req, res) {
	passport.authenticate('local', function (err, user, info) {
		let token;

		///  if passport throw/catch an error
		if (err) {
			res.status(404).json(err);
			return;
		}

		// if user is found
		if (user) {
			token = user.generateJWt();
			res.status(200);
			res.json({
				"token": token
			});
		} else {
			// if user is not found
			res.status(401).json(info);
		}
	})(req, res);
};