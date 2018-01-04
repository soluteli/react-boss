import axios from 'axios'
import getUserRedirectUrl from '../utils/getUserRedirectPath'


const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  isAuth: false,
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

// reducer
export function user(state=initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        redirectTo: getUserRedirectUrl(action.payload),
        msg: '',
        isAuth: true,
        ...action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        redirectTo: getUserRedirectUrl(action.payload),
        msg: '',
        isAuth: true,
        ...action.payload
      }
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      }
    case ERROR_MSG:
      return {
        ...state,
        isAuth: false,
        msg: action.msg
      }
    default:
      return state
  }
}

// actions
function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

function errMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}

export function loadData(userinfo) {
  return {
    type: LOAD_DATA,
    payload: userinfo
  }
}

export function login({user, pwd}) {
  return dispatch => {
    axios.post('/user/login', { user, pwd })
      .then(res => {
        if (res.status === 200 && res.data.code === 1) {
          dispatch(loginSuccess(res.data.data))
        } else {
          dispatch(errMsg(res.data.msg))
        }
      })
  }
}

export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(registerSuccess({ user, pwd, type }))
        } else {
          dispatch(errMsg(res.data.msg))
        }
      })
  }

}