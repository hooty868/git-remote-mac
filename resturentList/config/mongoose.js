const mongoose = require('mongoose') // 載入 mongoose

// 如果在 Heroku 環境則使用 process.env.MONGODB_URI
// 否則為本地環境，使用 mongodb://localhost/todo-list
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'

// connect to mongodb
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常/成功
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb server connected!')
})

module.exports = db