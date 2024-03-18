const express = require('express')
const authController = require('../controller/authController')
const router = express.Router()

router.post('/', authController.checkLogin)
router.post('/create-user', authController.registerUser)
router.post('/login', authController.login)
module.exports = router
