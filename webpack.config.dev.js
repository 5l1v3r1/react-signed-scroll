/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	// Chosen mode tells webpack to use its built-in optimizations accordingly.
	mode: 'development', // "production" | "development" | "none"
	entry: {
		main: path.resolve(__dirname, 'example', 'index.jsx'),
	},
	// options related to how webpack emits results
	output: {
		filename: 'js/[name].[hash].js',
		// the target directory for all output files must be an absolute path (use the Node.js path module)
		path: path.resolve(__dirname, 'docs'), // string
		chunkFilename: 'js/chunks/[name].[hash].js',
		// the url to the output directory resolved relative to the HTML page
		publicPath: '/', // string
	},
	devtool: 'source-map',
	target: 'web',
	devServer: {
		// static file location
		contentBase: [
			path.resolve(__dirname, 'docs'),
		],
		compress: true, // enable gzip compression
		open: true,
		port: 3000,
		hot: true,
	},
	// options for resolving module requests (does not apply to resolving to loaders)
	resolve: {
		// directories where to look for modules
		modules: [
			'node_modules',
			path.resolve(__dirname, 'src')
		],
		// extensions that are used
		extensions: ['.js', '.jsx', '.css', '.scss'],
	},
	// configuration regarding modules
	module: {
		// rules for modules (configure loaders, parser options, etc.)
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [
					path.resolve(__dirname, "node_modules")
				],
				use: [
					{
						// the loader which should be applied, it'll be resolved relative to the context
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.(css|scss|sass)$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								indentWidth: 4,
							},
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [require('autoprefixer')],
						},
					},
				],
			},
			{
				test: /.*\.(gif|png|jp(e*)g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash].[ext]',
							outputPath: 'images/',
							publicPath: 'images/',
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash].[ext]',
							outputPath: 'fonts/',
							publicPath: 'fonts/',
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			filename: 'index.html',
			inject: 'body',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css',
		}),
	],
};
