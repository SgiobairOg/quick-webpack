const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ( env, argv ) => {
	const isDevelopment = argv.mode === 'development';
	const port = argv.port || 3003;

	return({
		// webpack build mode
		mode: isDevelopment ? 'development' : 'production',

		// source mapping
		devtool: isDevelopment ? '#eval-source-map' : 'source-map',

		// entry point
		entry: [
			'./src/javascript/index.js',
		],

		devServer: {
			stats: {
				children: false, // Hide children information
				maxModules: 0, // Set the maximum number of modules to be shown
			},
			contentBase: './',
			inline: true,
			hot: true,
			port: port,
		},

		// output bundle
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js',
		},

		// module rules
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					},
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						{
							// Get all transformed CSS
							// Extract CSS into separate single bundled file
							loader: MiniCssExtractPlugin.loader
						},
						{
							// resolve url() and @imports
							loader: 'css-loader'
						},
						{
							// apply postCSS fixes
							loader: 'postcss-loader'
						},
						{
							// transform sass to css
							loader: 'sass-loader',
							options: {
								implementation: require('sass')
							}
						}
					],
				},
				{
					// handle image files
					test: /\.(png|jpe?g|gif|svg)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: 'images',
							},
						},
					],
				},
				{
				// Apply rule for fonts files
				test: /\.(woff|woff2|ttf|otf|eot)$/,
				use: [
						{
							// Using file-loader too
							loader: "file-loader",
							options: {
								outputPath: 'fonts',
							},
						}
					],
				}
			]
		},

		plugins: [
			new MiniCssExtractPlugin({
				filename: "styles.css",
			}),
		],

		watch: isDevelopment ? true : false,
	});
}