const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const passport      = require('passport');

require('./api/models/db');
require('./api/config/passport');

console.log('test');
// get routes
const routesApi = require("./api/routes/index");

const app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

// init pasport before using router middleware
//app.use(passport.initialize());

// use the API routers when path starts with / api
app.use('/api', routesApi);
//console.log(routesApi);
// test server
/*app.get('/', function (req, res) {
	console.log('test');
	res.send('hello world');
})*/

app.use(function (req, res, next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handlebars
// Catch unathorised errors
app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401);
		res.json({"message": err.name + ": " + err.message});
	}
});

if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;