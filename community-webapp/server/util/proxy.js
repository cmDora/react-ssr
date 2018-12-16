const axios = require('axios')

const baseUrl = 'http://cnodejs.org/api/v1'

module.exports = funtion (req, res, next) {
  const path = req.path
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken

  if (needAccessToken && user.accessToken) {
    // 401 就是没有登录
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query)
  if (query.needAccessToken) delete query.needAccessToken

  // cnode API 有一个问题，我们需要加一个 headers。
  // 因为我们 cnode API 直接使用 axios 发送的时候，它的 content-type 是 application/json 的。
  // cnode API，它有一些 api 是可以接受 application/json 的，但有一些 api 无法接受，它只能用我们的 formdata 来传输。
  // 为了防止出现一些问题，我们把所有的 content-type 全部设为我们的 application/x-www-form-urlencode。这样我们 axios 发送请求的时候不使用 application/json 的格式去发送请求，而使用 formdata 的方式去发送请求，这样的话，cnode API 都可以接收
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: Object.assign({}, req.body, {
      accesstoken: user.accessToken
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencode'
    }
  }).then(resp => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })

}
