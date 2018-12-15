const express = require('express')
const favicon = require('serve-favicon')
const ReactSSR = require('react-dom/server')
const fs = require('fs')

// 记住所有的引用某一个文件路径的这种方式的使用，最好使用 path 解析一下，用绝对路径去做，这样不会出现问题
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(favicon(path.join(__dirname, '../favicon.ico')))

if (!isDev) {
  // require 方式默认不会去读 default 的内容，而是拿到整个 export 的东西
  const serverEntry = require('../dist/server-entry.js').default
  
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  
  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<app></app>', appString))
  })
} else {
  const devStatic = require('./util/dev-static')
  devStatic(app)
}

app.listen(3333, function () {
  console.log('server is listening on 3333 ')
})