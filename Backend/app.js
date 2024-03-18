const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const roomsRoutes = require('./routes/rooms')
const authRoutes = require('./routes/auth')
const hotelsRoutes = require('./routes/hotels')
const transactionRoutes = require('./routes/transaction')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.use(roomsRoutes)
app.use(hotelsRoutes)
app.use(authRoutes)
app.use(transactionRoutes)
app.use((req, res) =>
{
  res.status(404).json({ message: 'Route not found' })
})
mongoose.connect('mongodb+srv://donquixotex124:Saobang1@cluster0.nqawsp9.mongodb.net/hotel?retryWrites=true&w=majority&appName=Cluster0')

  .then(result => app.listen(5000))
  .catch(err => console.log(err))

