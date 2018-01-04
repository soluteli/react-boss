import axios from 'axios'
import { Toast } from 'antd-mobile'

// 拦截请求的发送
axios.interceptors.request.use( (config) => {
  Toast.loading('loading...')
  return config
})

// 拦截请求的发送
axios.interceptors.response.use((config) => {
  Toast.hide()
  return config
})
