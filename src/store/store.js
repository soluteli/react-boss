import thunk from 'redux-thunk' // 插件-异步操作
import { createStore, applyMiddleware, compose } from 'redux'

import reducers from './reducers'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  // redux dev tools
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

export default store
