import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navLinkBar'

import Genius from '../genius'
import Boss from '../boss'

function Chat() {
  return <h2>消息列表页面</h2>
}
function About() {
  return <h2>个人中心页面</h2>
}



@connect(
  state => state
)
class DashBoard extends Component {
  render() {
    const { pathname } = this.props.location
    const { user } = this.props
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/chat',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Chat
      },
      {
        path: '/about',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: About
      }
    ]


    return (
      <div>
        <NavBar className='fixd-header' mode='dard'>{navList.find(v => v.path === pathname).title}</NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    );
  }
}

export default DashBoard;