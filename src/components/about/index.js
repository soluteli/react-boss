import React, { Component } from 'react';
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'
import { Redirect } from 'react-router-dom'

import { logoutSubmit } from '../../store/user.redux'
import { Result, List, Button, WhiteSpace, Modal, WingBlank } from 'antd-mobile'

@connect(
  state => state.user,
  { logoutSubmit }
)
class About extends Component {

  logout = () => {
    Modal.alert('注销', '确认退出登录吗???', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认', onPress: () => {
          browserCookie.erase('userid')
          this.props.logoutSubmit()
        }
      }
    ])
  }

  render() {
    // const { pathname } = this.props.location
    const { user, redirectTo, avatar, company, type, desc, money, title } = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return user
    ? (
      <div>
        <Result
          img={<img src={require(`../avatarSelector/img/${avatar}.png`)} style={{ width: 50 }} alt="" />}
          title={user}
          message={type === 'boss' ? company : null}
        />

        <List>
          <Item multipleLine>
            {title}
            {desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
            {money ? <Brief>薪资:{money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <WingBlank >
          <Button type='primary' onClick={this.logout} >退出登陆</Button>
        </WingBlank>
      </div>
    )
      : <Redirect to={redirectTo} />
    ;
  }
}

export default About;