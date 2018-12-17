import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import App from './views/App'

// 使用静态的渲染
useStaticRendering(true)

export default () => {
  return (
    <StaticRouter>
      <Provider>
        <App />
      </Provider>
    </StaticRouter>
  )
}
