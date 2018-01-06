import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store/store'

import AuthRoute from "./components/authroute";

import Login from './pages/login'
import Register from './pages/register'

import BossInfo from './pages/bossInfo'
import GeniusInfo from './pages/geniusInfo'

import './main.css'

// 配置axios拦截器
import './utils/axios.config'

import {
  BrowserRouter,
  Route,
} from 'react-router-dom'

ReactDOM.render(
  (
    <Provider store={ store }>
      <BrowserRouter>
        <div>
          <AuthRoute />
          <Route path='/bossinfo' component={ BossInfo }></Route>
          <Route path='/geniusinfo' component={ GeniusInfo }></Route>
          <Route path='/login' component={ Login }></Route>
          <Route path='/register' component={ Register }></Route>
        </div>
      </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)
