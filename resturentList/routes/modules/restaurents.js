const express = require('express')
const router = express.Router()
let listlength = 0 // 為了引入id先把資料物件陣列長度算出，則加入新的在＋1就好
const restaurantList = require('../../models/resList')
router.get('/new', (req, res) => {
  return res.render('new')
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
      if (restaurants.length === 0) { res.render('notfound') }
      else { res.render('index', { restaurants }) }
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
  listlength = listlength + 1
  const id = listlength
  return restaurantList.create({ name, category, location, phone, description, image, rating, id })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// connect an edit restaurant post
router.get('/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// new edit restaurant post templete
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//renew edit restaurant post
router.put('/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/${id}`))
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

module.exports = router
