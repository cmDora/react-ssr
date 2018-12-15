const path = require('path')

module.exports = {
	output: {
		path: path.join(__dirname, '../dist'),
		publicPath: '/public/'
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|jsx)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /.jsx$/,
				loader: 'babel-loader'
			},
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	}
}