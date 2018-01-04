const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user')

const app = express()
app.use(cookieParser())
app.use(bodyParser())
app.use('/user', userRouter)

app.listen(3004, function (params) {
  console.log('server is listen on port 3004');
})
