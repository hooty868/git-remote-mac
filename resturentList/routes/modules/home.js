// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 home 模組程式碼
const home = require('./modules/home')

// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)

// 引用 Todo model
const restaurantList = require('../../models/resList')
// 定義首頁路由
router.get('/', (req, res) => {
  restaurantList.find() // 取出 restaurants model 裡的所有資料
    .lean()// 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) // desc
    .then(restaurants => res.render('index', { restaurants }))// 將資料傳給 index 樣板
  restaurantList.find().lean().then(restaurants => listlength = restaurants.length)
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router