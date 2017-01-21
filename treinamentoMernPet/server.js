var path = require('path');
var express = require('express');
var app = express();

var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(bodyparser.json());

var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

var stormpath = require('express-stormpath');
app.use(stormpath.init(app, {
	web: {
		spa: {
			enabled: true,
			view: path.join(__dirname, 'public', 'index.html')
		}
	}
}));

var api = express.Router();
require('./api')(api);
app.use('/api', api);

app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.on('stormpath.ready', function() {
	var port = process.env.PORT || 3000;

	app.listen(port, function(err) {
		if (err) {
			return console.error(err);
		}
		console.log('api running on port ' + port);
	});
});