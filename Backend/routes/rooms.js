const express = require('express')
const router = express.Router()
const rooms = require('../controller/rooms')

router.get('/rooms', rooms.getRooms)
router.post('/delete-rooms', rooms.postDeleteRooms)
router.post('/add-room', rooms.postAddRooms)
router.get('/rooms-detail', rooms.getRoomsDetail)
router.post('/edit-room', rooms.postEditRooms)
module.exports = router