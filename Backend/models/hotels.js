const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hotelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  photos: {
    type: [String],
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false,
    min: 0,
    max: 5
  },
  featured: {
    type: Boolean,
    default: false
  },
  rooms: {
    type: [{ type: Schema.Types.ObjectId, ref: "Rooms" }],
    required: true,

  },
  cheapestPrice: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Hotels', hotelSchema)