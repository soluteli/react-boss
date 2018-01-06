import React, { Component } from 'react';
import { connect } from 'react-redux'
import { update } from '../../store/user.redux'
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../components/avatarSelector'

@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: ''
    }
  }

  onChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  handleSubmit = () => {
    this.props.update(this.state)
  }

  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar>完善Genius信息</NavBar>
        <AvatarSelector
          selectAvatar={(imgname) => {
            this.setState({
              avatar: imgname
            })
          }}
        ></AvatarSelector>
        <InputItem onChange={(v) => this.onChange('title', v)}>
          求职岗位
				</InputItem>
        <TextareaItem
          onChange={(v) => this.onChange('desc', v)}
          rows={3}
          autoHeight
          title='个人介绍'
        >
        </TextareaItem>
        <Button type='primary' onClick={ this.handleSubmit }>保存</Button>
      </div>
    );
  }
}

export default GeniusInfo;