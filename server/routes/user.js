const express = require('express')
const utils = require('utility')

const model = require('../model.js')

const Router = express.Router()
const User = model.getModel('user')
const Chat = model.getModel('chat')

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

Router.post('/update', function (req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({ code: 0 })
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    console.log('DOC', doc, body)
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 1, data })
  })
})

Router.get('/list', function (req, res) {
  const { type } = req.query
  // User.remove({},function(e,d){})
  User.find({ type }, function (err, doc) {
    return res.json({ code: 1, data: doc })
  })
})

Router.get('/getmsglist', function(req, res){
  const userid = req.cookies.userid

  User.find({}, function (err, userdoc) {
    let users = {}
    userdoc.forEach(val => {
      users[val._id] = { name: val.user, avatar: val.avatar }
    })
    Chat.find({'$or': [{from: userid}, {to: userid}]}, function (err, doc) {
      if (!err) {
        res.json({
          code: 1,
          msgs: doc,
          users: users
        })
      }
    })
  })
})

Router.post('/readmsg', function (req, res) {
  const userid = req.cookies.userid
  const { from } = req.body
  Chat.update(
    { from, to: userid },
    { '$set': { read: true } },
    { 'multi': true },
    function (err, doc) {
      console.log(doc)
      if (!err) {
        return res.json({ code: 1, num: doc.nModified })
      }
      return res.json({ code: 0, msg: '修改失败' })
    })
})

function md5Pwd(pwd) {
  const salt = 'immoc_react_boss_2832@#983nan1!'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
