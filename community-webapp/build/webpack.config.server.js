const path = require('path')

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {  // 打包的入口
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: { // 打包的出口
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public',
    libraryTarget: 'commonjs2' // 打包出来的 js 使用的一种模块的方案。如 umd、cmd(cjs)、amd(requirejs)、commonjs、global
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
