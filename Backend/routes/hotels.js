const express = require('express')
const hotels = require('../controller/hotels')
const router = express.Router()

router.get('/hotel', hotels.getHotels)
router.post('/search', hotels.postSearchHotels)
router.get('/hotel-detail', hotels.getHotelDetail)
router.post('/delete-hotel', hotels.postDeleteHotel)
router.post('/add-hotel', hotels.postAddHotel)
router.post('/edit-hotel', hotels.postEditHotel)
module.exports = router