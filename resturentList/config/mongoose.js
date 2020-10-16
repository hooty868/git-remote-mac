const mongoose = require('mongoose') // 載入 mongoose

// connect to mongodb
mongoose.connect('mongodb://localhost/resList', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

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