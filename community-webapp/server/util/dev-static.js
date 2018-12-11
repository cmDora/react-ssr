const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const proxy = require('http-proxy-middleware')

// 在内存上读写问价
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
    .catch(reject)
  })
}

const Module = module.constructor

const mfs = new MemoryFs

// compiler 可以去监听 entry 它依赖的文件是否有变化，一旦有变化，就要重新去打包
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))
  
  // 输出的这个文件夹的路径下面的文件名，就是我们想要得到的服务端 bundle 的整个路径，我们并不希望 serverCompiler 去吧文件输出出去。这样的话，因为写到硬盘的过程是比较费时间的，也比较降低我们的工作效率
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  
  const m = new Module()
  
  // 一定要指定名字，否则会报错：TypeError: Path must be a string. Received undefined
  // 因为 require 是根据文件名去 require 的，所以要编译一个文件的话，同样也要指定一个文件名，否则无法在缓存之中去存储这部分内容
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})

module.exports = function (app) {
  
  // 因为客户端的文件都是在 webpack-dev-server 里面去存储的，通过一个 http 服务把他 export 出来的。所以就是用代理的方式把静态文件都代理到 webpack-dev-server 启动的服务里面
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  
  app.get('*', function (req, res) {
    getTemplate().then(template => {
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(template.replace('<!-- app -->', content))
    })
  })
  
}