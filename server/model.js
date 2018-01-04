const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/imooc-react-boss'
mongoose.connect(DB_URL)

const models = {
  user: {
    'user': {
      type: String,
      requre: true
    },
    'pwd': {
      type: String,
      requre: true
    },
    'type': {
      type: String,
      requre: true
    },
    'avatar': {
      type: String
    },
    'title': {
      type: String
    },
    'company': {
      type: String
    },
    'money': {
      type: String
    }
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}
