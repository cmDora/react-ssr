const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'http://cnodejs.org/api/v1'

router.post('/login', function (req, res, next) {
  axios.post(`${baseUrl}/accesstoken`, {
    accessToken: req.body.accessToken
  })
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resp.data.loginname,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        }
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      if (err.response) {
        // response 的意思就是说我们请求的 cnode 的接口，它是有返回的，只是说它是业务逻辑的错误，不是服务器直接报的错误
        res.json({
          success: false,
          data: err.response.data
        })
      } else {
        // 这样把这个错误抛给我们全局的错误处理器去处理
        next(err)
      }
    })
})

module.exports = router
