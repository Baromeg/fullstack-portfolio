const express = require('express')
const app = express()
const { port, dbURI } = require('./config/environment')
require('dotenv').config()
const Router = require('./router')
const mongoose = require('mongoose')
const path = require('path')
const dist = path.join(__dirname, 'dist')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    // * err -> tells you why you can't connect if you fail to connect
    if (err) console.log(err)
    else console.log('Mongoose connected successfully!')
  }
)

app.use((req, res, next) => {
  console.log(`Incoming request, ${req.method} to ${req.url}`)
  next()
})

app.use(express.json())

app.use('/api', Router)

app.use('/', express.static(dist))

app.get('*', function (req, res) {
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(port)
