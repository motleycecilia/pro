var webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
		path.resolve(__dirname, 'src')
	],
	output: {
		path: path.join(__dirname, '/build/'),
		filename: 'build/[name].[hash:4].js',
		chunkFilename: 'build/chunk.[id].[hash:4].js',
		publicPath: '/'
	},
	module: {
		loaders: [{
			test: /\.less$/,
			loader: 'style!css!postcss!less'
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loaders: ['babel']
		}, {
			test: /\.(jpe?g|gif|png|ico|svg)$/,
			loader: 'url?limit=8192&name=build/[name].[hash:4].[ext]'
		}, {
			test: /\.(woff2?|otf|eot|ttf)$/i,
			loader: 'url?name=fonts/[name].[hash:4].[ext]'
		}, {
			test: /\.json$/,
			loader: 'json'
		}]
	},
	resolve: {
		modulesDirectories: [
			'src',
			'node_modules',
			'src/assets'
		],
		extensions: ['', '.js', '.png']
	},
	postcss: function() {
		return [
			require('precss'),
			require('autoprefixer')
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			inject: 'body',
			template: "src/index.tpl.html"
		}),
		new TransferWebpackPlugin([
			{ from: 'assets/images', to: 'build'}
		], path.join(__dirname, 'src')),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.AggressiveMergingPlugin({
			minSizeReduce: 1.5,
			moveToParents: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	devtool: 'source-map'
};
