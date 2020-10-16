const restaurantmodel = require('../resList') // 載入 resList model

const db = require('../../config/mongoose')

const restaurantList = require('./restaurant.json')
const restaurant_list = restaurantList.results// require restaurant list JASON file

db.once('open', () => {
  console.log('mongodb connected!')
  restaurant_list.forEach(restaurant => {
    restaurantmodel.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
  console.log('done')
})
