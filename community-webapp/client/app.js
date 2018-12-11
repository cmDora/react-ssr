import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App.jsx'

// react-dom 里面是用 render 方法去把内容渲染到 html 里面。
// 现在新加了一个方法 hydrate。
// 原因：如果我们使用服务端渲染，那么我们需要用 reactDom.hydrate 去在我们客户端的 js 里面去渲染我们客户端的内容。因为 react 会去对比我们服务端的代码生成的代码和客户端生成的代码她们之间的差别，如果有差别，她认为服务端生成的代码是有一定的问题的，她会用客户端新的代码、新的生成内容去替换掉我们服务端生成的内容
// ReactDom.hydrate(<App />, document.getElementById('root'))

const root = document.getElementById('root')
const render = Component => {
  ReactDom.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default
    render(NextApp)
    // ReactDom.hydrate(<NextApp />, document.getElementById('root'))
  })
}