const express = require('express')

const app = express()

app.get('/', function (req, res) {
  res.send('<h1>Hello</h1>')
})

app.get('/contact', function (req, res) {
  res.send('Contact me at: angela@gmail.com')
})

app.listen(5000, function () {
  console.log('Server started on port 5000')
})
