const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')
const ReactSSR = require('react-dom/server')
const fs = require('fs')

// 记住所有的引用某一个文件路径的这种方式的使用，最好使用 path 解析一下，用绝对路径去做，这样不会出现问题
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

// 相对来说就是对应我们表单请求不同的类型，一般来说 post 请求这些类型的请求，都会在 body 里面去放数据，那么可以放数据的有不同的格式，一个是 json，还有一个 formdata 这种格式。这些方式都转化成 req.body 上面的数据。后面写业务逻辑的时候只要去截调用 req.body 上面的内容。就可以拿到请求里面的这些数据

// 把 application/json 的请求格式的数据转化成 req.body 上面的数据
app.use(bodyParser.json())
// urlencoded 就是对应 http 请求里面 www/urlencoded 这么一个请求格式。
app.use(bodyParser.urlencoded({ extended: false }))

// 只是测试用，不需要设太长的时间
// 真正上线的时候，这筛选是要存在一个数据库当中，作为缓存或者 redis 这样的数据库服务。
// 现在没有做数据库的话，我们直接存在内存当中，跟着我们的服务一起起的。我们的服务一旦宕机或者关掉了，那么这些 session 的数据就全都没了，下次进来就要重新登录一遍，才能获取 session
// name 就是 session 会放一个 cookieid 到浏览器端，那么我们给这个 cookieid 设一个名字。随便定义就 ok
// resave 就是我们每次请求是否都去申请一个 cookieid，这样的话就会造成比较大的一个资源浪费，这种情况就不需要了
// saveUninitialzed 和 resave 差不多，不需要开启的现在
// secret 就是随便想一个字符串，用这个字符串去加密我们的 cookie，保证我们的 cookie 在我们的浏览器端是没有办法被人解密的
app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class'
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

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
