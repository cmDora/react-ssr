import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'

// 在 React 16 当中，不需要一个组件 render 的内容必须要有一个父标签，然后所有东西都放在这个父标签里面。
// 可以直接返回一个数组，都是同一层级的组件放在一起就 ok
export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact />,
  <Route path="/list" component={TopicList} />,
  <Route path="/detail" component={TopicDetail} />,
]
