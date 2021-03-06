// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 restaurantList model
const restaurantList = require('../../models/resList')

// 首先引入 express-session 这个模块
const session = require('express-session')

// 定義首頁路由
router.get('/', (req, res) => {
  // 登入成功，設定 session
  // console.log(req.session.cookie)
  restaurantList.find() // 取出 restaurants model 裡的所有資料
    .lean()// 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) // desc
    .then(restaurants => res.render('index', { restaurants }))// 將資料傳給 index 樣板
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router