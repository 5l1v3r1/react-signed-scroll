const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		index: path.join(__dirname, '/example/index.jsx'),
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/docs/'),
		chunkFilename: '[id].chunk.js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
		],
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: 'React Signed Scroll',
		}),
	],
	devtool: 'source-map',
};
