const mongoose = require('mongoose')
const Schema = mongoose.Schema
const transactionSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotels',
    required: true
  },
  room: {
    type: [Number],
    required: true
  },
  roomsId: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Rooms'
  },
  dateStart: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  payment: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Transaction', transactionSchema)