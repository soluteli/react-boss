import { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadData } from '../../store/user.redux';

@withRouter
@connect(
  null,
  loadData
)
class AuthRoute extends Component {
  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    console.log('auth');
    
    // 获取用户信息
    axios.get('/user/info')
      .then(res => {
        if (res.status !== 200) {
          return
        }
        if (res.data.code === 1) {
          this.props.loadData(res.data.data)
        } else {
          this.props.history.push('/login')
        }
      })
  }
  render () {
    return null
  }
}

export default AuthRoute
