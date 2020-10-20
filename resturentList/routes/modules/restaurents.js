const express = require('express')
const router = express.Router()
// let listlength = 0 // 為了引入id先把資料物件陣列長度算出，則加入新的在＋1就好
const restaurantList = require('../../models/resList')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.get('/sortrataioRaising', (req, res) => {
  restaurantList.find() // 取出 Todo model 裡的所有資料
    .sort({ rating: 1 })
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

router.get('/sortrataioDescending', (req, res) => {
  restaurantList.find() // 取出 Todo model 裡的所有資料
    .sort({ rating: -1 })
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// search specific restaurant post
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return restaurantList.find(
    {
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword } }
      ]
    }
  )
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants })
    })
})

// new a restaurant post
router.post('/', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const description = req.body.description
  const image = req.body.image
  const rating = req.body.rating
  restaurantList.countDocuments({ type: Number }, function (_err, count) {
    const id = count + 1
    return restaurantList.create({ name, category, location, phone, description, image, rating, id })// 存入資料庫
      .then(() => res.redirect('/')) // 新增完成後導回首頁
      .catch(error => console.log(error))
  })
})

// connect an detail restaurant post
router.get('/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// view edit restaurant post template
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// renew edit restaurant post
router.put('/:id', (req, res) => {
  const id = req.params.id
  const info = req.body
  return restaurantList.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, info)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// delete restaurant post
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

// 首先引入 express-session 这个模块
const session = require('express-session')
// 设置 session 的可选参数
router.use(session({
  secret: '123nmp0345asd', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60 * 1000 },
  resave: false,
  saveUninitialized: false
}))// 設定 session 设置 cookie 字段 isVisit, 并设置过期时间为1分钟

// 如果请求中的 cookie 存在 isVisit, 则输出 cookie
// 否则，设置 cookie 字段 isVisit, 并设置过期时间为1分钟
/*
if (req.session.isVisit) {
  req.session.userName = 'tonystuck' // 登入成功，設定 session
  req.session.isVisit++
  res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>' + req.session.userName)
  console.log(req.session)
} else {
  req.session.isVisit = 1
  res.send('欢迎第一次来这里')
  console.log(req.session)
}
*/

router.post('/welcomeuser', (req, res) => {
  const userEmail = req.body.email
  const userPassword = req.body.Password
  const userindex = (users.find(e => (e.email === userEmail) && (e.password === userPassword)))
  if (userindex) {
    // 登入成功，設定 session
    req.session.isVisit = 1
    req.session.userName = userindex.firstName // 登入成功，設定 session
    console.log(req.session)
    return restaurantList.find() // 取出 Todo model 裡的所有資料
      .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
      .then(restaurants => res.render('welcomeuser', { restaurants })) // 將資料傳給 index 樣板
      .catch(error => console.error(error)) // 錯誤處理
  } else {
    const errorinfo = { error: '..... Username 或Password 錯誤' }
    return restaurantList.find() // 取出 Todo model 裡的所有資料
      .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
      .then(restaurants => res.render('login', { restaurants, errorinfo })) // 將資料傳給 index 樣板
      .catch(error => console.error(error)) // 錯誤處理
  }
})

module.exports = router
