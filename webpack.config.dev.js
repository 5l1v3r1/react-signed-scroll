/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WebpackManifestPlugin = require('webpack-manifest-plugin');
// const WebpackDashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: path.resolve(__dirname, 'example', 'index.jsx'),
	},
	output: {
		filename: 'js/[name].[hash].js',
		chunkFilename: 'js/chunks/[name].[hash].js',
		path: path.resolve(__dirname, 'docs'),
		publicPath: '/',
	},
	devtool: 'source-map',
	target: 'web',
	devServer: {
		contentBase: path.resolve(__dirname, 'docs'),
		compress: true,
		open: true,
		port: 3000,
		hot: true,
		// historyApiFallback: true,

		// noInfo: true,
	},
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'src')],
		extensions: ['.js', '.jsx', '.css', '.scss'],
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
		// new WebpackManifestPlugin(),
		// new WebpackDashboardPlugin(),
	],
};
