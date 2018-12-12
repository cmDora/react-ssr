const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge') // 专门用来合并 webpack 的一些配置的包 || 深度拷贝，不会把内容覆盖，而是与里面的内容一一对比
const baseConfig = require('./webpack.base')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  mode: 'development',
  entry: {  // 打包的入口
    app: path.join(__dirname, '../client/app.js')
  },
  output: { // 打包的出口
    filename: '[name].[hash].js',
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })  // 生成一个 html 页面。同时在 webpack 编译时，把所生成的所有 entry 都注入到 html 中，路径、名字也是根据 output 配置而成的
  ]
})

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: { // 在 webpack 编译的过程中如果出现了任何的错误，就让他在网页上显示出一个黑色的背景，然后有一个错误的信息显示给我们的弹窗
      errors: true
    },
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
