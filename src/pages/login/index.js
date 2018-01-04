import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../../store/user.redux'

import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../components/logo'

@connect(
  state => state.user,
  { login }
)
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  register = () => {
    this.props.history.push('/register') 
  }

  login = () => {
    this.props.login(this.state)
  }

  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <WingBlank>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
          <List>
            <InputItem onChange={ val => this.handleChange('user', val) }>用户</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem type='password' onChange={val => this.handleChange('pwd', val)}>密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={ this.login }>登陆</Button>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;