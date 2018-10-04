const mongoose = require("mongoose");
const User = mongoose.model('User');


module.exports.profileRead = function(req, res) {
	
	// If no user ID in the JWT return a 401
	if (!req.payload._id) {
		res.status(401).json({
			"message": "Unautorized: private profile"
		});
	} else {
		// Otherwise continue
		User.
			findById(req.payload._id)
			.exec(function (err, user) {
				res.status(200).json(user);
			});
	}
}