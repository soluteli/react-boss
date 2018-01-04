import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { register } from '../../store/user.redux'

import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../components/logo'

@connect(
  state => state.user,
  { register }
)
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'boss'
    }
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  handelRegist = () => {
    this.props.register(this.state)
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <WingBlank>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
          <List>
            <InputItem onChange={val => this.handleChange('user', val)}>用户</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem type="password" onChange={val => this.handleChange('pwd', val)}>密码</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem type="password" onChange={val => this.handleChange('repeatpwd', val)}>确认密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <RadioItem checked={ this.state.type === 'genius' } onClick={ () => this.handleChange('type', 'genius') }>牛人</RadioItem>
          <RadioItem checked={this.state.type === 'boss'} onClick={ () => this.handleChange('type', 'boss') }>BOSS</RadioItem>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.handelRegist}>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;