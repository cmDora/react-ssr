import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'

// 在 react16 当中，不需要一个组件的内容必须要有一个父标签，可以直接返回一个数组，都是同一层的组件放在一起就可以了
// 作为规则，数组每一项后面都要加上逗号
export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact />,
  <Route path="/list" component={TopicList} />,
  <Route path="/detail" component={TopicDetail} />,
]
