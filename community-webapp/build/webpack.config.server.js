const path = require('path')
const webpackMerge = require('webpack-merge') // 专门用来合并 webpack 的一些配置的包
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  target: 'node',
  entry: {  // 打包的入口
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: { // 打包的出口
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2' // 打包出来的 js 使用的一种模块的方案。如 umd、cmd(cjs)、amd(requirejs)、commonjs、global
  },
})
