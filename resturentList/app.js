// Include express from node_modules and define server related variables
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const bodyParser = require('body-parser')// 引用 body-parser
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

//connect to mongodb
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

// 載入 restaurantslist model
const restaurantList = require('./models/resList')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting the route and corresponding response
app.get('/', (req, res) => {
  restaurantList.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// new a restaurant post
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const description = req.body.description
  const image = req.body.image
  const rating = req.body.rating
  return restaurantList.create({ name, category, location, phone, description, image, rating })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// connect an edit restaurant post
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//new edit restaurant post templete
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//renew edit restaurant post
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const description = req.body.description
  const image = req.body.image
  const rating = req.body.rating
  return restaurantList.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.description = description
      restaurant.image = image
      restaurant.rating = rating
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})