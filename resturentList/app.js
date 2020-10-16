// Include express from node_modules and define server related variables
const express = require('express')
require('./config/mongoose')
const bodyParser = require('body-parser')// 引用 body-parser
const app = express()
const port = 3000
// 載入 method-override
const methodOverride = require('method-override')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// require express-handlebars here
const exphbs = require('express-handlebars')

// 載入 restaurantslist model
const restaurantList = require('./models/resList')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

const routes = require('./routes')// 引用路由器
// 將 request 導入路由器
app.use(routes)

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})