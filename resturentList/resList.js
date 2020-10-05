const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  id: {
    type: number
  }, name: {
    type: String, // 資料型別是字串
  }, name_en: {
    type: String, // 資料型別是字串
  }, category: {
    type: String, // 資料型別是字串
  }, image: {
    type: String, // 資料型別是字串
  }, location: {
    type: String, // 資料型別是字串
  }, phone: {
    type: String, // 資料型別是字串
  }, google_map: {
    type: String, // 資料型別是字串
  }, google_map: {
    type: String, // 資料型別是字串
  }, rating: {
    type: number, // 資料型別是字串
  }, description: {
    type: String, // 資料型別是字串
  }
})
module.exports = mongoose.model('Todo', todoSchema)
