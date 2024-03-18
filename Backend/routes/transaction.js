const express = require('express')
const transaction = require('../controller/transaction')
const router = express.Router()

router.post('/transaction', transaction.postTransaction)
router.post('/your-transaction', transaction.postTransactionInformation)
router.get('/dashboard', transaction.getAdminTransaction)
router.get('/all', transaction.getAllInformation)
module.exports = router