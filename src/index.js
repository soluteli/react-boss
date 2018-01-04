import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store/store'

import AuthRoute from "./components/authroute";

import Login from './pages/login'
import Register from './pages/register'

import './main.css'

// 配置axios拦截器
import './utils/axios.config'

import {
  BrowserRouter,
  Route,
} from 'react-router-dom'

const Boss = function () {
  return <div>boss</div>
}

const Genius = function () {
  return <div>Genius</div>
}

ReactDOM.render(
  (
    <Provider store={ store }>
      <BrowserRouter>
        <div>
          <AuthRoute />
          <Route path='/boss' component={ Boss }></Route>
          <Route path='/genius' component={Genius }></Route>
          <Route path='/login' component={ Login }></Route>
          <Route path='/register' component={ Register }></Route>
        </div>
      </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)
