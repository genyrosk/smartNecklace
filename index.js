var express 	= require('express');
var path 		= require('path');
var bodyParser 	= require('body-parser');
var session 	= require('express-session');
var flash 		= require('connect-flash');
var morgan 		= require('morgan');
var csurf 		= require('csurf');

var app = express();
var router 		= express.Router();

app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');


/**
*	Use morgan for HTTP request logging in dev and prod
*/
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

/**
*	Serve static assets
*/
app.use(express.static(path.join(__dirname, 'public')));

/**	
*	Parse incoming form-encoded HTTP bodies
*/
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
*	Create and manage HTTP sessions for all requests
*/
// app.use(session({
//   secret: config.secret,
//   resave: true,
//   saveUninitialized: true
// }));

/**
*	Use connect-flash to persist informational messages across redirects
*/
app.use(flash());

// Add CSRF protection for web routes
// if (process.env.NODE_ENV !== 'test') {
//   app.use(csurf());
//   app.use(function(req, res, next) {
//     res.locals.csrftoken = req.csrfToken();
//     next();
//   });
// }

app.get('/', function(req, res) {
	res.send('not using YARN aymore (2nd attempt with Heroku)');
	// res.render('pages/index');
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


module.exports = app;