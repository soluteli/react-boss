const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const ChatModel = model.getModel('chat')

const userRouter = require('./routes/user')
const app = express()


// socket start
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function (socket) {
  console.log('user connect')
  socket.on('sendmsg', function (data) {
    console.log('server get sendmsg')
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    ChatModel.create({ chatid, from, to, content: msg }, function (err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(cookieParser())
app.use(bodyParser())
app.use('/user', userRouter)

server.listen(3004, function (params) {
  console.log('server is listen on port 3004');
})
