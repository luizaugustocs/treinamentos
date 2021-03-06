var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		'./src/app'
	],
	devtool: 'eval',
	output: {
		path: __dirname,
		filename: 'app.js',
		publicPath: '/js',
		pathinfo: true
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			include: path.join(__dirname, 'src')
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development'),
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
};
