import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import App from './views/App'

// 告诉组件使用静态的渲染
// 让 mobx 在服务端渲染的时候不会重复的数据变换
// mobx 是一个 reactive 的框架，它每次数据变化会造成其他的一些方法的调用
// 比如说：computed 里面的方法。在服务端渲染时，如果正常使用客户端的代码时，会有一个 bug，就是他的一次渲染导致 computed 执行非常多的次数，
// 而且，如果改的变量比较多的时候，会出现重复引用，重复调用的一个问题，会导致我们内存溢出。
// 这就是一个问题，所以专门提出了这个工具让我们去使用
useStaticRendering(true)

export default () => {
  return (
    <Provider>
      <StaticRouter>
        <App />
      </StaticRouter>
    </Provider>
  )
}
