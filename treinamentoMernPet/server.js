var path = require('path');
var morgan = require('morgan');

var express = require('express');
var app = express();

// BODY PARSER
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(bodyparser.json());

// WEBPACK
var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

// CORS
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

app.use(morgan('combined'));

// STORMPATH
var stormpath = require('express-stormpath');
app.use(stormpath.init(app, {
	web: {
		spa: {
			enabled: true,
			view: path.join(__dirname, 'public', 'index.html')
		}
	},
	expand: {
		groups: true
	}
}));

// API
var api = express.Router();
require('./api')(api);
app.use('/api', api); 

// STATIC FILES
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// EVERYTHING ELSE
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// SERVER
app.on('stormpath.ready', function() {
	var port = process.env.PORT || 8080;

	app.listen(port, function(err) {
		if (err) {
			return console.error(err);
		}
		console.log('api running on port ' + port);
	});
});
