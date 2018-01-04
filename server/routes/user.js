const express = require('express')
const utils = require('utility')

const model = require('../model.js')

const Router = express.Router()
const User = model.getModel('user')

const _filter = { 'pwd': 0, '__v': 0 }

Router.post('/login', function (req, res) {
  const { user, pwd } = req.body
  User.findOne( {user, pwd: md5Pwd(pwd) }, _filter, function (err, doc) {
    if (!doc) {
      return res.json({
        code: 0,
        msg: '用户名或者密码错误'
      })
    }
    res.cookie('userid', doc._id)
    return res.json({
      code: 1,
      data: doc
    })
  })
})

Router.post('/register', function(req, res){
  const { user, pwd, type } = req.body
  User.findOne({ user }, function (req, doc) {
    if (doc) {
      return res.json({
        code: 0,
        msg: '用户名已被占用'
      })
    }
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
    userModel.save(function (err, doc) {
      if (err) {
        return res.json({
          code: 0,
          msg: '后端出错'
        })
      }
      const { user, type, _id } = doc
      res.cookie('userid', _id)
      return res.json({
        code: 1,
        data: {
          user,
          type,
          _id
        }
      })
    })
  })
})

Router.get('/info', function (req, res) {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({
      code: 0
    })
  }
  User.findOne({ _id: userid }, _filter, function (err, doc) {
    if (err) {
      return res.json({
        code: 0,
        msg: '后端出错'
      })
    }
    if (doc) {
      return res.json({
        code: 1,
        data: doc
      })
    }
  })
})

function md5Pwd(pwd) {
  const salt = 'immoc_react_boss_2832@#983nan1!'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
